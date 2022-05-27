
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
    return (

        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":title" element={<Category />}/>
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