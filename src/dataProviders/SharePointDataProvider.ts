import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

import { INews,IDepartmentNewsState } from "../common/IObjects";
import IDataProvider from "./IDataProvider";
import { Utils } from '../common/Utils';


export default class SharePointDataProvider implements IDataProvider {

    private _webPartContext: IWebPartContext;
    private _libraryAbsoluteUrl: string;
    private _webAbsoluteUrl: string;
    private _listName:string;
    private _noImageUrl: string ="https://insidemanila.ph/images/layout/no-image-available.png";

    constructor(value: IWebPartContext, listName1: string) {
        this._webPartContext = value;
        this._listName = listName1;
        this._webAbsoluteUrl = value.pageContext.web.absoluteUrl;
    }



    public loadNews(listName: string, numberOfItems: number): Promise<INews[]> {
            const queryUrlGetAllItems: string =this._webAbsoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items?$select=*,Editor/Title,Editor/EMail,AttachmentFiles&$expand=Editor,Editor/Id,AttachmentFiles&$orderby=Modified desc&$top=`+numberOfItems;
            let utility = new Utils();
            return this._webPartContext.spHttpClient.get(
                queryUrlGetAllItems,
                SPHttpClient.configurations.v1)
                .then(
                (response: any) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        return Promise.reject(new Error(JSON.stringify(response)));
                    }
                })
                .then((data: any) => {
                    let documents: INews[] = [];
                    if (data) {
                        for (let i = 0; i < data.value.length; i++) {
                            let item = data.value[i];    
                            var attachment = item.AttachmentFiles.length>0?item.AttachmentFiles[0].ServerRelativeUrl:null;
                                var doc: INews = {
                                  id:item.ID,
                                  title:utility.trimText(item.Title,100),
                                  pictureUrl:(item.Picture!=null?item.Picture.Url:(attachment || this._noImageUrl)),
                                  noPicture:(item.Picture==null && attachment==null),
                                  description:utility.trimText(item.Description,300),
                                  editorName:item.Editor.Title,
                                  editorEmail:"/_layouts/15/userphoto.aspx?size=S&accountname="+ item.Editor.EMail,
                                  modifiedTime: utility.formatModifiedDate(new Date(item.Modified)),
                                  modified:item.Modified
                                };
                                documents.push(doc);
                            
                        }
                    }
                    return documents;
    
                }).catch((ex) => {
                    console.log("readDocumentsFromLibrary > spHttpClient.get()...catch:", ex);
                    throw ex;
                });
    
        
    }

    public loadNewsViewAll(listName: string, numberOfItems: number, skipId:number,skipModified:string, pageIndex:number): Promise<INews[]> {
        var queryUrlGetAllItems: string =this._webAbsoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items?`+
        `$select=*,Editor/Title,Editor/EMail,AttachmentFiles&$expand=Editor,Editor/Id,AttachmentFiles`+
        `&$orderby=Modified desc&$top=`+numberOfItems;

        if(skipId>0){

            queryUrlGetAllItems = this._webAbsoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items?`+
            `$select=*,Editor/Title,Editor/EMail,AttachmentFiles&$expand=Editor,Editor/Id,AttachmentFiles`+
            `&$orderby=Modified desc&$skiptoken=`+encodeURIComponent('Paged=TRUE&p_Modified='+skipModified)+`&$top=`+numberOfItems;

        }
        
        console.log(queryUrlGetAllItems);
        let utility = new Utils();
        return this._webPartContext.spHttpClient.get(
            queryUrlGetAllItems,
            SPHttpClient.configurations.v1)
            .then(
            (response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(JSON.stringify(response)));
                }
            })
            .then((data: any) => {
                let documents: INews[] = [];
                if (data) {
                    
                    for (let i = 0; i < data.value.length; i++) {
                        let item = data.value[i];    
                        var attachment = item.AttachmentFiles.length>0?item.AttachmentFiles[0].ServerRelativeUrl:null;
                            var doc: INews = {
                              id:item.ID,
                              title:utility.trimText(item.Title,100),
                              pictureUrl:(item.Picture!=null?item.Picture.Url:(attachment || this._noImageUrl)),
                              noPicture:(item.Picture==null && attachment==null),
                              description:utility.trimText(item.Description,300),
                              editorName:item.Editor.Title,
                              editorEmail:"/_layouts/15/userphoto.aspx?size=S&accountname="+ item.Editor.EMail,
                              modifiedTime: utility.formatModifiedDate(new Date(item.Modified)),
                              modified:item.Modified
                            };
                            documents.push(doc);
                        
                    }
                }
                return documents;

            }).catch((ex) => {
                console.log("readDocumentsFromLibrary > spHttpClient.get()...catch:", ex);
                throw ex;
            });

    
}

    public loadNewsDetail(listName:string, newsId:number):Promise<INews[]>{
        //const queryUrlGetAllItems: string =this._webAbsoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items(${newsId})`;
        const queryUrlGetItemById: string = this._webAbsoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items?$select=*,Editor/Title,Editor/EMail,AttachmentFiles&$expand=Editor,Editor/Id,AttachmentFiles&$filter=Id eq ${newsId}&$top=1`;
        let utility = new Utils();
        return this._webPartContext.spHttpClient.get(
            queryUrlGetItemById,
            SPHttpClient.configurations.v1)
            .then(
            (response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(JSON.stringify(response)));
                }
            })
            .then((data: any) => {
                let documents: INews[] = [];
                if (data) {
                    for (let i = 0; i < data.value.length; i++) {
                        let item = data.value[i];  
                        var attachment = item.AttachmentFiles.length>0?item.AttachmentFiles[0].ServerRelativeUrl:null;
                            
                            var doc: INews = {
                              id:item.ID,
                              title: item.Title,
                              pictureUrl:(item.Picture!=null?item.Picture.Url:(attachment || this._noImageUrl)),
                              noPicture:(item.Picture==null && attachment==null),
                              description:item.Description,
                              editorName:item.Editor.Title,
                              editorEmail:"/_layouts/15/userphoto.aspx?size=S&accountname="+ item.Editor.EMail,
                              modifiedTime:utility.formatModifiedDate(new Date(item.Modified)),
                              modified:item.Modified
                            };
                            documents.push(doc);
                        
                    }
                }
                return documents;

            }).catch((ex) => {
                console.log("readDocumentsFromLibrary > spHttpClient.get()...catch:", ex);
                throw ex;
            });
    }
    

}