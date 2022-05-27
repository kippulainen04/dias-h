import { useContext } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesContext } from "../../context/categories.context";


const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    return (
        <>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                    // <div key={title}>
                    //     <h2>{title}</h2>
                    //     <div className="products-container">
                    //         {categoriesMap[title].map((product) => (
                    //             <ProductCard products={product} key={product.id}/>
                    //         ))}
                    //     </div> 
                    // </div>
                })
            }
        </>
        
    )
}

export default CategoriesPreview;