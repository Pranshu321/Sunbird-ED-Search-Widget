import { ReactNode, useEffect } from 'react';
import { fetchData } from '../../api/api';
import useState from 'react-usestateref';
import { Filter } from '../Filter';
import { Select } from '../Filter/Select';
import { styled } from 'styled-components';
import {
  FilterDataExtract,
  RenderContentFunction,
  UpdateConfig,
} from '../../api/Service_Function';
import { Card } from '../card/Card';
import React from 'react';

interface StyleProps {
  apiContextDiv: {};
  FilterComponent: {};
  CardStyle: {};
  SelectStyle: {};
}

const MainDiv = styled.div`
  display: flex;
  column-gap: 20px;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 15px;
  background-color: #e9e8d9;
  color: black;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  position: absolute;
  left: 5px;
  top: 10px;
  width: 7rem;
  display: none;
  @media (max-width: 500px) {
    display: block;
  }
`;

const FiltersDiv = styled.div<{ showfilter: boolean }>`
  height: max-content;
  position: relative;
  top: 10px;
  left: 10px;
  @media screen and (max-width: 500px) {
    display: ${(props: any) => (props?.showfilter ? 'none' : 'block')};
    position: absolute;
    top: 55px;
    left: 10px;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
`;

const ResetButton = styled.button`
  border: none;
  color: black;
  font-size: 15px;
  font-weight: 700;
  position: relative;
  left: 104px;
  cursor: pointer;
  top: 10px;
  background: transparent;
`;

interface FilterConfigProps {
  name: string;
  field: string;
  isEnabled?: boolean;
}

// interface CardConfigProps {
//   field: string,
//   isEnabled: boolean
// }

interface ApiContextProps {
  children?: ReactNode;
  headers?: {};
  body?: string;
  Formurl: string;
  Contenturl: string;
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
}
export const ApiContext = ({
  children,
  headers,
  body,
  Formurl,
  Contenturl,
  method,
  cache,
  styles,
  filterConfig,
  addtionalFilterConfig,
}: ApiContextProps) => {
  // Content or Data
  const [content, setcontent, contentRef] = useState<Array<object>>([]);

  // Filters Config
  const [filterConfigState, setFilterConfig, filterConfigRef] = useState<
    Array<any>
  >([]);

  // Filters Options Data
  const [filtersOptionData, setFiltersOptionData, FiltersOptionRef] = useState<
    Array<object>
  >([{}]);

  const [FiltersArray, setFiltersArray, FiltersArrayRef] = useState([
    {
      name: '',
      value: [],
    },
  ]);

  // Filter Showing Toggle
  const [showFilter, setShowFilter] = useState<boolean>(false);

  // Resetting the filters
  const [reset, setReset] = useState<boolean>(false);

  // Adding The Filters
  const [addfilter, setaddfilter, addfilterRef] = useState<Array<number>>([]);

  // RenderContent
  const [RenderContent, setRenderContent, RenderContentRef] = useState<
    Array<any>
  >([]);

  const check = false;
  if (check) {
    console.log(
      addfilter,
      FiltersArray,
      content,
      filtersOptionData,
      filterConfigState
    );
  }

  function FetchAndUpdateFilterConfig() {
    fetchData({
      headers: headers,
      body: body,
      url: Formurl,
      cache: cache,
      method: method,
    })
      .then((res: any) => {
        setFilterConfig(res);
        setFilterConfig(
          UpdateConfig({
            apiData: res,
            setFilterConfig,
            filterConfig,
            addtionalFilterConfig,
          })
        );
      })
      .catch((err: any) => {
        console.log(err);
      });

    fetchData({
      url: Contenturl,
      cache,
      method,
      body,
      headers,
    })
      .then(res => {
        setcontent(res);
        FilterDataRender();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function FilterDataRender() {
    // optionName wali field
    // Option Value wali field
    const ReturnData = FilterDataExtract({
      content: contentRef.current,
      filterConfig: filterConfigRef.current,
    });
    setFiltersOptionData(ReturnData.OptionValueArray);
  }

  useEffect(() => {
    setFiltersArray([]);
  }, [reset]);

  useEffect(() => {
    RenderContentFunction({
      content: contentRef.current,
      filtersSelected: FiltersArrayRef.current,
      setRenderContentData: setRenderContent,
      filterConfig: filterConfigRef.current,
      RenderContent,
    });
  }, [addfilterRef.current]);

  useEffect(() => {
    FetchAndUpdateFilterConfig();
  }, []);

  console.log('Filters Array', FiltersArrayRef.current);
  console.log('Content Array', RenderContentRef.current);

  return (
    <MainDiv style={styles?.apiContextDiv}>
      {children}
      <Sidebar>
        <Button onClick={() => setShowFilter(!showFilter)}>Filter</Button>
        <FiltersDiv showfilter={showFilter}>
          <Filter stylesFilterDiv={styles?.FilterComponent}>
            <ResetButton onClick={() => setReset(!reset)}>Reset</ResetButton>
            {FiltersOptionRef.current?.map((item: any, index) => {
              return (
                <Select
                  key={index}
                  styles={styles?.SelectStyle}
                  optionName={item?.name?.toUpperCase()}
                  options={item?.value}
                  setFiltersArray={setFiltersArray}
                  FiltersArray={FiltersArrayRef.current}
                  Reset={reset}
                  ArrayNumber={addfilterRef.current}
                  setArrayNumber={setaddfilter}
                />
              );
            })}
          </Filter>
        </FiltersDiv>
      </Sidebar>
      <ListDiv>
        {(RenderContentRef.current.length !== 0
          ? RenderContent
          : contentRef.current
        ).map((item, idx) => (
          <Card
            styles={styles?.CardStyle}
            key={idx + 1}
            name={item.name}
            publisher={item.publisher}
            subject={item.subject}
            type={item.type}
            tags={item.tags}
            image={item?.appIcon}
          />
        ))}
      </ListDiv>
    </MainDiv>
  );
};
