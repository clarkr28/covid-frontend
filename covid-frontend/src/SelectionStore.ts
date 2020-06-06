import {observable, action, computed} from "mobx"
import axios from "axios";

export interface SelectedRegion {
    state: string;
    county: string; 
}

export class SelectionStore {
    constructor() {
        this.loadStatesAndCounties();
    }

    @action loadStatesAndCounties() {
        axios
        .get('http://localhost:5000/groundhog/v1/counties')
        .then((response: any) => {
            console.log(response);
            for (let value in response.data) {
                this.countyMap.set(value, response.data[value].sort());
            }
            this.isLoading = false;
        })
    }

    @observable isLoading: boolean = true;
    @observable countyMap: Map<string, string[]> = new Map();
    @observable selectedRegions: SelectedRegion[] = [];
    @observable currentSelectedState: string = '';

    @computed get states(): string[] {
        return Array.from(this.countyMap.keys()).sort();
    }

    @action setCurrentSelectedState(state: string) {
        if (this.countyMap.has(state)) {
            this.currentSelectedState = state;
        }
    }

    @action removeRegion(region: SelectedRegion) {
        // remove the passed region by filtering for everything but that region
        this.selectedRegions = this.selectedRegions.filter(r => 
            r.state !== region.state || r.county !== region.county)
    }

    @action addRegion(county: string) {
        // use the currently selected state and passed county to add a 
        // new region, so long as it is not already selected

        let newRegion: SelectedRegion = {
            state: this.currentSelectedState,
            county: county
        };

        if (this.selectedRegions.filter(r => r.state === newRegion.state && 
                r.county === newRegion.county).length === 0) {
            this.selectedRegions.push({
                state: this.currentSelectedState, 
                county: county});
        }
    }
}
