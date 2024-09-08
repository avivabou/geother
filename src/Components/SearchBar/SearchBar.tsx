import React, { useCallback, useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import './SearchBar.css';
import { MapItem } from '../../Types/generics';

type SearchBarProps = {
  onSelect: (selected: string) => void;
  getSearchOptions?: (searchTerm: string) => Promise<MapItem[]>;
};

const convertToDropdownItem = (resultOption: MapItem) => ({
  ...resultOption,
  label: <div className="dropdown-option">{resultOption.value}</div>,
});

function SearchBar({ onSelect, getSearchOptions }: SearchBarProps) {
  const [options, setOptions] = useState<MapItem[]>([]);
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
      onSelect={(_, { key }) => onSelect(key)}
      onSearch={handleSearch}
      className="searchbar-box"
    >
      <Input.Search placeholder="search" enterButton />
    </AutoComplete>
  );
}

export default SearchBar;
