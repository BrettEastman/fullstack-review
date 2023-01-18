import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);

  // const search = (term, successCB, errCB) => {
  //   console.log('still working');
  // }

  const search = (term, successCB, errCB) => {
    console.log(term);
    $.ajax({
      // The URL for the request
      url: '/repos',
      // The data to send (will be converted to a query string)
      data: {name: term},
      type: "POST",
      // The type of data we expect back
      // contentType: 'application/json',
      // dataType : 'json',
      success: (data) => {
        console.log('success');
      },
      error: (data) => {
        console.log('Failed to search for: ', data);
      },
    });
  };

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));