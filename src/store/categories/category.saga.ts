import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess } from "./category.action";
import { CATEGORY_ACTION_TYPES } from "./category.types";


export function* fetchCategoriesAsync() {
    // call: generator effect, if you want to turn a funct into an effect by passing it a var (method, parameter)
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    //takeLatest: take is where we receive actions, if u get a bunch of actions, give me the latest one
    yield* takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

    // whenever we takeLatest, fetch category action, then initializing the fetchCategoriesAsync from saga
    // this saga will try to fetech our categories array from Firebase, if that is succesful, we are gonna put as dispatch
    // 
export function* categoriesSaga() {
    // all: run everything inside and complete when it is done
    yield* all([call(onFetchCategories)])
}