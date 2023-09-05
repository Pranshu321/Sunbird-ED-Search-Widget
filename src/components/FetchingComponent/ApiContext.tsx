import React, { createContext, useEffect } from 'react';
import { fetchData } from '../../api/api';
import useState from 'react-usestateref';
import { Filter } from '../Filter';
import { Select } from '../Filter/Select';
import { Card } from '../card/Card';
import {
  Button,
  FiltersDiv,
  ListDiv,
  MainDiv,
  ResetButton,
  Sidebar,
} from '../styled-components/ContextElements';

import {
  CardFieldsRender,
  FilterDataExtract,
  MasterFieldContentChange,
  RenderContentFunction,
  TermsFetch,
  DependentTermsFetch,
  UpdateConfig,
  FrameworksOptionsRender,
  GetFrameWorkID,
} from '../../api/Service_Function';
import { ApiContextProps } from '../../interfaces/interface';
import { SingleSelect } from '../Filter/SingleSelect';

export const CardContext = createContext({
  name: "",
  image: "",
  subject: "",
  type: "",
  publisher: "",
  tags: [""],
});
export const ApiContext = ({
  children,
  Formurl,
  SearchAPI,
  cache,
  hostname,
  styles,
  filterConfig,
  TermsAPI,
  addtionalFilterConfig,
  YourCard,
  Frameworks,
  CardFieldsProps,
}: ApiContextProps) => {
  // Content or Data
  const [content, setcontent, contentRef] = useState<Array<object>>([]);

  // Filters Config
  const [filterConfigState, setFilterConfig, filterConfigRef] = useState<
    Array<any>
  >([]);

  // Card Context

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

  // FrameWorks Options
  const [FrameworkOptions, setFrameWorkOptions, FrameworkOptionsRef] = useState<
    Array<string>
  >([]);

  // Framework
  const [Framework, setFrameWork, FrameworkRef] = useState<string>('');

  // Resetting the filters
  const [reset, setReset] = useState<boolean>(false);

  // Filters Set and API Call
  const [FiltersSet, setFiltersSet, FiltersSetRef] = useState<any>(
    SearchAPI.body
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
      DependentTermsData,
      FrameworkOptions
    );
  }

  function FetchAndUpdateFilterConfig() {
    fetchData({
      url: Formurl,
      cache: cache,
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
    const FrameworkID =
      FrameworkRef.current === ''
        ? 'ekstep_ncert_k-12'
        : GetFrameWorkID(Frameworks, FrameworkRef.current);
    fetchData({
      url: `${hostname}/api/content/v1/search?orgdetails=orgName,email&framework=${FrameworkID}`,
      cache: 'default',
      method: SearchAPI.method,
      body: SearchAPI.body,
      headers: SearchAPI.headers,
    })
      .then(res => {
        setcontent(res.result.content);
      })
      .catch(err => {
        console.log(err);
      });

    fetchData({
      url: `${hostname}/api/framework/v1/read/${FrameworkID}?categories=board,gradeLevel,medium,class,subject`,
      cache,
      method: TermsAPI.method,
      body: TermsAPI.body,
      headers: TermsAPI.headers,
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
    const FrameworkID =
      FrameworkRef.current === ''
        ? 'ekstep_ncert_k-12'
        : GetFrameWorkID(Frameworks, FrameworkRef.current);
    fetchData({
      url: `${hostname}/api/framework/v1/read/${FrameworkID}?categories=board,gradeLevel,medium,class,subject`,
      cache,
      method: TermsAPI.method,
      body: TermsAPI.body,
      headers: TermsAPI.headers,
    })
      .then(res => {
        const data = DependentTermsFetch(
          res,
          FiltersArrayRef.current,
          MasterFieldsTermsRef.current
        );
        setDependentTermsData(data);
        let flag = true;

        FiltersArrayRef.current.map((item: any) => {
          if (item?.value.length !== 0) {
            flag = false;
          }
        });

        if (flag) {
          fetchData({
            url: `${hostname}/api/framework/v1/read/${FrameworkID}?categories=board,gradeLevel,medium,class,subject`,
            cache,
            method: TermsAPI.method,
            headers: TermsAPI.headers,
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
  }, [addfilterRef.current, FrameworkRef.current]);

  useEffect(() => {
    const FrameworkID =
      FrameworkRef.current === ''
        ? 'ekstep_ncert_k-12'
        : GetFrameWorkID(Frameworks, FrameworkRef.current);
    fetchData({
      url: `${hostname}/api/content/v1/search?orgdetails=orgName,email&framework=${FrameworkRef.current === '' ? 'ekstep_ncert_k-12' : FrameworkID
        }`,
      cache: 'default',
      method: SearchAPI.method,
      body: FiltersSetRef.current,
      headers: SearchAPI.headers,
    })
      .then(res => {
        if (res.result.content !== undefined) {
          setcontent(res.result.content);
          FilterDataRender();
        } else if (res.result.QuestionSet !== undefined) {
          setcontent(res.result.QuestionSet);
          FilterDataRender();
        } else {
          setcontent(contentRef.current);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [FiltersSetRef.current]);

  useEffect(() => {
    MasterFieldContentChange(
      FiltersArrayRef.current,
      filterConfig,
      SearchAPI.body,
      setFiltersSet
    );
    FilterDataRender();
  }, [addfilterRef.current, FrameworkRef.current]);

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
    FetchAndUpdateFilterConfig();
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

  useEffect(() => {
    if (Frameworks[0] !== undefined && Frameworks[0] !== '') {
      const FrameWorksOption = FrameworksOptionsRender(Frameworks);
      setFrameWorkOptions(FrameWorksOption);
    }
  }, [Frameworks]);

  return (
    <MainDiv style={styles?.apiContextDiv?.Container}>
      {children}
      <Sidebar style={styles?.apiContextDiv?.Sidebar}>
        <Button
          style={styles?.apiContextDiv?.Button}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </Button>
        <FiltersDiv
          style={styles?.apiContextDiv?.FiltersDiv}
          showfilter={showFilter}
        >
          <Filter stylesFilterDiv={styles?.apiContextDiv?.Filter}>
            <ResetButton onClick={() => setReset(!reset)}>Reset</ResetButton>
            {FrameworkOptionsRef.current.length !== 0 && (
              <SingleSelect
                Framework={Framework}
                setFramework={setFrameWork}
                FiltersArray={FiltersArrayRef.current}
                setFiltersArray={setFiltersArray}
                options={FrameworkOptionsRef.current}
                optionName={'Board'.toUpperCase()}
                Reset={reset}
                styles={styles?.SelectStyle}
              />
            )}
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
                  styles={styles?.SelectStyle}
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
                // console.log(item?.value);
                return (
                  <Select
                    key={index}
                    optionName={item?.name.toUpperCase()}
                    options={item?.value}
                    setFiltersArray={setFiltersArray}
                    FiltersArray={FiltersArrayRef.current}
                    Reset={reset}
                    styles={styles?.SelectStyle}
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
            YourCard === undefined ? (
              <Card
                styles={styles?.CardStyle}
                key={idx + 1}
                name={DataObj["name"] ? DataObj["name"] : ""}
                publisher={DataObj["publisher"] ? DataObj["publisher"] : ""}
                subject={DataObj["subject"] ? DataObj["subject"] : ""}
                type={DataObj["type"] ? DataObj["type"] : ""}
                tags={DataObj["tags"] ? DataObj["tags"] : []}
                image={DataObj["image"] ? DataObj["image"] : ""}
              />
            ) : (
              <CardContext.Provider value={{
                name: DataObj["name"] ? DataObj["name"] : "",
                publisher: DataObj["publisher"] ? DataObj["publisher"] : "",
                subject: DataObj["subject"] ? DataObj["subject"] : "",
                type: DataObj["type"] ? DataObj["type"] : "",
                tags: DataObj["tags"] ? DataObj["tags"] : [],
                image: DataObj["image"] ? DataObj["image"] : "",
              }}>
                {YourCard}
              </CardContext.Provider>
            )
          );
        })}
      </ListDiv>
    </MainDiv>
  );
};
