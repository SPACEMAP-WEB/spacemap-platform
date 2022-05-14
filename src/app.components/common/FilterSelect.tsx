import { FilterSelectType } from '@app.modules/types'
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

const FilterSelectWrapper = styled.div``
