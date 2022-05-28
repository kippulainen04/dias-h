import { CATEGORY_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch(type) {
        // so when we first fetch, we dont know it is successed or failed
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {...state, isLoading: true};
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: payload, isLoading: false};
        case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {...state, error: payload, isLoading: false};
        default: 
        return state;
    }
};