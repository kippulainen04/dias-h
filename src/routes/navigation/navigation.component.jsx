import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as Hermes } from "../../assets/talaria.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import './navigation.styles.jsx'
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from "./navigation.styles.jsx";
import { motion } from "framer-motion";


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
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutUser = () => dispatch(signOutStart());
    return (
        <motion.div 
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
        {/*  initial={{width: 0}} animate={{width: '100%'}} exit={{x: window.innerWidth, transition: '0.1s ease-in'}}> */}
            <NavigationContainer >
                <LogoContainer to="/" sx={{display: 'flex', justifyContent: 'center'}}>
                    <Talaria />
                </LogoContainer>
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