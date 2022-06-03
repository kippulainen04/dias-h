import { Button, Grid, Link, Paper, styled, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as OnTheWay } from "../../assets/delivery.svg";
import { FireWork } from "./firework-confetti";

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: teal[50],
    width: '60%',
    padding: '20px',
    marginTop: '10px',
    [theme.breakpoints.down('md')]: {
        marginTop: '30px',
        width: '70%',
      },
}));

const Delivery = styled(OnTheWay)({
    width: '200px',
    height: '200px',
})

const GridContainer = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

const StyledTypograpgy = styled(Typography)`
font-weight: 800;
background: linear-gradient(
    to right,
    #ff9966,
    #ff5e62
  );
  display: inline-block;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 800px)
{
    font-size: 28px;
}
`


const Success = () => {
    const navigate = useNavigate();

    const goToShop = () => {
        navigate("/shop")
    }    

    useEffect(() => {
        FireWork();
    }, [])

    return (
        <Grid sx={{ display: 'flex', width: '100%', height: '70vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <StyledPaper elevation={6}>
                <GridContainer sx={{mb: 5}}>
                    <Delivery />
                    <StyledTypograpgy variant="h4">Thank Your For Your Order!</StyledTypograpgy>
                    <Typography variant="subtitle1" sx={{mb: 3}}>Check your email inbox for the receipt.</Typography>
                    <Typography variant="subtitle1">If you have any questions, please email</Typography>
                    <Link href="mailto:order@dais-h.com" underline="none" sx={{mb: 3}}>
                        <Typography variant="subtitle1">order@dais-h.com</Typography>
                    </Link>
                    <Button variant="outlined" onClick={goToShop}>Back to Shopping Page</Button>
                </GridContainer>
            </StyledPaper>
        </Grid>
    )
}

export default Success;