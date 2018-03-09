import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'DepartmentNewsViewAllWebPartStrings';
import DepartmentNewsViewAll from './components/DepartmentNewsViewAll';
import { IDepartmentNewsViewAllProps } from './components/IDepartmentNewsViewAllProps';
import SharePointDataProvider from '../../dataProviders/SharePointDataProvider';
import IDataProvider from '../../dataProviders/IDataProvider';

export interface IDepartmentNewsViewAllWebPartProps {
  listName: string;
  numberOfItems:number;
  detailedNewsPageUrl:string;
}

export default class DepartmentNewsViewAllWebPart extends BaseClientSideWebPart<IDepartmentNewsViewAllWebPartProps> {

  private _dataProvider: IDataProvider;

  protected onInit(): Promise<void> {
        this._dataProvider = new SharePointDataProvider(this.context,'News');
     
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IDepartmentNewsViewAllProps > = React.createElement(
      DepartmentNewsViewAll,
      {
        listName: this.properties.listName,        
        detailedNewsPageUrl:this.context.pageContext.web.absoluteUrl + this.properties.detailedNewsPageUrl,
        numberOfItems:this.properties.numberOfItems,
        dataProvider: this._dataProvider        
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
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneSlider('numberOfItems', {
                  label: strings.NumberOfItemsFieldLabel,
                  min: 1,
                  max: 10,
                  step: 1                  
                }),
                PropertyPaneTextField('detailedNewsPageUrl', {
                  label: strings.DetailedNewsPageUrlFieldLabel
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
