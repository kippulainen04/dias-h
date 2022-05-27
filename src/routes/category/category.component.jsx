import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import Typography from '@mui/material/Typography';
import styled from "styled-components"

const StyledDivContainer = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
column-gap: 20px;
row-gap: 50px;
`

const Category = () => {
   const {title} = useParams();
   const {categoriesMap} = useContext(CategoriesContext)
   const [products, setProducts] = useState(categoriesMap[title])

   useEffect(() => {
    setProducts(categoriesMap[title])
   }, [title, categoriesMap])
   return (
       // if we have components relying on asynchronoiusl fetched code, put a safeguard to check undefined data
       <>
            <Typography variant="h4" gutterBottom>{title.toUpperCase()}</Typography>
            <StyledDivContainer>
                {products?.map((product) => <ProductCard key={product.id} product={product}/>)}
            </StyledDivContainer>
       </>
   )
}

export default Category;