import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApiContext } from '../.';

const App = () => {
  return (
    <div>
      <ApiContext
        url='http://localhost:4000/api/v1'
        method='GET'
        cache='no-cache'
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
