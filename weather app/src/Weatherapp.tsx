import { useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Loadingscreen from './components/Loading';

const Weatherapp = () => {
  const [searchquery, setsearchquery] = useState('');
  const [isloaded, setisloaded] = useState(false);

  const handleSearch = (query: string) => {
    setsearchquery(query);
  };

  const clearSearch = () => {
    setsearchquery('');
  };

  return (
    <div>
      {!isloaded && <Loadingscreen oncomplete={() => setisloaded(true)} />}
      
   
      <Navbar onSearch={handleSearch} clearSearch={clearSearch} />
      
      <div className="mt-8 p-4">
        <Main searchQuery={searchquery} searchMode="Location" clearSearch={clearSearch} />
      </div>
    </div>
  );
};

export default Weatherapp;
