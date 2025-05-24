import { useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';

const Weatherapp = () => {
  const [searchquery, setsearchquery] = useState('Mumbai');

  const handleSearch = (query: string) => {
    setsearchquery(query);
  };

  return (
    <div >
      <Navbar onSearch={handleSearch} />
      <div className="mt-8 p-4">
        <Main searchQuery={searchquery} />
      </div>
    </div>
  );
};

export default Weatherapp;