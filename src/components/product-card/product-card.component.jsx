import { styled, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action"
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ProductCardContainer = styled('div', {
    shouldForwardProp: ($hello) => $hello!== "open" && $hello!== "xAxis" && $hello!== "yAxis"
  })
  (({ theme, open, xAxis, yAxis }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px auto',
    height: '420px',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    perspective: '1000px',

    ".card": {
        width: '90%',
        minHeight: '33vh',
        boxShadow: '0 20px 20px #00000033, 0 0px 50px #00000033',
        borderRadius: '20px',
        padding: '10px 30px',
        transform: xAxis && yAxis && open ? `rotateY(${xAxis}deg) rotateX(${yAxis}deg)` : `rotateY(0deg) rotateX(0deg)`,
        transformStyle: 'preserve-3d',
        transition: open ? 'none' : 'all 0.5s ease',
    },


    "&:hover": {     
        "button": {
            opacity: '0.85',
            display: 'flex',
        },
    },

    [theme.breakpoints.down("md")]: {
        width: '40vw',
        "&:hover": {
            "button": {
                opacity: 'unset',
            },
        },
    },

    [theme.breakpoints.down('sm')]: {
        width: '320px',
    },
}));   

const StyledSneaker = styled('div', {
    shouldForwardProp: (hello) => hello!== "open"})
    (({ theme, open }) => ({
        minHeight: '20vh',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.75s ease-out',
        transform: open ? 'translateZ(150px)' : 'translateZ(0px)',

        ".circle": {
            width: '120px',
            height: '120px',
            background: 'linear-gradient(to right, #ff9966, #08539cbf)',
            position: 'absolute',
            borderRadius: '50%',
            zIndex: '1',
        },
    
        "img": {
          width: '100%',
          height: '90%',
          zIndex: '2',
        },
}));    


const ProductCardButton = styled(Button)(({ theme }) => ({
    width: '80%',
    opacity: '0.7',
    display: 'none',
    margin: '10px 20px',

      [theme.breakpoints.down("md")]: {
        display: 'block',
        opacity: '0.5',
        minWidth: 'unset',
        padding: '0 10px',
      }  
}));    

const Intro = styled('div', {
    shouldForwardProp: (hello) => hello!== "open"})
  (({ theme, open }) => ({
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    alignItems: 'center',
    fontSize: '18px',
    transform: open ? 'translateZ(120px)' : 'translateZ(0px)',
    transition: 'all 0.75s ease-out',
    [theme.breakpoints.down("md")]: {
        fontSize: '16px',
      }
}));

const Sizes = styled('div', {
    shouldForwardProp: (hello) => hello!== "open"})
  (({ theme, open }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '20px',
    transform: open ? 'translateZ(80px)' : 'translateZ(0px)',
    transition: 'all 0.75s ease-out',

    "button": {
        padding: '5px 15px',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 5px 10px #00000033',
        borderRadius: '20px',
        fontWeight: 'bold',
        color: '#585858',
        background: 'linear-gradient(to right, #ff9966, #ff5e62)',
        webkitBackgroundClip: 'text',
        backgroundClip: 'text',
        webkitTextFillColor: 'transparent',
    },

    ".active": {
        background: '#585858',
        color: 'white'
    }
}));

const ProductCard = ({product}) => {
    const [open, setOpen] = useState(false)
    const [xAxis, setMouseX] = useState('')
    const [yAxis, setMouseY] = useState('')
    const {name, price, imageUrl} = product
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems)
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    const handleMouseMove = (e) => {
        e.preventDefault();
        console.log(e.pageX, e.pageY);
        let xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        let yAxis = (window.innerHeight / 2 - e.pageY) / 150;
        setMouseX(xAxis);
        setMouseY(yAxis);
    };

    const handleMouseEnter = (e) => {
        e.preventDefault();
        setOpen(true);
    };
    const handleMouseLeave = () => {
        setOpen(false);
    };


   return (
    <ProductCardContainer item open={open} xAxis={xAxis} yAxis={yAxis} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="product-card-container">
        <div open={open} className="card">
            <StyledSneaker open={open} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="circle"></div>
                <img src={imageUrl} alt={`${name}`}/>
            </StyledSneaker>
            <Intro open={open} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="subtitle2">€{price}</Typography>
            </Intro>
            <Sizes open={open} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button className="active">40</button>
                    <button>42</button>
                    <button>44</button>
                    <button>46</button>
            </Sizes>
            <ProductCardButton buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</ProductCardButton>
        </div>
    </ProductCardContainer>
   )
}

export default ProductCard;