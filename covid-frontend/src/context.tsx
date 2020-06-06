import { SelectionStore } from "./SelectionStore";
import React from "react";

export const storesContext = React.createContext({
    selectionStore: new SelectionStore(),
})