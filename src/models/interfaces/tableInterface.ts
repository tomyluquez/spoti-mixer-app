export interface Table {
  headers: Headers[];
  dataTable: TableData[];
  type: string;
  action: ActionDataTAble;
}

export interface TableData {
  itemId: string;
  isSelected: boolean;
  image: string;
  name: string;
  owner: string;
  info: number;
  uri: string;
}

interface ActionDataTAble {
  contentButton: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any;
}

interface Headers {
  value: string;
  responsive: boolean;
}
