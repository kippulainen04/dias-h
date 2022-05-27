import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: []
})


export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setcategoriesMap] = useState({});

    // using async func on useEffect
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setcategoriesMap(categoryMap)
        }
        getCategoriesMap(); 
    }, []);

    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}