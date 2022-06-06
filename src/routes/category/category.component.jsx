import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";
import { Grid, styled } from "@mui/material";

const StyledDivContainer = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '20px',
    rowGap: '30px',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '15px',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 3fr)',
        gridGap: '5px',
    },
}));

const Category = () => {
   const {category} = useParams();
   const categoriesMap = useSelector(selectCategoriesMap);
   const isLoading = useSelector(selectCategoriesIsLoading);
   const [products, setProducts] = useState(categoriesMap[category])

   useEffect(() => {
    setProducts(categoriesMap[category])
   }, [category, categoriesMap])
   return (
       // if we have components relying on asynchronoiusl fetched code, put a safeguard to check undefined data
       <>
            <Typography variant="h4" gutterBottom>{category.toUpperCase()}</Typography>
            {isLoading 
            ? ( <Spinner /> ) 
            : ( <Grid sx={{display: 'flex',
            flexDirection: 'column',
            marginBottom: '30px',
            alignItems: 'center',
              }}>
                    <StyledDivContainer>
                        {products?.map((product) => 
                        <ProductCard key={product.id} product={product}/>)}
                    </StyledDivContainer>
                </Grid> )
            }
       </>
   )
}

export default Category;