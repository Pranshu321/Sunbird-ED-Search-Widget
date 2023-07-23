import React, { ReactNode, useEffect } from 'react';
import { fetchData } from '../../api/api';
import useState from 'react-usestateref';
import { FiltersName, ExtractFiltersData, CardProps, ContentFilterDataRender } from '../../api/Service_Function';
import { Filter } from '../Filter';
import { Select } from '../Filter/Select';
import { TailwindCard } from '../card/TailwindCard';

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
}
export const ApiContext = ({
    children,
    headers,
    body,
    url,
    method,
    cache,
}: ApiContextProps) => {
    const [filters, setFilters] = useState<Array<string>>([]);
    const [ApiSettedFilters, setApiSettedFilters, ApifiltersRef] = useState<
        Array<string>
    >([]);
    const [content, setcontent, contentRef] = useState<Array<object>>([]);
    const [RenderContent, setRenderContent, RenderContentRef] = useState<
        Array<CardProps>
    >([
        {
            name: "",
            image: "",
            subject: "",
            type: "",
            publisher: "",
            tags: [""],
        },
    ]);
    const [filtersOptionData, setFiltersOptionData, FiltersOptionRef] = useState<{
        [key: string]: any[];
    }>({});
    const [filtersSelectedArray, setfiltersSelectedArray, FiltersSelectedArrayRef] = useState([{
        name: "",
        value: [],
    }]);

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
                console.log(filtersSelectedArray, filtersOptionData, content, ApiSettedFilters, RenderContent);

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
            })
        );
        // console.log(RenderContentRef.current);
    }

    useEffect(() => {
        ContentRenderToShow();
    }, [FiltersSelectedArrayRef.current]);

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

    return (
        <div>
            {children}
            <Filter>
                {filters.map((item, idx) =>
                    FiltersOptionRef.current[item] ? (
                        <Select
                            key={idx + 1}
                            optionName={item}
                            options={FiltersOptionRef.current[item]}
                            setFiltersArray={setfiltersSelectedArray}
                            FiltersArray={FiltersSelectedArrayRef.current}
                        />
                    ) : null
                )}
            </Filter>
            {RenderContentRef.current.length !== 1 &&
                RenderContentRef.current.map((item, idx) => (
                    <TailwindCard
                        key={idx + 1}
                        name={item.name}
                        publisher={item.publisher}
                        subject={item.subject}
                        type={item.type}
                        tags={item.tags}
                        image={item.image}
                    />
                ))
            }
        </div>
    );
};
