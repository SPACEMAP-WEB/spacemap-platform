import { FilterSelectType } from '@app.modules/types'
import { PPDBSearchParamsType } from '@app.modules/types/conjunctions'
import React from 'react'
import styled from 'styled-components'

type FilterSelectProps = {
  filterOptions: FilterSelectType[]
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

const FilterSelect = ({ filterOptions, onChange }: FilterSelectProps) => {
  return (
    <FilterSelectWrapper>
      <select onChange={onChange}>
        {filterOptions.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          )
        })}
      </select>
    </FilterSelectWrapper>
  )
}

export default FilterSelect

const FilterSelectWrapper = styled.div`
  width: 4rem;
  height: 1.875rem;
  padding: 0 5px;
  select {
    background-color: rgba(149, 149, 149, 0.4);
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px;
    color: #e2e2e2;
    :active {
      border: none;
    }
  }
`
