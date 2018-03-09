import * as React from 'react';
import styles from './DepartmentNewsInDetail.module.scss';
import { IDepartmentNewsInDetailProps } from './IDepartmentNewsInDetailProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { INews,IDepartmentNewsInDetailState } from "../../../common/IObjects";
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  DocumentCardActivity,
  IDocumentCardPreviewProps,
 } from 'office-ui-fabric-react/lib/DocumentCard';

import {
  Spinner,
} from 'office-ui-fabric-react';
import {
  Image,
  IImageProps,
  ImageFit
} from 'office-ui-fabric-react/lib/Image';

export default class DepartmentNewsInDetail extends React.Component<IDepartmentNewsInDetailProps, IDepartmentNewsInDetailState> {

  constructor(props: IDepartmentNewsInDetailProps, state: IDepartmentNewsInDetailState) {
    super(props);
    this.state = {
      news: [] as INews[],
      loading: true,
      error: null
    };
  }  

  public componentDidMount(): void {
    this.props.dataProvider.loadNewsDetail(this.props.listName, this.props.newsId).then((item:INews[])=>{
      this.setState({
        news: item,
        loading: false,
        error: null
      });
    });
  }

  public componentDidUpdate(prevProps: IDepartmentNewsInDetailProps, prevState: IDepartmentNewsInDetailState, prevContext: any): void {
    // this.props.dataProvider.loadNewsDetail(this.props.listName, this.props.newsId).then((items:INews[])=>{
    //   this.setState({
    //     news: items,
    //     loading: false,
    //     error: null
    //   });
    // });
  }


  public render(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{margin: '0 auto'}}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error:</strong> {this.state.error}</div> : <div/>;
    const documents: JSX.Element[] = this.state.news.map((doc: INews, i: number) => {
      const iconUrl: string = ``;
      if(doc.noPicture==true){
        
      return (    
        <div>    
          <div className={styles.newsTitle}>{doc.title}</div>
          <p className={styles.newsDescription} dangerouslySetInnerHTML={{__html: doc.description}} >
          </p>
          <div><span className={styles.authorStyle}>{doc.editorName}</span>&nbsp;<span className={styles.modifiedDateStyle}>{doc.modifiedTime}</span></div>
        
        </div>
      );
      }
      else{

        return (    
          <div> 
            {/* <DialogPictureView imageUrl={doc.pictureUrl}/>             */}
            <div className={styles.newsTitle}>{doc.title}</div>
            <p className={styles.newsDescription} dangerouslySetInnerHTML={{__html: doc.description}} >
            </p>
            <div><span className={styles.authorStyle}>{doc.editorName}</span>&nbsp;<span className={styles.modifiedDateStyle}>{doc.modifiedTime}</span></div>
         
          </div>
        );
      }
    });
    return (
      <div>
        {loading}
        {error}
        {documents}
        <div style={{clear: 'both'}}/>
      </div>
    );
  }
}
