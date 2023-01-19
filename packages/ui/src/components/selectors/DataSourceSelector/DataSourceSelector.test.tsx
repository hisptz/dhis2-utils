import {mount} from "@cypress/react";
import React from "react";
import DataSourceSelector from "./index";
import DataSourceProvider from "../../../dataProviders/dataSourceProvider";

describe("Data Source Selector tests", () => {
  it("should render", function () {
    mount(
      <DataSourceProvider>
        <DataSourceSelector
          onSelect={() => {
            return;
          }}
        />
      </DataSourceProvider>
    );
  });

});
