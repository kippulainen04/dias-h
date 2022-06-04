import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import { styled, Typography } from '@mui/material';

const CategoryPreviewContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    }  
}));

const Preview = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '30px',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '20px',
    },
}));

const CategoryPreview = ({title, products}) => {
    return (
        <CategoryPreviewContainer>
            <Typography variant="h5"gutterBottom sx={{ cursor: 'pointer'}}>
                <Link to={title} className="title">{title.toUpperCase()}</Link>
            </Typography>
            <Preview>
                {products
                .filter((_, idx) => idx < 3)
                .map((product) => <ProductCard key={product.id} product={product}/> )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;