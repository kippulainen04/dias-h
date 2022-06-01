import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Typography from '@mui/material/Typography';
import styled from "styled-components"
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";

const StyledDivContainer = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
column-gap: 20px;
row-gap: 50px;
@media screen and (max-width: 800px)
{
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
} 
`

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    // {category} is no optional be a string, no more undefined
   const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
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
            : ( <StyledDivContainer>
                {products?.map((product) => <ProductCard key={product.id} product={product}/>)}
            </StyledDivContainer> )
            }
       </>
   )
}

export default Category;