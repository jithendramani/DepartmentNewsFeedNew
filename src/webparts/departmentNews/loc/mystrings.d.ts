declare interface IDepartmentNewsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel:string;
  NumberOfItemsFieldLabel:string;
  DetailedNewsPageUrlFieldLabel:string;
  ViewAllNewsPageUrlFieldLabel:string;
}

declare module 'DepartmentNewsWebPartStrings' {
  const strings: IDepartmentNewsWebPartStrings;
  export = strings;
}
