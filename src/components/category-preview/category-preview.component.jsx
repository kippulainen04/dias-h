import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import { styled, Typography } from '@mui/material';
import { useEffect, useState } from "react";

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
        gridGap: '15px',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 3fr)',
        gridGap: '5px',
    },
}));


const CategoryPreview = ({title, products}) => {
    const [iWidth, setiWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleReside = () => {
            setiWidth(window.innerWidth);
            window.addEventListener('resize', handleReside);
            return () => window.removeEventListener('resize', handleReside)
        }
        handleReside();
    }, [iWidth])

    return (
        <CategoryPreviewContainer>
            <Typography variant="h5"gutterBottom sx={{ cursor: 'pointer'}}>
                <Link to={title} className="title">{title.toUpperCase()}</Link>
            </Typography>
            <Preview>
                {products
                .filter((_, idx) => 
                iWidth > 900 ? idx < 3 
                : iWidth < 900 ? idx < 2 
                : idx === 1 )
                .map((product) => <ProductCard key={product.id} product={product}/> )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;