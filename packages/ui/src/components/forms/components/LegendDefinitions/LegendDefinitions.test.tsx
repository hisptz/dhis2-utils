import {LegendDefinition} from "../../interfaces";
import {uid} from "@hisptz/dhis2-utils";
import {mount} from "@cypress/react";
import {LegendDefinitionsFormField} from "./components/LegendDefinitions";
import React, {useState} from "react";


const defaultLegendDefinitions: LegendDefinition[] = [
    {
        id: uid(),
        name: "Green",
        color: "#00FF00",
        isDefault: true
    },
    {
        id: uid(),
        name: "Red",
        color: "#FF0000"
    },
    {
        id: uid(),
        name: "Blue",
        color: "#0000FF"
    },
];


describe("Legend definitions field", () => {


    it("renders", () => {
        mount(
            <LegendDefinitionsFormField
                value={defaultLegendDefinitions}
                name="legendDefinitions"
                onChange={() => {
                }}/>
        );
    });
    it("accepts pre-defined values", () => {


        mount(
            <LegendDefinitionsFormField
                value={defaultLegendDefinitions}
                name="legendDefinitions"
                onChange={() => {
                }}/>
        );
        defaultLegendDefinitions.forEach(({id, isDefault}) => {
            cy.get(`[data-test='${id}${isDefault ? "-default" : ""}-definition-area']`).should("exist");
        });
    });
    it("changes values accordingly", () => {

        const [formData, setFormData] = useState(defaultLegendDefinitions);

        mount(
            <LegendDefinitionsFormField
                value={defaultLegendDefinitions}
                name="legendDefinitions"
                onChange={setFormData}/>
        );

        defaultLegendDefinitions.forEach(({id}) => {

        });
    });


});
