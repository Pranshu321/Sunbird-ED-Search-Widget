interface FilterConfigProps {
  name: string;
  field: string;
  isEnabled?: boolean;
}
interface UpdateConfigProps {
  apiData: Array<any>;
  setFilterConfig: Function;
  filterConfig: Array<FilterConfigProps> | undefined;
  addtionalFilterConfig?: Array<FilterConfigProps> | undefined;
}
interface FilterDataExtractProps {
  content: Array<object>;
  filterConfig: Array<any>;
  TermsObject: any;
}
export interface CardProps {
  name?: string;
  image?: string;
  subject?: string;
  type?: string;
  publisher?: string;
  tags?: Array<string>;
}
interface RenderContentProps {
  content: Array<object>;
  filtersSelected: Array<any>;
  setRenderContentData: Function;
  RenderContent: Array<CardProps>;
  filterConfig: Array<any>;
}

export function UpdateConfig({
  apiData,
  setFilterConfig,
  addtionalFilterConfig,
  filterConfig,
}: UpdateConfigProps) {
  let TempData = apiData;
  if (filterConfig?.length !== 0) {
    filterConfig?.map(item => {
      const ItemName = item.name;
      const ItemField = item.field;
      const ItemIsEnabled =
        item.isEnabled !== undefined ? item.isEnabled : true;
      TempData[0].data.PrimaryFields[ItemName] = {
        field: ItemField,
        isEnabled: ItemIsEnabled,
      };
    });
  }
  if (addtionalFilterConfig?.length !== 0) {
    addtionalFilterConfig?.map(item => {
      const ItemName = item.name;
      const ItemField = item.field;
      const ItemIsEnabled =
        item.isEnabled !== undefined ? item.isEnabled : true;
      TempData[0].data.additionalFields[ItemName] = {
        displayName: ItemName,
        field: ItemField,
        isEnabled: ItemIsEnabled,
      };
    });
  }
  // console.log("Temp Data" , TempData);
  setFilterConfig(TempData);
  return TempData;
}

function isEnabled(filterConfig: any, itemName: string) {
  let isEnable = true;
  const Keys = Object.keys(filterConfig);
  Keys.map(item => {
    if (item.toLowerCase() === itemName.toLowerCase()) {
      isEnable = filterConfig[item].isEnabled;
    }
  });
  return isEnable;
}

export function FilterDataExtract({
  content,
  filterConfig,
  TermsObject,
}: FilterDataExtractProps) {
  const AddtionalFieldsObject = filterConfig[0].data.additionalFields;
  const MasterFieldsObject = filterConfig[0].data.PrimaryFields;
  const FilterConfigObject = {
    ...MasterFieldsObject,
    ...AddtionalFieldsObject,
  };
  let OptionNameArray: any = [];
  let OptionValueArray: any = [];
  if (filterConfig.length !== 0) {
    const MasterKeys = Object.keys(filterConfig[0].data.PrimaryFields);
    const AddtionalKeys = Object.keys(filterConfig[0].data.additionalFields);
    OptionNameArray = [...MasterKeys, ...AddtionalKeys];
    OptionNameArray?.map((item: any) => {
      if (isEnabled(FilterConfigObject, item)) {
        let temp: any;
        if (TermsObject.hasOwnProperty(item)) {
          temp = TermsObject[item];
        } else {
          let fieldName = MasterFieldsObject[item]
            ? MasterFieldsObject[item].field
            : AddtionalFieldsObject[item]?.field;

          temp = new Set('');

          if (fieldName !== null || fieldName !== undefined) {
            content.map((item: any) => {
              if (item[fieldName] !== null || item[fieldName] !== undefined) {
                if (Array.isArray(item[fieldName])) {
                  item[fieldName].map((ele: string) => {
                    temp.add(ele);
                  });
                } else {
                  temp.add(item[fieldName]);
                }
              }
            });
          }
        }
        if (Array.isArray(temp)) {
          console.log('temp', temp.sort());

          if (temp.length !== 0)
            OptionValueArray.push({
              name: item,
              value: temp.sort(),
            });
        } else {
          const val = Array.from(temp);
          val.splice(val.length - 1, 1);
          if (val.length !== 0)
            OptionValueArray.push({
              name: item,
              value: val.sort(),
            });
        }
      }
    });
  }
  // console.log("OptionValue",OptionValueArray);

  return {
    OptionNameArray,
    OptionValueArray,
  };
}

