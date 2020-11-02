import React from "react"

import { Box, Heading, Text } from "grommet"
import styled from "styled-components"

const ColoredHeading = styled(Heading)`
  color: #1d6cd2;
`

const Header = ({ siteTitle }) => (
  <header>
    <Box direction="row" pad="medium" align="end" justify="center" gap="xsmall">
      <Heading level={2}>Welcome to</Heading>
      <ColoredHeading>{siteTitle}</ColoredHeading>
    </Box>
  </header>
)

export default Header
