import * as React from 'react';
import styles from './DepartmentNewsViewAll.module.scss';
import { IDepartmentNewsViewAllProps } from './IDepartmentNewsViewAllProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { INews,IDepartmentNewsViewAllState } from "../../../common/IObjects";
import {
  ActionButton,
  IButtonProps
} from 'office-ui-fabric-react/lib/Button';

import {
  Spinner, DocumentCardLocation
} from 'office-ui-fabric-react';

export default class DepartmentNewsViewAll extends React.Component<IDepartmentNewsViewAllProps, IDepartmentNewsViewAllState> {

  constructor(props: IDepartmentNewsViewAllProps, state: IDepartmentNewsViewAllState) {
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

  public componentDidUpdate(prevProps: IDepartmentNewsViewAllProps, prevState: IDepartmentNewsViewAllState, prevContext: any): void {
    // this.props.dataProvider.loadNews(this.props.listName, this.props.numberOfItems).then((items:INews[])=>{
    //   this.setState({
    //     newsItems: items,
    //     loading: false,
    //     error: null
    //   });
    // });
  }

  private loadMore(){
    console.log('Load More...');
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
        <div className={styles.viewAllButtonContainer}>
        <ActionButton
          data-automation-id='test' onClick={(ev)=> this.loadMore()}
          iconProps={ { iconName: 'Add' } }
        >
          Load More
        </ActionButton></div>
        <div style={{clear: 'both'}}/>
      </div>
    );
  }
}
