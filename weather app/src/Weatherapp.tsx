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
  

  return (
    <div>
      {!isloaded && <Loadingscreen oncomplete={() => setisloaded(true)} />}
      <Navbar onSearch={handleSearch} />
      <div className="mt-8 p-4">
        <Main searchQuery={searchquery} searchMode="Location" />
      </div>
    </div>
  );
};

export default Weatherapp;