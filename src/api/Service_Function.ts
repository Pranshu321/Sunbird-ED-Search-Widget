interface FilterNameProps {
  filters: string[];
}

interface ExtractFiltersDataProps {
  filters: string[];
  content: any;
  filterOptionData: {};
  setfilterData?: Function;
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
  filterOptionData
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
