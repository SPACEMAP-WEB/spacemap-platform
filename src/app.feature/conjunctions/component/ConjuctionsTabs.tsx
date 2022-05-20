import React from 'react'
import styled from 'styled-components'

const ConjuctionsTabs = ({ toggle, onClick, login }) => {
  const tabs = login ? ['All-on-All', 'Favorites-on-All'] : ['ALL']

  return (
    <StyledTabs>
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={`conjuctions-tab-menu ${index} ${toggle === index ? 'active' : ''}`}
            onClick={() => onClick(index)}
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
  justify-content: center;
  margin: 20px 0px;
  .conjuctions-tab-menu {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    padding: 0 10px;
  }
  .active {
    color: #fccb16;
  }
`
