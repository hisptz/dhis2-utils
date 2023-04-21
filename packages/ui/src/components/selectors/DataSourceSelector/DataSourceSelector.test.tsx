import React from "react";
import {DataSourceSelector} from "./index";
import {mount} from "@cypress/react";
import DataSourceProvider from "../../../../../../resources/dataProviders/dataSourceProvider";

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
