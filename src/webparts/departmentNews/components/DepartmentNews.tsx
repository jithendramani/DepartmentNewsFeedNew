import * as React from 'react';
import styles from './DepartmentNews.module.scss';
import { IDepartmentNewsProps } from './IDepartmentNewsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { INews,IDepartmentNewsState } from "../../../common/IObjects";
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardType,
  DocumentCardActivity,
  IDocumentCardPreviewProps
 } from 'office-ui-fabric-react/lib/DocumentCard';

 import {
  Spinner, DocumentCardLocation
} from 'office-ui-fabric-react';

export default class DepartmentNews extends React.Component<IDepartmentNewsProps, IDepartmentNewsState> {

  constructor(props: IDepartmentNewsProps, state: IDepartmentNewsState) {
    super(props);
    this.state = {
      newsItems: [] as INews[],
      loading: true,
      error: null
    };
  }

  public componentDidMount(): void {
    this.props.dataProvider.loadNews(this.props.listName, this.props.numberOfItems).then((items:INews[])=>{
      this.setState({
        newsItems: items,
        loading: false,
        error: null
      });
    });
  }

  public componentDidUpdate(prevProps: IDepartmentNewsProps, prevState: IDepartmentNewsState, prevContext: any): void {
    // this.props.dataProvider.loadNews(this.props.listName, this.props.numberOfItems).then((items:INews[])=>{
    //   this.setState({
    //     newsItems: items,
    //     loading: false,
    //     error: null
    //   });
    // });
  }

  public render(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{margin: '0 auto'}}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error:</strong> {this.state.error}</div> : <div/>;
    const documents: JSX.Element[] = this.state.newsItems.map((doc: INews, i: number) => {
      const iconUrl: string = ``;



      return (
        <div className={styles.newsBlock}>
          {/* <div className={styles.newsImgBox} >          
          <DocumentCardPreview
            previewImages={[
              {
                previewImageSrc: doc.pictureUrl, 
                width: 196,
                height:112
              }
            ]}
            /></div> */}
          <div className={styles.newsContentBox}>
            <div className={styles.newsTitle}><a className={styles.newsTitleLink} href={this.props.detailedNewsPageUrl+"?newsid="+doc.id+"&list="+this.props.listName}>{doc.title}</a></div>
            <div className={styles.newsDescription} dangerouslySetInnerHTML={{__html: doc.description}}></div>
            <div><span className={styles.authorStyle}>{doc.editorName}</span>&nbsp;<span className={styles.modifiedDateStyle}>{doc.modifiedTime}</span></div>
            {/* <div>
            <DocumentCardActivity
            activity={doc.modifiedTime}
            people={
              [
                { name: doc.editorName, profileImageSrc: doc.editorEmail }
              ]
            }
            />
            </div> */}
            </div>
        </div>
      );
    });
    return (
      <div>
        {loading}
        {error}
        <div className={styles.newsContainer}>
        {documents}
        </div>
        <div style={{clear: 'both'}}/>
      </div>
    );
  }

  public render2(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{margin: '0 auto'}}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error:</strong> {this.state.error}</div> : <div/>;
    const documents: JSX.Element[] = this.state.newsItems.map((doc: INews, i: number) => {
      const iconUrl: string = ``;
      return (
        <div style={{paddingBottom:5}}>
        <DocumentCard  type={ DocumentCardType.compact } onClickHref={this.props.detailedNewsPageUrl+"?newsid="+doc.id+"&list="+this.props.listName} >
          <DocumentCardPreview
            previewImages={[
              {
                previewImageSrc: doc.pictureUrl, 
                width: 155,
              }
            ]}
            />
             <div className='ms-DocumentCard-details'>
           <DocumentCardTitle
              title={doc.title} 
              shouldTruncate={ true }
            />
            <div className='text_description' title={doc.description}></div>
          <DocumentCardActivity
            activity={doc.modifiedTime}
            people={
              [
                { name: doc.editorName, profileImageSrc: doc.editorEmail }
              ]
            }
            />
            </div>
        </DocumentCard>
        </div>
      );
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
