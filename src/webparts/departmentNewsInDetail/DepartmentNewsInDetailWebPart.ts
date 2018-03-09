import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'DepartmentNewsInDetailWebPartStrings';
import IDataProvider from '../../dataProviders/IDataProvider';
import SharePointDataProvider from '../../dataProviders/SharePointDataProvider';
import DepartmentNewsInDetail from './components/DepartmentNewsInDetail';
import { IDepartmentNewsInDetailProps } from './components/IDepartmentNewsInDetailProps';

export interface IDepartmentNewsInDetailWebPartProps {
  description: string;
}

export default class DepartmentNewsInDetailWebPart extends BaseClientSideWebPart<IDepartmentNewsInDetailWebPartProps> {

  
  private _dataProvider: IDataProvider;
  private _newsid:number;
  private _listName:string;

  protected onInit(): Promise<void> {
    
        const url : any = new URL(window.location.href);
        this._newsid = url.searchParams.get("newsid");
        this._listName=url.searchParams.get("list");
        this._dataProvider = new SharePointDataProvider(this.context,'News');
     
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IDepartmentNewsInDetailProps > = React.createElement(
      DepartmentNewsInDetail,
      {
        description: this.properties.description,
        listName:this._listName,
        newsId:this._newsid,
        dataProvider:this._dataProvider
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
