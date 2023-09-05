import React, { useEffect } from 'react';
import useStateRef from 'react-usestateref';
import { ApiContext } from './ApiContext';
import { fetchData } from '../../api/api';
import { WrapperProps } from '../../interfaces/interface';

export const Wrapper = ({
  hostname,
  DefaultChannel,
  GetChannel,
  cache,
  SearchAPI,
  TermsRead,
  children,
  Formurl,
  CardFieldsProps,
  styles,
  filterConfig,
  addtionalFilterConfig,
  YourCard,
}: WrapperProps) => {
  const [defaultChannel, setdefaultChannel, defaultChannelRef] = useStateRef<
    string
  >('');
  const [frameWorksArray, setFrameWorksArray, frameWorksArrayRef] = useStateRef<
    Array<any>
  >(['']);
  if (false) {
    defaultChannel;
    frameWorksArray;
  }

  useEffect(() => {
    fetchData({
      url: `${hostname}/learner/data/v1/system/settings/get/custodianOrgId`,
      method: DefaultChannel.method,
      headers: DefaultChannel.header,
      cache: DefaultChannel.cache,
    })
      .then(res => {
        setdefaultChannel(res.result.response.value);
        GetChannelFrameworks();
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  function GetChannelFrameworks() {
    fetchData({
      url: `${hostname}/api/channel/v1/read/${defaultChannelRef.current}`,
      method: GetChannel.method,
      headers: GetChannel.header,
      cache: GetChannel.cache,
    })
      .then(res => {
        setFrameWorksArray(res.result.channel.frameworks);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <ApiContext
        Frameworks={frameWorksArrayRef.current}
        Formurl={Formurl}
        SearchAPI={{
          headers: SearchAPI.headers,
          body: SearchAPI.body,
          method: SearchAPI.method,
        }}
        TermsAPI={{
          headers: TermsRead.headers,
          method: TermsRead.method,
        }}
        hostname={hostname}
        YourCard={YourCard}
        filterConfig={filterConfig}
        children={children}
        cache={cache === undefined ? 'default' : cache}
        styles={styles}
        CardFieldsProps={CardFieldsProps}
        addtionalFilterConfig={addtionalFilterConfig}
      />
    </div>
  );
};

export default Wrapper;
