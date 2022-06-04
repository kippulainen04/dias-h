import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { Button, Grid, styled, Typography } from "@mui/material";
import { ReactComponent as Unloading } from "../../assets/unloading.svg";
import { ReactComponent as ICanFly } from "../../assets/icanfly.svg";
import { useState } from "react";

const Container = styled('div', {
    shouldForwardProp: (hello) => hello!== "open"
  })
  (({ theme, open }) => ({
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    height: '90vh',
    minHeight: '80vh',
    overflow: 'hidden',

    "&:before": {
        content: '""',
        position: 'absolute',
        height: '2000px',
        width: '2000px',
        top: '-10%',
        right: open ? '52%' : '48%',
        transform: open ? 'translate(100%, -50%)' : 'translateY(-50%)',
        backgroundImage: 'linear-gradient(-45deg, #ff9966 0%, #ff5e62 100%)',
        borderRadius: '50%',
        zIndex: '6',
        transition: '1.8s ease-in-out',
    },

    "form": {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '0rem 5rem',
        overflow: 'hidden',
        gridColumn: '1 / 2',
        gridRow: '1 / 2',
        transition: '0.2 0.7 ease-in-out',
    },

    ".signin-signup": {
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        left: open ? '25%' : '75%',
        width: '50%',
        transition: '1s 0.7s ease-in-out 1s',
        display: 'grid',
        gridTemplateColumns: '1fr',
        zIndex: '5',
    },

    ".sign-up-form": {
        opacity: open ? '1' : '0',
        zIndex: open ?  '2' : '1',
    },

    ".sign-in-form": {
        zIndex: open ? '1' : '2',
        opacity: open ? '0' : 'unset',
    },

    ".panels-container": {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: '0',
        left: '0',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },

    ".panel": {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        textAlign: 'center',
        zIndex: '6',
    },

    ".image-sign-up, .content-sign-up": {
        transform: open ? 'translateX(-800px)' : 'unset',
    },   

    ".image-sign-in, .content-sign-in ": {
        transform: open ? 'translateX(0px)' : 'translateX(800px)' ,
    },


    ".left-panel": {
        pointerEvents: open ? 'none' : 'all',
        padding: '2rem 17% 2rem 12%',
    },

    ".right-panel": {
        pointerEvents: open ? 'all' : 'none',
        padding: '2rem 12% 2rem 17%',
    },

    ".panel, .content": {
        color: '#fff',
        transition: '0.9s 0.6s ease-in-out',
        transitionDelay: '0.6s',
    },

    ".image": {
        width: '100%', 
        transition: '1.1s 0.4s ease-in-out',
    },

    ".transparent": {
        margin: '0',
        background: 'none',
        border: '2px solid #fff',
        width: '130px',
        height: '41px',
        fontWeight: '600',
        fontSize: '0.8rem',
    },

    [theme.breakpoints.down('md')]: {
        minHeight: '800px',
        height: '90vh',    

        "&:before": {
            width: '1500px',
            height: '1500px',
            left: '30%',
            bottom: open ? '32%' : '68%',
            transform: open ? 'translate(-50%, 100%)' : 'translateX(-50%)',
            right: 'initial',
            top: 'initial',
            transition: '2s ease-in-out',
        },

        ".signin-signup": {
            width: '100%',
            left: '50%',
            top: open ? '5%' : '95%',
            transition: '1s 0.8s ease-in-out',
            transitionDelay: '1s',
            transform: open ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
        },

        ".panels-container":{
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 2fr 1fr',
        },

        ".panel": {
            flexDirection: 'row',
            alignItems: 'center',
            padding: '1rem 6%'
        },

        ".panel, .content": {
            paddingRight: '15%',
            transition: '0.9s 0.8s ease-in-out',
        },

        ".transparent": {
            width: '110px',
            height: '35px',
            fontSize: '0.7rem',
        },
    
        ".image": {
            width: '250px',
            transition: '0.9s 0.6s ease-in-out',
            height: '200px'
        },

        ".left-panel": {
            gridRow: '1 / 2',
        },

        ".right-panel": {
            gridRow: '3 / 4',
        },

        ".image-sign-up, .content-sign-up": {
            transform: open ? 'translateY(-300px)' : 'unset',
        },   

        ".image-sign-in, .content-sign-in ": {
            transform: open ? 'translateY(0px)' : 'translateY(300px)',
        },
    },

    [theme.breakpoints.down('sm')]: {
        height: '80vh', 

        "form": {
            padding: '0 1.5rem',
        },

        ".image": {
            display: 'none',
        },

        ".panel, .content": {
            padding: '0.5rem 1rem',
        },

        "&:before": {
            left: '50%',
            bottom: open ? '28%' : '72%',
        },
    }    

}));

const AuthenticationContainer = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
})


const Authentication = () => {
    const [open, setOpen] = useState(false)

    return (
        <Container class="container" open={open}>
                <AuthenticationContainer>
                    <Grid className="signin-signup">
                        <SignInForm />
                        <SignUpForm />
                    </Grid>
                </AuthenticationContainer>
                <Grid class="panels-container">
                    <Grid class="panel left-panel">
                        <Grid class="content content-sign-up" open={open}>
                            <Typography variant="h5" style={{ fontWeight: 700 }}>New here ?</Typography>
                            <Typography variant="body1">
                            Sign up a new account
                            </Typography>
                            <Button variant="contained" onClick={() => setOpen(true)} open={open} class="btn transparent">
                            Sign up
                            </Button>
                        </Grid>
                        <Unloading class="image image-sign-up" alt="" />
                    </Grid>
                    <Grid class="panel right-panel">
                        <Grid class="content content-sign-in" open={open} >
                            <Typography variant="h5" style={{ fontWeight: 700 }}>One of us ?</Typography>
                            <Typography variant="body1">
                            Sign in with your email or Google account
                            </Typography>
                            <Button variant="contained" onClick={() => setOpen(false)} open={open} class="btn transparent">
                            Sign in
                            </Button>
                        </Grid>
                        <ICanFly  class="image image-sign-in" alt="" />
                    </Grid>
              </Grid>
        </Container>      
    )           
}

export default Authentication;