import React, { useState } from 'react'
import styled from 'styled-components'

const ConjuctionsTabs = () => {
  const [toggle, setToggle] = useState(0)
  const tabs = ['ALL', 'Favorite']

  const handleClickTab = (index) => {
    setToggle(index)
  }

  console.log(toggle)

  return (
    <StyledTabs>
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={`conjuctions-tab-menu ${index} ${toggle === index ? 'active' : ''}`}
            onClick={() => handleClickTab(index)}
          >
            {tab}
          </div>
        )
      })}
    </StyledTabs>
  )
}

export default ConjuctionsTabs

const StyledTabs = styled.div`
  display: flex;
  .conjuctions-tab-menu {
    width: 110px;
    text-align: center;
    font-size: 20px;
    color: white;
    cursor: pointer;
    :first-child {
      width: 80px;
    }
  }
  .active {
    color: red;
  }
`
