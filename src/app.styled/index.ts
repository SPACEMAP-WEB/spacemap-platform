import { createGlobalStyle } from 'styled-components'
import { resetCSS } from './reset'

export const GlobalStyle = createGlobalStyle`
  
  //*, *::before, *::after { transition: none!important; }
  
  ${resetCSS}

  * { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }

  .count {
    background: rgb(255, 0, 0);
    color: rgb(255, 255, 255);
    border-radius: 100px;
    padding: 1px 6px;
    text-align: center;
  }
  
  // recharts css 커스텀
  .recharts-cartesian-axis-tick-value {  
    tspan {    
      font-size: 14px;
    }
  }
  
  .recharts-legend-item {
    font-size: 14px;
    margin-top: 13px;
  }
  
  .recharts-default-tooltip{
    border: none !important;
    box-shadow: 0 0 15px 0 rgb(164 172 187 / 50%);
    border-radius: 5px !important;
    overflow: hidden;
    background: rgb(34,41,67) !important;
    padding: 0px !important;   
    
    .recharts-tooltip-label{     
      display: block;
      font-size: 13px;
      color: #aeaeae !important;
      background: rgb(50,57,84) !important;
      margin: 0px !important;
      padding: 7px !important;     
    }
    
    .recharts-tooltip-item-list{
      padding: 10px !important;
      font-size: 14px;
    }
  } 
  
  .recharts-legend-item { 
    font-size: 12px;   
  }
`
