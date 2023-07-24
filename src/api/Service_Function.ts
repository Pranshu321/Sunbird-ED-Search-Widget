interface FilterNameProps {
  filters: string[];
}

interface FiltersArraySelectedOptionObject {
  name: string;
  value: string[];
}

export interface CardProps {
  name: string;
  image: string;
  subject: '';
  type: string;
  publisher: string;
  tags: Array<string>;
}

interface ExtractFiltersDataProps {
  filters: string[];
  content: any;
  filterOptionData: {};
  setfilterData?: Function;
}

interface ContentFilterDataRenderProps {
  content: any;
  filtersSelectedArray: Array<FiltersArraySelectedOptionObject>;
  Filters: Array<string>;
  ApiSettedFilters: Array<string>;
  NotIncludeFilter: Array<number>;
}

export const FilterSingleString = ({
  filterString,
}: {
  filterString: string;
}) => {
  if (filterString?.length) {
    if (filterString?.includes('se_')) {
      return filterString.substring(3).toLocaleUpperCase();
    } else {
      return filterString.toLocaleUpperCase();
    }
  }
  return filterString.toLocaleUpperCase();
};

export const FiltersName = ({ filters }: FilterNameProps) => {
  let temp = [''];
  filters.map(filter => {
    if (filter.includes('se_')) {
      temp.push(filter.substring(3).toLocaleUpperCase());
    } else {
      temp.push(filter.toLocaleUpperCase());
    }
  });
  temp.splice(0, 1);
  return temp;
};

export const ExtractFiltersData = ({
  content,
  filters,
  filterOptionData,
}: ExtractFiltersDataProps) => {
  const obj: any = filterOptionData;
  filters.map(filter => {
    let temp = new Set('');
    content.map((item: any) => {
      if (item[filter] !== undefined) {
        if (Array.isArray(item[filter])) {
          item[filter].map((ele: string) => {
            temp.add(ele);
          });
        } else {
          temp.add(item[filter]);
        }
      }
      if (temp.size > 0) {
        obj[FilterSingleString({ filterString: filter })] = Array.from(temp);
      }
    });
  });
  return obj;
};

export const ContentFilterDataRender = ({
  content,
  filtersSelectedArray,
  ApiSettedFilters,
  Filters,
  NotIncludeFilter,
}: ContentFilterDataRenderProps) => {
  const n = ApiSettedFilters.length;
  let RenderContent: Array<CardProps> = [
    {
      name: '',
      image: '',
      subject: '',
      type: '',
      publisher: '',
      tags: [],
    },
  ];
  filtersSelectedArray.map((item, idx) => {
    const val = item.value[0];
    const field = ApiSettedFilters[Filters.indexOf(item.name)];
    if (
      val !== undefined &&
      field !== undefined &&
      !NotIncludeFilter.includes(idx)
    )
      content.map((item: any) => {
        if (item[field] !== undefined && item[field].includes(val)) {
          const temp = {
            name: item.name,
            image: item.appIcon,
            subject: item['subject'][0],
            type: item.primaryCategory,
            publisher: item.board,
            tags: [
              item.board,
              item[ApiSettedFilters[n - 1]][0],
              item[ApiSettedFilters[n - 2]][0],
              `+${item[ApiSettedFilters[n - 2]].length}`,
            ],
          };
          RenderContent.push(temp);
        }
      });
  });
  return RenderContent.slice(1);
};
