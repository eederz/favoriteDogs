import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import MainContextProvider from "./Context/MainContext";
import { MainContext } from "./Context/MainContext";

const Header = () => {
  return <h1 className="headers-main">Image Loader</h1>;
};

const PetCard = ({ petUrl }) => {
  const { favoriteDogs, setFavoriteDogs } = useContext(MainContext);
  return (
    <div>
      <img src={petUrl} alt="" width="200px" />
      <div>
        <button onClick={() => setFavoriteDogs([...favoriteDogs, petUrl])}>
          Save
        </button>
        <button>Delete</button>
      </div>
    </div>
  );
};

const PetContainer = () => {
  const { dogList, setDogList } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  const petNumber = 10;
  const petUrl = `https://dog.ceo/api/breeds/image/random/${petNumber}`;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petRequest = await fetch(petUrl);
        const petData = await petRequest.json();
        setDogList(petData.message);
      } catch (error) {
        console.error("Error fetching dog images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1 className="headers-main">Pet Container</h1>
      <div className="container-pet">
        {dogList.map((dogItem) => {
          return <PetCard petUrl={dogItem} />;
        })}
      </div>
    </div>
  );
};

//Favorite dogList
const FavoriteDogsContainer = () => {
  const [hasDogs, setHasDogs] = useState(true);
  const { favoriteDogs } = useContext(MainContext);

  if (!hasDogs) {
    return <h1>There are no Favorite Dogs</h1>;
  }

  return (
    <div className="container-pet">
      <h1>Favorite Dogs</h1>
      <div>
        {favoriteDogs.map((dogItem) => {
          return <PetCard petUrl={dogItem} />;
        })}
      </div>
    </div>
  );
};

//Main App
const App = () => {
  return (
    <div className="App">
      <MainContextProvider>
        <Header />
        <PetContainer />
        <FavoriteDogsContainer />
      </MainContextProvider>
    </div>
  );
};

export default App;
