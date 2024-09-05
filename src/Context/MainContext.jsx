import React, { useState, createContext } from "react";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [dogList, setDogList] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const bark = () => {
    console.log("Bark Bark");
  };

  const values = {
    dogList,
    setDogList,
    favoriteDogs,
    setFavoriteDogs,
    bark,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
