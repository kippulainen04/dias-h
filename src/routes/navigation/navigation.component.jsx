import { Grid, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { ReactComponent as Hermes } from "../../assets/talaria.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import './navigation.styles.jsx'
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles.jsx";
import { motion } from "framer-motion";
import { AlternateEmail, Copyright, Instagram, Twitter } from "@mui/icons-material";

const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '5px',
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '8px',
      },
}));

const StyledIcon = styled(Copyright)(({ theme }) => ({
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
      },
}));

const StyledGroupIcons = styled(Grid)(({ theme }) => ({
    display: 'flex',
    height:'2.3vh',
    flexDirection: 'row',
    m: 0,
    p: 0,
    [theme.breakpoints.down('sm')]: {
        height:'1.8vh',
    },
}));

const StyledInstagram = styled(Instagram)(({ theme }) => ({
    fontSize: '20px',
    transition: 'all 2s ease-in-out',
    marginRight: '3px',
    ":hover": {
        cursor:'pointer',
        transform: 'translateY(-10px)',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
}));
const StyledTwitter = styled(Twitter)(({ theme }) => ({
    fontSize: '20px',
    transition: 'all 2s ease-in-out',
    marginRight: '3px',
    ":hover": {
        cursor:'pointer',
        transform: 'translateY(-10px)',
    },
    
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
}));
const StyledEmail= styled(AlternateEmail)(({ theme }) => ({
    fontSize: '20px',
    transition: 'all 2s ease-in-out',
    ":hover": {
        cursor:'pointer',
        transform: 'translateY(-10px)',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      },
}));

const Talaria = styled(Hermes)(({ theme }) => ({
    width: '75px',
    height: '75px',
    fontWeight: '500',
    [theme.breakpoints.down('md')]: {
        width: '60px',
        height: '60px'
      },
    [theme.breakpoints.down('sm')]: {
        width: '50px',
        height: '50px',
        paddingBottom: '5px'
      },
}))

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());
    return (
        <motion.div 
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        {/*  initial={{width: 0}} animate={{width: '100%'}} exit={{x: window.innerWidth, transition: '0.1s ease-in'}}> */}
            <NavigationContainer >
                <LogoContainer to="/" sx={{display: 'flex', justifyContent: 'center'}}>
                    <Talaria alt="logo" />
                </LogoContainer>
                
                <StyledGrid container>
                    <StyledGroupIcons item >
                        <StyledInstagram color="primary" onClick={() => navigate("/shop")}/>
                        <StyledTwitter color="primary" onClick={() =>navigate("/shop")}/>
                        <StyledEmail color="primary" onClick={() =>navigate("/shop")} />
                    </StyledGroupIcons>
                    <Grid item sx={{display: 'flex', flexDirection: 'row'}}>
                                <StyledIcon />
                                <StyledTypo variant="body2">Dais-h 2022</StyledTypo>
                    </Grid>
                    <Grid item >
                        <StyledTypo variant="body2">Created by Nio Phan</StyledTypo>
                    </Grid>
                </StyledGrid>    
                <NavLinksContainer style={{ fontWeight: 500 }}>
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {currentUser 
                    ? (<NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>)
                    : (<NavLink to="/auth">
                        MEMBER
                       </NavLink>)
                    }
                    <CartIcon />  
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </motion.div>
    );
};

export default Navigation;