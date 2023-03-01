import React, { useState } from 'react';
import './App.css';
import allCountryScores from './scores.js';
import Items from './Items';
allCountryScores.sort((a, b) =>
  a.name < b.name ? -1 : b.name < a.name ? 1 : 0
);
type Score = { n: string; s: number };

function App() {
  const [sort, setSort] = useState<'ASC' | 'DESC'>('DESC');
  const sortScores = (scores: Score[]): Score[] =>
    sort === 'ASC'
      ? scores.sort((a, b) => a.s - b.s)
      : scores.sort((a, b) => b.s - a.s);

  return (
    <div className='App-header'>
      <h1>High Scores per Country</h1>
      <button onClick={() => setSort(sort === 'DESC' ? 'ASC' : 'DESC')}>
        toggle the scores between ascending and descending
      </button>
      {allCountryScores.map((country) => (
        <div key={country.name}>
          <h3>High scores in {country.name}:</h3>
          <div className='sub-table'>
            <Items items={sortScores(country.scores)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
