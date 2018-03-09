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
      error: null,
      pageIndex:0,
      skipId:0,
      skipModified:""
    };
  }

  public componentDidMount(): void {
    this.props.dataProvider.loadNewsViewAll(this.props.listName, this.props.numberOfItems,0,"",0).then((items:INews[])=>{
      
      this.setState({
        newsItems: items,
        loading: false,
        error: null,
        pageIndex:0,
        skipId:(items.length>0?items[items.length-1].id:0),
        skipModified:(items.length>0?items[items.length-1].modified:"")
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
    this.props.dataProvider.loadNewsViewAll(this.props.listName, this.props.numberOfItems,this.state.skipId,this.state.skipModified,this.state.pageIndex+1).then((items:INews[])=>{
      console.log(items);
      this.setState({
        newsItems: this.state.newsItems.concat(items),
        loading: false,
        error: null,
        pageIndex:(this.state.pageIndex + 1),
        skipId:(items.length>0?items[items.length-1].id:0),
        skipModified:(items.length>0?items[items.length-1].modified:"")
      });
    });
  }

  public render(): JSX.Element {
    const loading: JSX.Element = this.state.loading ? <div style={{margin: '0 auto'}}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error:</strong> {this.state.error}</div> : <div/>;
    const documents: JSX.Element[] = this.state.newsItems.map((doc: INews, i: number) => {
      const iconUrl: string = ``;



      return (
        <div className={styles.newsBlock}>
          <div className={styles.newsContentBox}>
            <div className={styles.newsTitle}><a className={styles.newsTitleLink} href={this.props.detailedNewsPageUrl+"?newsid="+doc.id+"&list="+this.props.listName}>{doc.title}</a></div>
            <div className={styles.newsDescription} dangerouslySetInnerHTML={{__html: doc.description}}></div>
            <div><span className={styles.authorStyle}>{doc.editorName}</span>&nbsp;<span className={styles.modifiedDateStyle}>{doc.modifiedTime}</span></div>
           
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
           onClick={(ev)=> this.loadMore()}
          iconProps={ { iconName: 'Add' } }
        >
          Load More
        </ActionButton></div>
        <div style={{clear: 'both'}}/>
      </div>
    );
  }
}
