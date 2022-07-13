import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { SecondaryButton } from './button/Button'

type SearchProps = {
  handleSearch: () => void
  searchValue: string
  handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Search = ({ handleSearch, searchValue, handleValueChange }: SearchProps) => {
  return (
    <SearchWrapper>
      <input
        type="text"
        className="search-input"
        value={searchValue}
        onChange={(e) => handleValueChange(e)}
        placeholder="Search ID or Name"
      />
      <SecondaryButton width={80} height={30} className="search-button" onClick={handleSearch}>
        Search
      </SecondaryButton>
    </SearchWrapper>
  )
}

export default Search

export const SearchWrapper = styled.div`
  width: 300px;
  display: flex;
  gap: 1rem;
  .search-input {
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 30px;
    background-color: rgba(149, 149, 149, 0.4);
    color: rgba(255, 255, 255, 0.8);
    font-size: 15px;
    padding: 7px;
  }
  .search-button {
    background-color: rgba(124, 124, 124, 0.4);
    color: #e2e2e2;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`
