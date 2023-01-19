import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    {repos.map((repo) => {
      return (
        <div key={repo.id}>{repo.name}</div>
      )
    })}
  </div>
)

export default RepoList;