import React from "react";
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';

import { INGREDIENT } from "../../utils/types";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientStyles from './ingredient.module.css';


const Ingredient = (props) => {
    const constructorIngredients = useSelector(store => store.ingredients.ingredientsConstructor);
    const ingredientAmount = constructorIngredients.filter(item => item._id === props._id).length;
    const [{ opacity }, dragRef] = useDrag({
        type: INGREDIENT,
        item: { ...props },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    });

    return (
        <div id={props._id} ref={dragRef} className={IngredientStyles.card} style={{ opacity }} onClick={props.onClick}>
            {ingredientAmount > 0 && <Counter count={props.type === 'bun' ? 2 : ingredientAmount} size="default" />}
            <img src={props.image} alt={props.name} className={IngredientStyles.card__img} />
            <div className={IngredientStyles.card__price}>
                <p className="text_type_digits-default mr-1">{props.price}</p>
                <CurrencyIcon />
            </div>
            <p className="text_type_main-default">{props.name}</p>
        </div>
    )
}

Ingredient.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
};

export default Ingredient;