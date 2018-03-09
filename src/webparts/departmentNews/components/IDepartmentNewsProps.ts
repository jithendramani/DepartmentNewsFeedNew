import IDataProvider from '../../../dataProviders/IDataProvider';

export interface IDepartmentNewsProps {
  listName: string;
  numberOfItems:number;
  detailedNewsPageUrl:string;
  dataProvider: IDataProvider;
}
