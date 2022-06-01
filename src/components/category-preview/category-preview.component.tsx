import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import { Typography } from '@mui/material';
import styled from "styled-components"
import { CategoryItem } from "../../store/categories/category.types";
import { FC } from "react";

const CategoryPreviewContainer = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 30px;
@media screen and (max-width: 800px)
{
  align-items: center;
}  
`

const Preview = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
column-gap: 20px;
@media screen and (max-width: 800px)
{
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
} 
`

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
  };

const CategoryPreview: FC<CategoryPreviewProps> = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <Typography variant="h5"gutterBottom sx={{ cursor: 'pointer'}}>
                <Link to={title} className="title">{title.toUpperCase()}</Link>
            </Typography>
            <Preview>
                {products
                .filter((_, idx) => idx < 4)
                .map((product) => <ProductCard key={product.id} product={product}/> )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;