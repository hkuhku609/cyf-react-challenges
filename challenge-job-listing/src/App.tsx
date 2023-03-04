import React, { useState, useEffect } from 'react';
import jobData from './data.json';
import './App.css';
type Data = {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: string[];
  tools: string[];
};

function App() {
  const [filterBox, setFilterBox] = useState<string[]>([]);
  const [dataBox, setDataBox] = useState<Data[]>(jobData);
  const [filteredDataBox, setFilteredDataBox] = useState<Data[]>(jobData);

  const handleClick = (keyWord: string): void => {
    !filterBox.includes(keyWord) && setFilterBox([...filterBox, keyWord]);
  };
  const handleRemove = (wordToRemove: string): void => {
    const filter = filterBox.filter((item) => item !== wordToRemove);
    setFilterBox(filter);
  };

  useEffect(() => {
    if (filterBox.length === 0) {
      setFilteredDataBox(dataBox);
    } else {
      const filteredData = dataBox.filter((job) => {
        const jobAllBtn = [job.role, job.level, ...job.languages, ...job.tools];
        return filterBox.every((filter) => jobAllBtn.includes(filter));
      });
      setFilteredDataBox(filteredData);
    }
  }, [filterBox, dataBox]);

  return (
    <div className='App-header'>
      <div className='filter-container flex'>
        {filterBox.map((word) => (
          <div key={`filter-${word}`} className='words flex'>
            <span>{word}</span>
            <button className='word-close' onClick={() => handleRemove(word)}>
              X
            </button>
          </div>
        ))}
        <div className='clear' onClick={() => setFilterBox([])}>
          clear
        </div>
      </div>
      {filteredDataBox.map((data) => (
        <div key={data.id} className='card-container flex'>
          <div className='left flex'>
            <div className='profilePic grid'>
              <img src={data.logo} alt={data.logo} />
            </div>
            <div className='information grid'>
              <div className='heading flex'>
                <div className='company bold'>{data.company}</div>
                <div className='tags flex'>
                  {data.new && <div className='tag new'>new!</div>}
                  {data.featured && (
                    <div className='tag featured'>featured</div>
                  )}
                </div>
              </div>
              <div className='position bold'>{data.position}</div>
              <div className='footer'>
                {`${data.postedAt} · ${data.contract} · ${data.location}`}
              </div>
            </div>
          </div>

          <div className='right'>
            <button onClick={() => handleClick(data.role)}>{data.role}</button>
            <button onClick={() => handleClick(data.level)}>
              {data.level}
            </button>
            {data.languages.map((language, index) => (
              <button
                key={`${language}-${index}`}
                onClick={() => handleClick(language)}
              >
                {language}
              </button>
            ))}
            {data.tools.length >= 1 &&
              data.tools.map((tool, index) => (
                <button
                  key={`${tool}-${index}`}
                  onClick={() => handleClick(tool)}
                >
                  {tool}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
