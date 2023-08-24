import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApiContext } from '../.';

const App = () => {

  const Mockheaders = {
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua":
      '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    ts: "2023-08-21T17:31:11+05:30",
    "x-app-id": "prod.diksha.portal",
    "x-app-version": "5.1.0",
    "x-channel-id": "ORG_001",
    "x-device-id": "0f258c189ff9215ffe63833b0c404e08",
    "x-msgid": "21860a6d-4b55-c0a8-6cdc-da912ba28ab7",
    "x-org-code": "ORG_001",
    "x-request-id": "21860a6d-4b55-c0a8-6cdc-da912ba28ab7",
    "x-session-id": "f1feb433-7503-5b50-87d7-21365e4d89e7",
    "x-source": "web",
    cookie:
      "ph_foZTeM1AW8dh5WkaofxTYiInBhS4XzTzRqLs50kVziw_posthog=%7B%22distinct_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24device_id%22%3A%221891d51c9b2b7-0eb5eb0b0afd7a-26031d51-144000-1891d51c9b37b1%22%2C%22%24user_state%22%3A%22anonymous%22%2C%22extension_version%22%3A%221.5.5%22%2C%22%24session_recording_enabled_server_side%22%3Afalse%2C%22%24autocapture_disabled_server_side%22%3Afalse%2C%22%24active_feature_flags%22%3A%5B%5D%2C%22%24enabled_feature_flags%22%3A%7B%22enable-session-recording%22%3Afalse%2C%22sourcing%22%3Afalse%2C%22only-company-edit%22%3Afalse%2C%22job-lists%22%3Afalse%7D%2C%22%24feature_flag_payloads%22%3A%7B%7D%7D; connect.sid=s%3AYhgkdYMg4THiiCB7HyDNGgce3cMUpSBm.aJaGPEO%2FdfajGjrJsGQKU54V2Phgn6haB7%2FS%2BMffMTg; __z_a=157831982408696518540869",
    Referer:
      "https://www.diksha.gov.in/explore?board=CBSE&medium=English&gradeLevel=Class%2012&&id=ekstep_ncert_k-12&selectedTab=textbook",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  }

  const mockBody = '{"request":{"filters":{"subject":[],"audience":[],"primaryCategory":[],"se_boards":[],"se_gradeLevels":[],"se_mediums":[]},"limit":100,"fields":["name","appIcon","mimeType","gradeLevel","identifier","medium","pkgVersion","board","subject","resourceType","primaryCategory","contentType","channel","organisation","trackable","se_boards","se_subjects","se_mediums","se_gradeLevels"],"facets":["se_subjects"]}}'

  const Mockmethod = "POST";

  return (
    <>
      <ApiContext
        Formurl='http://localhost:3000/form'
        ContentFetchObj={
          {
            url: "https://www.diksha.gov.in/api/content/v1/search?orgdetails=orgName,email&framework=ekstep_ncert_k-12",
            method: Mockmethod,
            body: mockBody,
            headers: Mockheaders
          }
        }
        Termsurl="http://localhost:3000/terms"
        CardFieldsProps={{
          name: {
            field: 'name',
          },
          type: {
            field: "se_subjects"
          },
          tags: {
            TagsFieldArray: [
              "medium",
              "se_boards",
              "se_subjects",
            ]
          },
          image: {
            field: "appIcon"
          },
          publisher: { field: "organisation" },
          subject: { field: "se_subjects" }
        }}
        cache='reload'
        filterConfig={[
          {
            name: "Board",
            field: "se_boards",
          },
          {
            name: "Medium",
            field: "se_mediums",
          },
          {
            name: "Subject",
            field: "subject"
          },
          {
            name: "gradeLevel", // Category Name equal
            field: "se_gradeLevels" // Filters Name Equal in the API
          }
        ]}
        addtionalFilterConfig={[
          {
            name: "identifier",
            field: "name",
            isEnabled: true
          }
        ]}

        method='GET'
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
