import { Button, styled } from "@mui/material"

export const BaseButton = styled(Button)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const GoogleSignInButton = styled(BaseButton)`
background-color: #4285f4;
color: white;

&:hover {
  background-color: #357ae8;
  border: none;
}
`

export const InvertedButton = styled(BaseButton)`
background-color: white;
color: black;
border: 1px solid black;

&:hover {
  background-color: black;
  color: white;
  border: none;
}
`
