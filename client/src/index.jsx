import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getRepos()
  }, [])

  const search = (term, successCB, errCB) => {
    // console.log('term: ', term);
    $.ajax({
      // The URL for the request
      url: '/repos',
      // The data to send (will be converted to a query string)
      data: JSON.stringify({name: term}),
      type: "POST",
      // The type of data we expect back
      contentType: 'application/json',
      // dataType : 'json',
      success: (data) => {
        console.log('success');
        getRepos();
      },
      error: (data) => {
        console.log('Failed to search for: ', data);
      },
    });
  };

  const getRepos = () => {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (myData) => {
        console.log('myData: ', myData);
        setRepos(myData);
      }
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