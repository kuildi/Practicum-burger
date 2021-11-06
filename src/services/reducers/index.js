import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_VIEWD_INGREDIENT,
    REMOVE_VIEWD_INGREDIENT,
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    REPLACE_CONSTRUCTOR_BUN,
    DRAG_SORT,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED
} from "../actions/constants";

const initialState = {
    items: [],
    ingredientsConstructor: [],
    ingredientsFailed: false,
    ingredientsRequest: false
}
const viewedIngredientInitialState = {
    viewedIngredient: {}
}
const orderDetailsInitialState = {
    orderDetails: {},
    orderFailed: false,
    orderRequest: false
}

export const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.items,
                ingredientsRequest: false,
                ingredientsFailed: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        case ADD_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                ingredientsConstructor: [
                    ...state.ingredientsConstructor,
                    ...state.items
                        .filter(item => item._id === action.item.id)
                        .map(item => ({ ...item, itemKey: action.item.itemKey }))
                ]
            };
        }
        case REPLACE_CONSTRUCTOR_BUN: {
            return {
                ...state,
                ingredientsConstructor: [
                    ...state.ingredientsConstructor
                        .map(item => item.type === 'bun' && item.itemKey !== action.item.itemKey ? { ...action.item } : { ...item })
                ]
            };
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                ingredientsConstructor: [...state.ingredientsConstructor].filter(item => item.itemKey !== action.itemKey)
            };
        }
        case DRAG_SORT: {
            const newConstructorArr = [...state.ingredientsConstructor];
            const indexTo = newConstructorArr.indexOf(newConstructorArr.find(item => item.itemKey === action.hoverIndex));
            const indexFrom = newConstructorArr.indexOf(newConstructorArr.find(item => item.itemKey === action.dragIndex));
            const dragItem = newConstructorArr[indexFrom];

            newConstructorArr.splice(indexFrom, 1);
            newConstructorArr.splice(indexTo, 0, dragItem);
            
            return {
                ...state, 
                ingredientsConstructor: newConstructorArr
            }
        }
        default: {
            return state;
        }
    }
}

export const viewedIngredient = (state = viewedIngredientInitialState, action) => {
    switch (action.type) {
        case ADD_VIEWD_INGREDIENT: {
            return {
                ...state,
                viewedIngredient: action.data
            };
        }
        case REMOVE_VIEWD_INGREDIENT: {
            return {
                ...state,
                viewedIngredient: {}
            };
        }
        default: {
            return state;
        }
    }
}

export const orderDetails = (state = orderDetailsInitialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderDetails: action.order,
                orderRequest: false,
                orderFailed: false
            };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        default: {
            return state;
        }
    }
}