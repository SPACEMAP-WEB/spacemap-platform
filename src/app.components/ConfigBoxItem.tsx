import React from 'react'
import styled from 'styled-components'

type ItemValueType = {
  label: string
  value: string
}

type ConfigBoxItemProps = {
  title: string
  name: string
  itemValue: ItemValueType[]
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void> | void
}

const ConfigBoxItem = ({ title, name, itemValue, handleChange }: ConfigBoxItemProps) => {
  return (
    <ConfigBoxItemWrapper>
      <div className="sort-title-wrapper">{title}</div>
      <div className="sort-button-wrapper">
        {itemValue.map(({ value, label }, index) => (
          <div className="sort-item" key={index}>
            <input
              type="radio"
              id={label}
              name={name}
              value={value}
              defaultChecked={index === 0}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor={label}>{label}</label>
          </div>
        ))}
      </div>
    </ConfigBoxItemWrapper>
  )
}

export default ConfigBoxItem

const ConfigBoxItemWrapper = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  color: #dbdbdb;
  font-size: 14px;
  .sort-title-wrapper {
    width: 120px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .sort-button-wrapper {
    display: flex;
    justify-content: space-between;
    .sort-item {
      margin-right: 12px;
      color: #dbdbdb;
      input {
        margin-right: 5px;
      }
    }
  }
`
