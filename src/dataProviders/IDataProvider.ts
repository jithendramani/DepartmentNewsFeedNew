import {INews } from "../common/IObjects";

export default  interface IDataProvider {

    loadNews(listName: string, numberOfItems: number): Promise<INews[]>;

    loadNewsDetail(listName:string, newsId:number):Promise<INews[]>;

}