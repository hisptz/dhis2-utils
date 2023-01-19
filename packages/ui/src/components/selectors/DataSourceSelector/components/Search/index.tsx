import {InputField} from "@dhis2/ui";
import React from "react";

export default function DataSourceSearch({ keyword, setSearchKeyword }: { keyword?: string; setSearchKeyword: any }) {
  return (
    <div style={{padding: "8px 0"}}>
      <InputField placeholder="Search" type="text" value={keyword} name="keyword" onChange={({ value }: { value: string }) => setSearchKeyword(value)} />
    </div>
  );
}
