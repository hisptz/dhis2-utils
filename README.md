# DHIS2 Utils

A package of reusable **functions**, **interfaces**, **constants**, and other implementations for DHIS2 related appications


### Interfaces
- Legend definition
- Legend
- TrackedEntityAttribute
- TrackedEntityInstance
- Event
- DataElement
- OrganisationUnit
- Program
- Enrollment
- ProgramStage



### Utilities

- `constructAppUrl`: constructs the app URL based on the given server version, app name and title
  Inputs: `baseURL: string`,`config: {name: string; title: string}`,`serverVersion: {major: number, minor: number, patch: number}`
  Outputs: `string`
- `getSelectedOrgUnitSelectionDisplay`: Returns a display name for selected organisation unit based on organisation units passed
  Inputs: `orgUnitSelection: { orgUnits: Array<{id: string; displayName: string}>, levels: Array<string>, groups: Array<string>, userOrgUnit: boolean, userSubUnit: boolean, userSubX2Unit: boolean }`
  Output: `string`
- `index`: Generates a unique ID acceptable to DHIS2 metadata
  Input: none
  Output: `string`

- `generateLegendDefaults`: Return auto-calculated legend values for given `legendDefinitions`
  Inputs: `legendDefinitions: Array<{id:string; label: string; color: string;}>` `weight: number` `highIsGood boolean`
  Outputs: `[{id: string; startValue: number; endValue: number}]`
- `truncateDescription`: Returns a trucated string based on specified length
  Input: `description: string;` `maxLength: number`
  Output: `string`
- `findLegend`: Get a legend definition based on the specified value
  Input: `legends: Array<{id:string; startValue: number, endValue: number}>` `value: number | string` `options: {max: number, legendDefinitions: {id:string; label: string; color: string;}}`
  Output: `LegendDefinition`
- `translateAccess`: Derive an access object based on passed access string
  Input: `access: string`
  Output: `{read: boolean; write: boolean;}`

- `downloadExcelFromTable`: Returns an excel file from a HTML table
  Input: `tableRef: HTMLTableNode` `title: string`
  Output: `File`

- `getExcelFromTable`:  from a HTML table
  Input: `tableRef: HTMLTableNode` `title: string`
  Output: `File`

- `getCurrentPeriod`: Get the latest period based on the specified period type
  Input: `periodType: string` `calenda: string`
- `getPagination`
- `convertLocalToTimezone`
- `getDhisStringDate`
- 
