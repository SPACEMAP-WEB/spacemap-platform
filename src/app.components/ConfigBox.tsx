import React from 'react'
import styled from 'styled-components'
import ConfigBoxItem from './ConfigBoxItem'

type ItemValueType = {
  label: string
  value: string
}

export type ConfigBoxProps = {
  title: string
  name: string
  itemValue: ItemValueType[]
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void> | void
}

const ConfigBox = ({ sortList }: { sortList: ConfigBoxProps[] }) => {
  return (
    <ConfigBoxWrapper>
      {sortList.map(({ title, name, itemValue, handleChange }, index) => (
        <ConfigBoxItem
          key={index}
          title={title}
          name={name}
          itemValue={itemValue}
          handleChange={handleChange}
        />
      ))}
    </ConfigBoxWrapper>
  )
}

export default ConfigBox

const ConfigBoxWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0.5rem 1rem;
  background-color: rgba(138, 138, 138, 0.6);
  margin-bottom: 0.625rem;
  border-radius: 0.4rem;
`
