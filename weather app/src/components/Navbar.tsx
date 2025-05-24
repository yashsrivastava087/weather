import { useState } from 'react';
import { Button } from "@/components/ui/button"
const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <div className=' px-9 bg-gray-800 w-full rounded-2xl mb-13'>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;