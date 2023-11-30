import styled from 'styled-components'

const Container = styled.div`
  background: url(${props => props.mobileBgm});
  @media (min-width: 576px) {
    background: url(${props => props.laptopBgm});
  }
  background-size: cover;
  width: 100%;
  padding-bottom: 50px;
  box-shadow: inset 0 -15px 10px -11px #181818;
`

export default Container
