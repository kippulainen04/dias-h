import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"

export const BackgroundImage = styled.div`
width: 100%;
height: 100%;
background-size: cover;
background-position: center;
background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`

export const Body = styled.div`
width: 120px;
height: 100px;
padding: 0 10px;
opacity: 0.7;
position: absolute;
color: #4a4a4a;
font-weight: 900;
text-transform: uppercase;
margin: 0 6px 0;
display: none;
text-shadow: '2px 2px 4px'
`

export const DirectoryItemContainer = styled.div` 
min-width: 32%;
height: 450px;
flex: 1 1 auto;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
border: 1px solid black;
overflow: hidden;

&:hover {
  cursor: pointer;

  & ${BackgroundImage} {
    transform: scale(1.1);
    transition: transform 2s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }

  & ${Body} {
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 800px)
{
    height: 400px;
    min-width: 60%;
}
`


const DirectoryItem = ({category}) => {
    const {imageUrl , route, title} = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    return (
      <>
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImage
            imageUrl={imageUrl} 
          />
          <Body>
            <Typography variant="h5">{title}</Typography>
          </Body>
        </DirectoryItemContainer>
      </>
    )

}

export default DirectoryItem