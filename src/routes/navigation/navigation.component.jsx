import { useContext } from "react";
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import './navigation.styles.jsx'
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from "./navigation.styles.jsx";


const Navigation = () => {
    const {currentUser } = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)
    return (
        <>
            <NavigationContainer >
                <LogoContainer to="/">
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer >
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {currentUser 
                    ? (<NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>)
                    : (<NavLink to="/auth">
                        SIGN IN
                       </NavLink>)
                    }
                    <CartIcon />  
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;