// Navbar.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button"

const Navbar = ({ onSearch, clearSearch }: { 
  onSearch: (query: string) => void;
  clearSearch: () => void;
}) => {
  const [localQuery, setLocalQuery] = useState('');

  const handleSearch = () => {
    if (localQuery.trim()) {
      onSearch(localQuery.trim());
    }
  };

  return (
    <div className='px-9 bg-gray-800 w-full rounded-2xl mb-4'>
      <div className='max-w-7xl mx-auto h-16 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-white'>
          Weather<span className='text-[#a3bc00]'>X</span>
        </h1>

        <div className='flex items-center gap-4'>
          <div className='flex bg-white rounded-md shadow-sm'>
            <input
              type='text'
              placeholder='Enter location'
              className='px-4 py-2 w-64 focus:outline-none'
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              variant="secondary"
              onClick={handleSearch}
              className="h-full px-5 py-2.5 bg-[#a3bc00] text-black font-medium hover:bg-[#8fa600] transition-colors cursor-pointer"
            >
              Search
            </Button>
          </div>
          <Button 
            onClick={clearSearch}
            variant="ghost"
            className="text-white hover:bg-gray-700"
          >
            Show All Cities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;