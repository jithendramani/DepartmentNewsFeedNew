
export interface IDepartmentNewsState {
    newsItems: INews[];
    loading: boolean;
    error: string;
  }

  export interface IDepartmentNewsViewAllState {
    newsItems: INews[];
    loading: boolean;
    error: string;
    pageIndex:number;
    skipId:number;
    skipModified:string;
  }

export interface IDepartmentNewsInDetailState{  
  news:INews[];
  loading: boolean;
  error: string;
}

export interface IPictureViewState{
  hideDialog:boolean;
}
  
  export interface INews {
    id:number;
    title: string;
    pictureUrl:string;
    noPicture: boolean;
    description:string;
    editorName:string;
    editorEmail:string;
    modifiedTime:string;
    modified:string;    
  }