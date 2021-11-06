import { combineReducers } from "redux";
import {
    ingredients,
    viewedIngredient,
    orderDetails
} from ".";

export const rootReducer = combineReducers({
    ingredients: ingredients,
    viewedIngredient: viewedIngredient,
    orderDetails: orderDetails
});