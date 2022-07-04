import React from 'react'
import styled from 'styled-components'

const ConjunctionsTabs = ({ toggle, onClick, login }) => {
  const tabs = login ? ['All-on-All', 'Favorites-on-All'] : ['All-on-All']

  return (
    <StyledTabs>
      {tabs.map((tab, index) => {
        return (
          <div
            key={index}
            className={`conjunctions-tab-menu ${index} ${toggle === index ? 'active' : ''}`}
            onClick={() => onClick(index)}
          >
            {tab}
          </div>
        )
      })}
    </StyledTabs>
  )
}

export default ConjunctionsTabs

const StyledTabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
  .conjunctions-tab-menu {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    padding: 0 10px;
  }
  .active {
    color: #fccb16;
  }
`
