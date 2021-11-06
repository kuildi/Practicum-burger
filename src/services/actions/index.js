import {
    API_URL,
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    GET_ORDER_NUMBER,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED
} from "./constants";

export function getIngredients() {
    return async function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        try {
            const response = await fetch(`${API_URL}/ingredients`);

            if (!response.ok) {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
                throw new Error('Ответ сети был не ok.');
            }
            
            const result = await response.json();
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                items: result.data
            })
        } catch (err) {
            console.log('Возникла проблема с запросом: ', err.message);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        }
    }
}

export function getOrder(data) {
    return async function (dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER
        })
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({ 'ingredients': data })
            });

            if (!response.ok) {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED
                })
                throw new Error('Ответ сети был не ok.');
            }

            const result = await response.json();
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                order: result
            })
        } catch (err) {
            console.log('Возникла проблема с запросом: ', err.message);
            dispatch({
                type: GET_ORDER_NUMBER_FAILED
            })
        }
    }
}