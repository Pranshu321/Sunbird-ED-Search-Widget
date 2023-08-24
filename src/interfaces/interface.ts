import React from 'react';

export interface StyleProps {
  apiContextDiv: {};
  FilterComponent: {};
  CardStyle: {};
}

export interface FilterConfigProps {
  name: string;
  field: string;
  isEnabled?: boolean;
}

type CardFieldsObject = {
  name?: {
    field: string;
    isEnabled?: boolean;
  };
  type?: {
    field: string;
    isEnabled?: boolean;
  };
  subject?: {
    field: string;
    isEnabled?: boolean;
  };
  image?: {
    field: string;
    isEnabled?: boolean;
  };
  publisher?: {
    field: string;
    isEnabled?: boolean;
  };
  tags?: {
    TagsFieldArray: Array<string>;
    isEnabled?: boolean;
  };
};

export interface ApiContextProps {
  children?: React.ReactNode;
  headers?: {};
  body?: string;
  Formurl: string;
  ContentFetchObj: {
    url: string;
    method: string;
    headers?: object;
    body: string;
  };
  CardFieldsProps: CardFieldsObject;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: StyleProps;
  filterConfig: Array<FilterConfigProps>;
  addtionalFilterConfig?: Array<FilterConfigProps> | undefined;
  Termsurl: string;
}

export interface FiltersArraySelectedOptionObject {
  name: string;
  value: string[];
}

export interface SelectProps {
  styles?: {
    container?: {};
    OptionNameStyle?: {};
    OptionStyle?: {};
    OptionDivStyle?: {};
    select?: {};
    OptionsItem?: {};
  };
  FiltersArray: Array<FiltersArraySelectedOptionObject>;
  setFiltersArray: (...args: any[]) => any;
  options: Array<string>;
  optionName: string;
  filters?: Array<string>;
  Reset?: boolean;
  ArrayNumber: Array<number>;
  setArrayNumber: (...args: any[]) => any;
}

export interface FilterProps {
  stylesFilterDiv?: {};
  children: React.ReactNode;
}

export interface CardProps {
  name: string;
  image?: string;
  subject: string;
  type: string;
  publisher: string;
  tags?: Array<string>;
  styles?: {
    container?: {};
    headingDiv?: {};
    heading?: {};
    type?: {};
    imageDiv?: {};
    image?: {};
    tagsDiv?: {};
    LowerDiv?: {};
    LowerItem?: {};
    LowerDT?: {};
    LowerDD?: {};
    tag?: {};
  };
}
