import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { fetchCategoriesStart } from "../../store/categories/category.action";


const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchCategoriesStart());
    }, [dispatch]);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" element={<Category />}/>
        </Routes>
 
        // <div className="shop-container">
        //     {
        //         Object.keys(categoriesMap).map((title) => {
        //             const products = categoriesMap[title];
        //             return <CategoryPreview key={title} title={title} products={products} />
                    // <div key={title}>
                    //     <h2>{title}</h2>
                    //     <div className="products-container">
                    //         {categoriesMap[title].map((product) => (
                    //             <ProductCard products={product} key={product.id}/>
                    //         ))}
                    //     </div> 
                    // </div>
        //         })
        //     }
        // </div>
        
    )
}

export default Shop;