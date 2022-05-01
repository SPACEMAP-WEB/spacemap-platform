import styled from 'styled-components'

export const Table = styled.table<{ css?: string }>`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  td,
  th {
    padding: 0.5rem;
    border-bottom: 1px solid grey;
    color: white;
    font-weight: 700;
  }
  th {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: violet;
    font-weight: 900;
  }
  ${({ css }) =>
    css ??
    `
    th:nth-of-type(1) { width: 80px; }
    th:nth-of-type(2) { width: 113px; }
    th:nth-of-type(3) { width: 107px; }
    th:nth-of-type(4) { width: 107px; }
    th:nth-of-type(5) { width: 107px; }
    th:nth-of-type(6) { width: 110px; }
    th:nth-of-type(7) { width: 108px; }
    th:nth-of-type(8) { width: 108px; }
    th:nth-of-type(9) { width: 95px; }
    th:nth-of-type(10) { width: 95px; }
    `}
`
