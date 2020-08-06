import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  font-size: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
export const NoMatch = () => {
  return <Box>
    404, Page not found
  </Box>
}
