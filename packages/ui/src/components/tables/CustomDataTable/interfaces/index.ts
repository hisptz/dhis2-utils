export interface TableActions {
    edit: boolean,
    view: boolean,
    delete: boolean
}

export interface TableStatus {
    label: string,
    value: string
}

export interface TableRow extends Record<string, any> {
    id: string;
    reportName: string,
    uploadedTime: string,
    section: string,
    reportingPeriod: string,
    reportStatus: TableStatus,
    actions: TableActions

}
