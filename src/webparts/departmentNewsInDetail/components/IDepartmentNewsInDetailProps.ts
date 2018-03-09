import IDataProvider from '../../../dataProviders/IDataProvider';
export interface IDepartmentNewsInDetailProps {
  description: string;
  newsId:number;
  listName:string;
  dataProvider: IDataProvider;
}
