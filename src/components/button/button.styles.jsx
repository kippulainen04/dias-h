import { Button, styled } from "@mui/material"

export const BaseButton = styled(Button)({
  cursor: 'pointer',
  display: 'flex',
  justifYContent: 'center',
  alignItems: 'center',
})

export const GoogleSignInButton = styled(BaseButton)({
  backgroundColor: '#4285f4',
  color: 'white',

  '&:hover': {
    backgroundColor: '#357ae8',
    border: 'none',
  }
})

export const InvertedButton = styled(BaseButton)({
backgroundColor: 'white',
color: 'black',
border: '1px solid black',

'&:hover': {
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
}
})
