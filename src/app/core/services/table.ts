

export interface Table {
    getTableData(table : string) : Promise<number>;
    getdata(table : string, page : number, pageSize : number) : Promise<Array<any>>;
}
