import React, { ReactNode, useEffect } from 'react';
import { fetchData } from '../../api/api';
import useState from 'react-usestateref';
import {
  FiltersName,
  ExtractFiltersData,
  CardProps,
  ContentFilterDataRender,
} from '../../api/Service_Function';
import { Filter } from '../Filter';
import { Select } from '../Filter/Select';
import { TailwindCard } from '../card/TailwindCard';
import { styled } from 'styled-components';

interface StyleProps {
  apiContextDiv: {};
  FilterComponent: {};
  CardStyle: {};
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
  background-color: #e9e8d9;
  border: none;
  color: black;
  font-size: 15px;
  font-weight: 700;
  position: relative;
  left: 210px;
  cursor: pointer;
  top: 30px;
`;

interface ApiContextProps {
  children?: ReactNode;
  headers?: {};
  body?: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  cache:
    | 'default'
    | 'no-store'
    | 'reload'
    | 'force-cache'
    | 'only-if-cached'
    | 'no-cache';
  styles?: StyleProps;
}
export const ApiContext = ({
  children,
  headers,
  body,
  url,
  method,
  cache,
  styles,
}: ApiContextProps) => {
  const [filters, setFilters] = useState<Array<string>>([]);
  const [ApiSettedFilters, setApiSettedFilters, ApifiltersRef] = useState<
    Array<string>
  >([]);
  const [NotIncludeFilter, setNotIncludeFilter, NotIncludeFilterRef] = useState<
    Array<number>
  >([]);
  const [content, setcontent, contentRef] = useState<Array<object>>([]);
  const [RenderContent, setRenderContent, RenderContentRef] = useState<
    Array<CardProps>
  >([
    {
      name: '',
      image: '',
      subject: '',
      type: '',
      publisher: '',
      tags: [''],
    },
  ]);
  const [ShowFilter, setShowFilter] = useState(false);
  const [filtersOptionData, setFiltersOptionData, FiltersOptionRef] = useState<{
    [key: string]: any[];
  }>({});
  const [Reset, setReset, ResetRef] = useState(false);
  const [
    filtersSelectedArray,
    setfiltersSelectedArray,
    FiltersSelectedArrayRef,
  ] = useState([
    {
      name: '',
      value: [],
    },
  ]);

  function FetchContentAndFilter() {
    fetchData({
      url: `${url}/content`,
      method: method,
      cache: cache,
      headers: headers,
      body: body,
    })
      .then(res => {
        let ContentResponse = [{}];
        res.map((item: any) => {
          if (item.filters !== undefined) {
            const arr = FiltersName({
              filters: Object.keys(item.filters),
            });
            setApiSettedFilters(Object.keys(item.filters));
            setFilters(arr);
          } else {
            ContentResponse.push(item);
          }
        });
        ContentResponse.splice(0, 1);
        setcontent(ContentResponse);
        console.log(
          filtersSelectedArray,
          filtersOptionData,
          content,
          ApiSettedFilters,
          RenderContent,
          NotIncludeFilter
        );

        FilterOptionExtract();
        ContentRenderToShow();
      })
      .catch(err => {
        console.log(err, err.message);
      });
  }

  function ContentRenderToShow() {
    setRenderContent(
      ContentFilterDataRender({
        content: contentRef.current,
        filtersSelectedArray: FiltersSelectedArrayRef.current,
        ApiSettedFilters: ApifiltersRef.current,
        Filters: filters,
        NotIncludeFilter: NotIncludeFilterRef.current,
      })
    );
    // console.log(RenderContentRef.current);
  }

  useEffect(() => {
    ContentRenderToShow();
  }, [FiltersSelectedArrayRef.current, NotIncludeFilterRef.current]);

  function FilterOptionExtract() {
    const data = ExtractFiltersData({
      content: contentRef.current,
      filterOptionData: FiltersOptionRef.current,
      filters: ApifiltersRef.current,
    });
    setFiltersOptionData(data);
  }

  useEffect(() => {
    FetchContentAndFilter();
  }, []);

  useEffect(() => {
    setRenderContent([
      {
        name: '',
        image: '',
        subject: '',
        type: '',
        publisher: '',
        tags: [],
      },
    ]);
    setNotIncludeFilter([]);
    setfiltersSelectedArray([
      {
        name: '',
        value: [],
      },
    ]);
  }, [Reset]);

  return (
    <MainDiv style={styles?.apiContextDiv}>
      {children}
      <Sidebar>
        <Button onClick={() => setShowFilter(!ShowFilter)}>Filter</Button>
        <FiltersDiv showfilter={ShowFilter}>
          <Filter stylesFilterDiv={styles?.FilterComponent}>
            <ResetButton onClick={() => setReset(!Reset)}>Reset</ResetButton>
            {filters.map((item, idx) =>
              FiltersOptionRef.current[item] ? (
                <Select
                  key={idx + 1}
                  optionName={item}
                  options={FiltersOptionRef.current[item]}
                  setFiltersArray={setfiltersSelectedArray}
                  FiltersArray={FiltersSelectedArrayRef.current}
                  SetNotIncludeFilter={setNotIncludeFilter}
                  NotIncludeFilter={NotIncludeFilterRef.current}
                  Reset={ResetRef.current}
                />
              ) : null
            )}
          </Filter>
        </FiltersDiv>
      </Sidebar>
      <ListDiv>
        {RenderContentRef.current.length !== 1 &&
          RenderContentRef.current.map((item, idx) => (
            <TailwindCard
              styles={styles?.CardStyle}
              key={idx + 1}
              name={item.name}
              publisher={item.publisher}
              subject={item.subject}
              type={item.type}
              tags={item.tags}
              image={item.image}
            />
          ))}
      </ListDiv>
    </MainDiv>
  );
};
