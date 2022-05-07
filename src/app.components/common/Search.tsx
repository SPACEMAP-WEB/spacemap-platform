import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

type SearchProps = {
  handleSearch: React.MouseEventHandler<HTMLButtonElement>
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ handleSearch, searchValue, setSearchValue }: SearchProps) => {
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  return (
    <SearchWrapper>
      <input
        type="text"
        className="search-input"
        value={searchValue}
        onChange={handleValueChange}
      />
      <button onClick={handleSearch}>Search</button>
    </SearchWrapper>
  )
}

export default Search

export const SearchWrapper = styled.div`
  width: 300px;
  display: flex;
  gap: 1rem;
  .search-input {
    width: 100%;
  }
`
