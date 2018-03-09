import IDataProvider from '../../../dataProviders/IDataProvider';

export interface IDepartmentNewsViewAllProps {
  listName: string;
  numberOfItems:number;
  detailedNewsPageUrl:string;
  dataProvider: IDataProvider;
}
