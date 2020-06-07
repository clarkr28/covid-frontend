import {observable, action, computed} from "mobx"
import axios, { AxiosResponse } from "axios";

export interface Region {
    state: string;
    county: string; 
}

export const toKey = function(r: Region): string {
    return r.state + ':' + r.county;
}

export interface StateDataPoint {
    state: string;
    fips: number;
    date: Date;
    cases: number;
    deaths: number;
}

export interface CountyDataPoint {
    state: string;
    county: string;
    fips: number;
    date: string;
    cases: number;
    deaths: number;
}

export interface CountyResponse {
    data: CountyDataPoint[];
}

export interface DataPoint {
    date: Date;
    cases: number;
    deaths: number;
}

export interface PlotData {
    date: Date;
    [key: string]: any;
}

export class SelectionStore {
    constructor() {
        this.loadStatesAndCounties();
    }

    @action loadStatesAndCounties() {
        axios
        .get('http://localhost:5000/groundhog/v1/counties')
        .then((response: any) => {
            for (let value in response.data) {
                this.countyMap.set(value, response.data[value].sort());
            }
            this.isLoading = false;
        })
    }

    @observable isLoading: boolean = true;
    @observable countyMap: Map<string, string[]> = new Map();
    @observable selectedRegions: Region[] = [];
    @observable currentSelectedState: string = '';
    @observable dataMap = new Map<string, DataPoint[]>();

    @computed get states(): string[] {
        return Array.from(this.countyMap.keys()).sort();
    }

    @action setCurrentSelectedState(state: string) {
        if (this.countyMap.has(state)) {
            this.currentSelectedState = state;
        }
    }

    @action removeRegion(region: Region) {
        // remove the passed region by filtering for everything but that region
        this.selectedRegions = this.selectedRegions.filter(r => 
            r.state !== region.state || r.county !== region.county)
    }

    @action addRegion(county: string) {
        // use the currently selected state and passed county to add a 
        // new region, so long as it is not already selected

        let newRegion: Region = {
            state: this.currentSelectedState,
            county: county
        };

        if (this.selectedRegions.filter(r => r.state === newRegion.state && 
                r.county === newRegion.county).length === 0) {

            this.selectedRegions.push(newRegion);
            
            // get the data from the API and parse it
            if (!this.dataMap.has(toKey(newRegion))) {
                axios
                .get<CountyDataPoint[]>(`http://localhost:5000/groundhog/v1/county/${newRegion.state}/${newRegion.county}`)
                .then((response: AxiosResponse<CountyDataPoint[]>) => {
                    // parse and save to dataMap
                    let parsedData: DataPoint[] = [];
                    for (let i:number = 0; i < response.data.length; i++) {
                        parsedData.push({
                            date: new Date(
                                parseInt(response.data[i].date.split('-')[0]),
                                parseInt(response.data[i].date.split('-')[1]) - 1,
                                parseInt(response.data[i].date.split('-')[2]),
                            ),
                            cases: response.data[i].cases,
                            deaths: response.data[i].deaths,
                        });

                    }
                    this.dataMap.set(toKey(newRegion), parsedData);
                })
            }

        }
    }

    @computed get plotData(): PlotData[] {
        /**
         * prepare the covid data so it can be plotted easily with recharts
         */

        // filter the keys that need to be used in the dataMap
        let keys: string[] = [];
        let allData: DataPoint[][] = [];
        for (let i=0; i < this.selectedRegions.length; i++) {
            const d = this.dataMap.get(toKey(this.selectedRegions[i]));
            if (d && d.length > 0) {
                allData.push(d);
                keys.push(toKey(this.selectedRegions[i]));
            }
        }

        if (allData.length === 0) {
            return [];
        }

        // find the earliest start date
        let startDate: Date = new Date();
        for (let i=0; i < allData.length; i++) {
            if (allData[i][0].date < startDate) {
                startDate = new Date(allData[i][0].date);
            } 
        }

        // initialize plot data as json object with dates
        const today = new Date();
        let plotData: PlotData[] = [];
        while (startDate < today) {
            plotData.push({
                date: new Date(startDate)
            });
            startDate.setDate(startDate.getDate() + 1);
        }

        if (plotData.length === 0) {
            return [];
        }

        // add covid data to plotData
        for (let i=0; i < allData.length; i++) {
            let startIndex: number = allData[i][0].date.getTime() - 
                plotData[0].date.getTime();
            startIndex = startIndex / (1000 * 3600 * 24);
            for (let j=0; j < allData[i].length; j++) {
                if (startIndex + j >= plotData.length) {
                    break;
                }
                plotData[startIndex + j][keys[i]] = allData[i][j].cases;
            }
        }

        return plotData; 
    }

    
}
