import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import babyNamesData from './babyNamesData.json';

type Baby = { id: number; name: string; sex: string };
type Button = {
  isAllDisabled: boolean;
  isGirlsDisabled: boolean;
  isBoysDisabled: boolean;
};

const sortName = (arrData: Baby[]): Baby[] => {
  arrData.sort((a, b) => (a.name < b.name ? -1 : b.name < a.name ? 1 : 0));
  return arrData;
};
sortName(babyNamesData);

function App() {
  const btnArr = ['All', 'Girls', 'Boys'];
  const [search, setSearch] = useState<string>('');
  const [originalBabies, setOriginalBabies] = useState<Baby[]>(babyNamesData);
  const [mainBoxBabies, setMainBoxBabies] = useState<Baby[]>(babyNamesData);
  const [favouriteBoxBabies, setFavouriteBoxBabies] = useState<Baby[]>([]);

  const [buttons, setButtons] = useState<Button>({
    isAllDisabled: true,
    isGirlsDisabled: false,
    isBoysDisabled: false
  });

  const filteredMainBoxBabies = useCallback((): void => {
    // if favouriteBoxBabies isn't​ empty, remove them from mainBoxBabies
    let mainBabies = originalBabies;
    if (favouriteBoxBabies.length > 0) {
      mainBabies = originalBabies.filter(
        (baby) => !favouriteBoxBabies.includes(baby)
      );
    }

    // if search field has value, filter mainBabies by search value
    if (search) {
      mainBabies = mainBabies.filter((baby) =>
        baby.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // filter mainBabies by sex button
    if (buttons.isGirlsDisabled) {
      mainBabies = mainBabies.filter((baby) => baby.sex === 'f');
    } else if (buttons.isBoysDisabled) {
      mainBabies = mainBabies.filter((baby) => baby.sex === 'm');
    }

    // update state with filtered mainBabies
    setMainBoxBabies(sortName(mainBabies));
  }, [originalBabies, favouriteBoxBabies, search, buttons]);

  const handleClickName = (baby: Baby, from: string): void => {
    // remove name from favouriteBoxBabies
    const filteredFavourites = favouriteBoxBabies.filter(
      ({ name }) => !name.toLowerCase().includes(baby.name.toLowerCase())
    );
    if (from === 'favouriteBoxBabies') {
      setFavouriteBoxBabies(filteredFavourites);
    } else if (from === 'mainBoxBabies') {
      setFavouriteBoxBabies([...filteredFavourites, baby]);
    }
  };
  const handleClickGender = (key: string): void => {
    setButtons({
      isAllDisabled: false,
      isGirlsDisabled: false,
      isBoysDisabled: false,
      [key]: true
    });
  };
  useEffect(() => {
    filteredMainBoxBabies();
  }, [buttons, originalBabies, filteredMainBoxBabies]);

  return (
    <div className='App-header'>
      <div className='container'>
        <div className='feature'>
          <input
            type='text'
            placeholder='Search for a name'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {btnArr.map((btn, idx) => (
            <button
              key={btn + idx}
              className={`${
                btn === 'Girls' ? 'girl' : btn === 'Boys' ? 'boy' : 'all'
              }-button`}
              disabled={buttons[`is${btn}Disabled` as keyof typeof buttons]}
              onClick={(e) => handleClickGender(e.currentTarget.value)}
              value={`is${btn}Disabled`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className='favourites-name-box'>
          Favourites:
          {favouriteBoxBabies.map((baby) => (
            <span
              key={baby.id}
              className={baby.sex === 'm' ? 'boy-name' : 'girl-name'}
              onClick={() => handleClickName(baby, 'favouriteBoxBabies')}
            >
              {baby.name}
            </span>
          ))}
        </div>
        <hr />
        <div className='main-name-box'>
          {mainBoxBabies.map((baby) => (
            <span
              key={baby.id}
              className={baby.sex === 'm' ? 'boy-name' : 'girl-name'}
              onClick={() => handleClickName(baby, 'mainBoxBabies')}
            >
              {baby.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
