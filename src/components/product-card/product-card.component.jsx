import { styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action"
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.scss";

const ProductCardContainer = styled(Button)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '350px',
    alignItems: 'center',
    position: 'relative',

    "img": {
      width: '100%',
      height: '95%',
      objectFit: 'cover',
      marginBottom: '5px',
    },

    "&:hover": {
        "img": {
            opacity: '0.8',
        },
            
        "button": {
            opacity: '0.85',
            display: 'flex',
        },
    },

    [theme.breakpoints.down("md")]: {
        width: '40vw',
        "&:hover": {
            "img": {
                opacity: 'unset',
            },
            
            "button": {
                opacity: 'unset',
            },
        },
    }  
}));   

const ProductCardButton = styled(Button)(({ theme }) => ({
    width: '80%',
    opacity: '0.7',
    position: 'absolute',
    top: '255px',
    display: 'none',
    // "&:hover": {
    //     opacity: '0.85',
    //     display: 'flex',
    //   },

      [theme.breakpoints.down("md")]: {
        display: 'block',
        opacity: '0.5',
        minWidth: 'unset',
        padding: '0 10px',
        // "&:hover": {
        //     opacity: 'unset',
        // }
      }  
}));    

const Footer = styled('footer')(({ theme }) => ({
    width: '100%',
    height: '5%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    [theme.breakpoints.down("md")]: {
        fontSize: '16px',
      }
}));

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems)
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    
   return (
    <ProductCardContainer className="product-card-container">
        <img src={imageUrl} alt={`${name}`}/>
        <Footer>
            <Typography variant="body1" gutterBottom>{name}</Typography>
            <Typography variant="body1">€{price}</Typography>
        </Footer>
        <ProductCardButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</ProductCardButton>
    </ProductCardContainer>
   )
}

export default ProductCard;