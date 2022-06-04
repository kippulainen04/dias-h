import { Link } from "react-router-dom"
import styled from "styled-components"

export const NavigationContainer = styled.div`
height: 70px;
width: 100%;
display: flex;
justify-content: space-between;
margin-bottom: 15px;

@media screen and (max-width: 800px)
{
    height: 60px;
    padding: 10px;
    margin-bottom: 10px;
}
`

export const LogoContainer = styled(Link)`
height: 100%;
width: 75px;
padding: 0 auto;
@media screen and (max-width: 800px)
{
    width: 50px;
    padding: 0;
}
`

export const NavLinksContainer = styled.div`
width: 50%;
height: 100%;
display: flex;
align-items: center;
justify-content: flex-end;

@media screen and (max-width: 800px)
{
    width: 80%;
};

@media screen and (max-width: 500px)
{
    font-size: 15px
}
`

export const NavLink = styled(Link)`
padding: 10px 15px;
cursor: pointer;
`
