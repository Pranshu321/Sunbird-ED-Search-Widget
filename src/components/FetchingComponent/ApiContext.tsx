import React, { useEffect } from 'react';
import { fetchData } from '../../api/api';
import useState from 'react-usestateref';
import { Filter } from '../Filter';
import { Select } from '../Filter/Select';
import { Card } from '../card/Card';
import { Button, FiltersDiv, ListDiv, MainDiv, ResetButton, Sidebar } from "../styled-components/ContextElements"

import {
  CardFieldsRender,
  FilterDataExtract,
  MasterFieldContentChange,
  RenderContentFunction,
  TermsFetch,
  DependentTermsFetch,
  UpdateConfig,
} from '../../api/Service_Function';
import { ApiContextProps } from '../../interfaces/interface';

export const ApiContext = ({
  children,
  headers,
  body,
  Formurl,
  ContentFetchObj,
  method,
  cache,
  styles,
  filterConfig,
  Termsurl,
  addtionalFilterConfig,
  CardFieldsProps,
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

  // Dependent Terms Data
  const [
    DependentTermsData,
    setDependentTermsData,
    DependentTermsRef,
  ] = useState<Array<object>>([{}]);

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

  // Filters Set and API Call
  const [FiltersSet, setFiltersSet, FiltersSetRef] = useState<any>(
    ContentFetchObj.body
  );

  // Adding The Filters
  const [addfilter, setaddfilter, addfilterRef] = useState<Array<number>>([]);

  // RenderContent
  const [RenderContent, setRenderContent, RenderContentRef] = useState<
    Array<any>
  >([]);

  // MasterFieldsTerms
  const [
    MasterFieldsTerms,
    setMasterFieldsTerms,
    MasterFieldsTermsRef,
  ] = useState<Array<object>>([{}]);
  const [MasterKeys, setMasterKeys, MasterKeysRef] = useState<Array<string>>(
    []
  );

  const check = false;
  if (check) {
    console.log(
      addfilter,
      FiltersArray,
      content,
      filtersOptionData,
      filterConfigState,
      MasterFieldsTerms,
      MasterKeys,
      FiltersSet,
      DependentTermsData
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
      url: ContentFetchObj.url,
      cache: 'default',
      method: ContentFetchObj.method,
      body: ContentFetchObj.body,
      headers: ContentFetchObj.headers,
    })
      .then(res => {
        setcontent(res.result.content);
      })
      .catch(err => {
        console.log(err);
      });

    fetchData({
      url: Termsurl,
      cache,
      method,
      body,
      headers,
    })
      .then(res => {
        TermsFetch(res, setMasterFieldsTerms, filterConfigRef.current);
        setMasterKeys(Object.keys(MasterFieldsTermsRef.current[0]));
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData({
      url: Termsurl,
      cache,
      method,
      body,
      headers,
    })
      .then(res => {
        const data = DependentTermsFetch(
          res,
          FiltersArrayRef.current,
          MasterFieldsTermsRef.current
        );
        setDependentTermsData(data);
        let flag = true;
        console.log(FiltersArrayRef.current);

        FiltersArrayRef.current.map((item: any) => {
          if (item?.value.length !== 0) {
            flag = false;
          }
        });

        if (flag) {
          fetchData({
            url: Termsurl,
            cache,
            method,
            body,
            headers,
          })
            .then(res => {
              // console.log(res);
              TermsFetch(res, setMasterFieldsTerms, filterConfigRef.current);
              // console.log(MasterFieldsTermsRef.current[0]);
              setMasterKeys(Object.keys(MasterFieldsTermsRef.current[0]));
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          setMasterFieldsTerms(DependentTermsRef.current);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [addfilterRef.current]);

  useEffect(() => {
    fetchData({
      url: ContentFetchObj.url,
      cache: 'default',
      method: ContentFetchObj.method,
      body: FiltersSetRef.current,
      headers: ContentFetchObj.headers,
    })
      .then(res => {
        setcontent(res.result.content);
        FilterDataRender();
      })
      .catch(err => {
        console.log(err);
      });
  }, [FiltersSetRef.current]);

  useEffect(() => {
    MasterFieldContentChange(
      FiltersArrayRef.current,
      filterConfig,
      ContentFetchObj.body,
      setFiltersSet
    );
    FilterDataRender();
  }, [addfilterRef.current]);

  function FilterDataRender() {
    // optionName wali field
    // Option Value wali field
    const ReturnData = FilterDataExtract({
      content: contentRef.current,
      filterConfig: filterConfigRef.current,
      TermsObject: MasterFieldsTermsRef.current,
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

  return (
    <MainDiv style={styles?.apiContextDiv}>
      {children}
      <Sidebar>
        <Button onClick={() => setShowFilter(!showFilter)}>Filter</Button>
        <FiltersDiv showfilter={showFilter}>
          <Filter>
            <ResetButton onClick={() => setReset(!reset)}>Reset</ResetButton>
            {MasterKeysRef.current?.map((MasterField: any, index) => {
              const item: any =
                MasterFieldsTermsRef?.current[0][MasterField as keyof {}];
              // console.log(item?.terms.sort());
              return (
                <Select
                  key={index}
                  optionName={item?.name?.toUpperCase()}
                  options={item?.terms.sort()}
                  setFiltersArray={setFiltersArray}
                  FiltersArray={FiltersArrayRef.current}
                  Reset={reset}
                  ArrayNumber={addfilterRef.current}
                  setArrayNumber={setaddfilter}
                />
              );
            })}
            {addtionalFilterConfig?.map((addtionalFilter: any, index) => {
              const name = addtionalFilter?.name;
              const item: any = FiltersOptionRef.current.filter(
                (filter: any) => filter?.name === name
              )[0];
              if (item !== null && item !== undefined)
                return (
                  <Select
                    key={index}
                    optionName={item?.name.toUpperCase()}
                    options={item?.value}
                    setFiltersArray={setFiltersArray}
                    FiltersArray={FiltersArrayRef.current}
                    Reset={reset}
                    ArrayNumber={addfilterRef.current}
                    setArrayNumber={setaddfilter}
                  />
                );
              else return null;
            })}
          </Filter>
        </FiltersDiv>
      </Sidebar>
      <ListDiv>
        {(RenderContentRef.current.length !== 0
          ? RenderContent
          : contentRef.current
        )?.map((item, idx) => {
          const DataObj = CardFieldsRender(item, CardFieldsProps);
          return (
            <Card
              styles={styles?.CardStyle}
              key={idx + 1}
              name={DataObj['name'] ? DataObj['name'] : ''}
              publisher={DataObj['publisher'] ? DataObj['publisher'] : ''}
              subject={DataObj['subject'] ? DataObj['subject'] : ''}
              type={DataObj['type'] ? DataObj['type'] : ''}
              tags={DataObj['tags'] ? DataObj['tags'] : []}
              image={DataObj['image'] ? DataObj['image'] : ''}
            />
          );
        })}
      </ListDiv>
    </MainDiv>
  );
};