export function RenderContentFunction({
  content,
  filtersSelected,
  filterConfig,
  setRenderContentData,
}: RenderContentProps) {
  const AddtionalFieldsObject = filterConfig[0]?.data.additionalFields;
  // const MasterFieldsObject = filterConfig[0]?.data.PrimaryFields;
  const FilterConfigObject = {
    // ...MasterFieldsObject,
    ...AddtionalFieldsObject,
  };
  const keys = Object.keys(FilterConfigObject);
  let contentArray: Array<any> = [];
  const tempContent = content;
  filtersSelected.map((item: any) => {
    const itemName = item.name;
    const filterSelectedArray = item.value;
    const fieldKey = keys.filter(item => {
      return item.toLowerCase() === itemName?.toLowerCase();
    });
    const fieldObj = FilterConfigObject[fieldKey[0]];
    const field = fieldObj?.field;
    tempContent.map((item: any) => {
      if (item[field] !== undefined) {
        filterSelectedArray.map((ele: any) => {
          if (item[field].includes(ele)) {
            contentArray.push(item);
          }
        });
      }
    });
  });
  setRenderContentData(contentArray);
}

function isArray(item: any) {
  if (Array.isArray(item)) {
    return item[0];
  } else {
    return item;
  }
}

export function CardFieldsRender(item: any, CardFieldsObject: any) {
  const FieldKeys = Object.keys(CardFieldsObject);
  let ObjectReturn: CardProps = {};
  let tagsArray: Array<string> = [];
  FieldKeys.map((Field: string) => {
    if (item.hasOwnProperty(CardFieldsObject[Field].field)) {
      ObjectReturn[Field as keyof CardProps] = isArray(
        item[CardFieldsObject[Field].field]
      );
    }
    if (Field === 'tags') {
      const TagsFieldsArray = CardFieldsObject[Field].TagsFieldArray;
      TagsFieldsArray.map((tagField: string) => {
        if (item.hasOwnProperty(tagField))
          tagsArray.push(isArray(item[tagField]));
      });
    }
  });
  ObjectReturn['tags'] = tagsArray;
  // console.log("Object", ObjectReturn);
  return ObjectReturn;
}

export function TermsFetch(
  data: any,
  setMasterFieldsTerms: Function,
  FilterConfig?: any
) {
  const Categories = data.result.framework.categories;
  // console.log("Categories", Categories);
  const TermsObject: any = {};
  console.log('FilterConfig', FilterConfig[0]);
  Categories.map((item: any) => {
    // const code = item.code;
    const name = item.name;
    // console.log(FilterConfig[0].data.PrimaryFields[name]?.isEnabled);
    if (FilterConfig[0].data.PrimaryFields[name]?.isEnabled) {
      // console.log("code", name);
      const associations = item.terms[0].associations
        ? item.terms[0].associations
        : item.terms;
      // const TermsArr: Array<string> = [];
      associations.map((item: any) => {
        if (TermsObject.hasOwnProperty(item.category)) {
          let tempArr = TermsObject[item.category as keyof any].terms;
          tempArr.push(item.name);
          const newSet = new Set<Array<any>>(tempArr);
          TermsObject[item.category as keyof any].terms = [...newSet];
        } else {
          // console.log("item" , item.category);
          TermsObject[item.category as keyof any] = {
            name: item.category,
            terms: [item.name],
          };
        }
      });
      // TermsObject[code] = { name: name, terms: TermsArr };
      console.log(TermsObject);
    }
  });
  // console.log("TermsObject", TermsObject);
  setMasterFieldsTerms([TermsObject]);
}

export function MasterFieldContentChange(
  filtersArray: any,
  filterConfig: any,
  body: string,
  setFilter: Function
) {
  const bodyJSON = JSON.parse(body);
  // console.log(filterConfig);
  // console.log(filtersArray);
  const TempObj: any = {};
  console.log('config', filterConfig);

  filtersArray.map((item: any) => {
    const itemName = item.name.toLowerCase();
    console.log('dsf', itemName);
    const configfiled = filterConfig.filter((fil: any) => {
      console.log('FIll NAme', fil);
      return fil.name.toLowerCase() === itemName;
    });
    TempObj[configfiled[0]?.field] = item.value;
    // console.log(TempObj);
  });
  const keys = Object.keys(bodyJSON.request.filters);
  keys.map((item: any) => {
    if (TempObj[item] !== undefined) {
      bodyJSON.request.filters[item] = TempObj[item];
    }
  });
  console.log(bodyJSON);
  setFilter(JSON.stringify(bodyJSON));
}
