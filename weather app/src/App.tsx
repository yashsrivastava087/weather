
import { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Main from './components/Main.tsx';
import Loadingscreen from './components/Loading.tsx';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isloaded, setisloaded] = useState(false);
  return (
    <div >
      {!isloaded && <Loadingscreen oncomplete={() => setisloaded(true)} />}
    <div className="min-h-screen bg-black mt-1.5">
      <Navbar 
        onSearch={(query) => setSearchQuery(query)}
        clearSearch={() => setSearchQuery('')}
      />
      <Main 
        searchQuery={searchQuery}
        searchMode="Location" 
        clearSearch={() => setSearchQuery('')}
      />
    </div>
    </div>
  );
};

export default App;