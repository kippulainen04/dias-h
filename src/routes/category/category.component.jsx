import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Typography from '@mui/material/Typography';
import styled from "styled-components"
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const StyledDivContainer = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
column-gap: 20px;
row-gap: 50px;
`

const Category = () => {
   const {category} = useParams();
   const categoriesMap = useSelector(selectCategoriesMap);
   const [products, setProducts] = useState(categoriesMap[category])

   useEffect(() => {
    setProducts(categoriesMap[category])
   }, [category, categoriesMap])
   return (
       // if we have components relying on asynchronoiusl fetched code, put a safeguard to check undefined data
       <>
            <Typography variant="h4" gutterBottom>{category.toUpperCase()}</Typography>
            <StyledDivContainer>
                {products?.map((product) => <ProductCard key={product.id} product={product}/>)}
            </StyledDivContainer>
       </>
   )
}

export default Category;