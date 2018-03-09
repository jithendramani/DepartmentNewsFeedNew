import {INews } from "../common/IObjects";

export default  interface IDataProvider {

    loadNews(listName: string, numberOfItems: number): Promise<INews[]>;

    loadNewsDetail(listName:string, newsId:number):Promise<INews[]>;

    loadNewsViewAll(listName: string, numberOfItems: number, skipId:number,skipModified:string, pageIndex:number): Promise<INews[]>;
    
    hasNextPage(listName: string, numberOfItems: number, skipId:number,skipModified:string): Promise<boolean>;

}