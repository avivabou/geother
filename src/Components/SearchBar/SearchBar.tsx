import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import './SearchBar.css';

type SearchBarProps = {
  onSelect: (selected: string) => void;
  getSearchOptions?: (searchTerm: string) => Promise<string[]>;
};

const convertToDropdownItem = (resultOption: string) => ({
  value: resultOption,
  label: <div className="dropdown-option">{resultOption}</div>,
});

function SearchBar({ onSelect, getSearchOptions }: SearchBarProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSearchOptions = useCallback(async () => {
    if (getSearchOptions && searchTerm) {
      const searchResults = await getSearchOptions(searchTerm);
      if (searchResults) {
        setOptions(searchResults.splice(0, 5));
      }
    } else {
      setOptions([]);
    }
  }, [getSearchOptions, searchTerm]);

  useEffect(() => {
    fetchSearchOptions();
  }, [fetchSearchOptions]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <AutoComplete
      options={options.map(convertToDropdownItem)}
      onSelect={(option) => onSelect(option)}
      onSearch={handleSearch}
      className="searchbar-box"
    >
      <Input.Search placeholder="search" enterButton />
    </AutoComplete>
  );
}

export default SearchBar;
