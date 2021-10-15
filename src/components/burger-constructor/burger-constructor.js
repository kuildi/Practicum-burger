import React, { useState, useEffect } from 'react';

import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const totalCost = props.ingredients.reduce((sum, current) => sum + current.price, 0);
    const ingredientsLastIndex = props.ingredients.length - 1;
    const constructorItems = props.ingredients.map((item, i) => {
        return (
            <div key={item._id} className={`${BurgerConstructorStyles.constructor__item} 
            ${i === 0 || i === ingredientsLastIndex ? "ml-8" : ''}`} >
                {i === 0 || i === ingredientsLastIndex ? '' : <DragIcon />}
                <ConstructorElement
                    type={i === 0 ? "top" : '' || i === ingredientsLastIndex ? "bottom" : ''}
                    isLocked={i === 0 || i === ingredientsLastIndex ? true : false}
                    text={`${item.name} ${i === 0 ? "(верх)" : '' || i === ingredientsLastIndex ? "(низ)" : ''}`}
                    price={item.price}
                    thumbnail={item.image}
                />
            </div>
        );
    });

    const showModal = () => {
        setModalVisible(true)
    }

    const closeModal = (e) => {
        let target = e.nativeEvent.target;
        
        if (target.getAttribute('backdrop')) {
            setModalVisible(false);
        } else if (target.closest('span') && target.closest('span').getAttribute('backdrop')) {
            setModalVisible(false);
        }
    }

    const pressEscHandle = (e) => {
        if (e.code === 'Escape') {
            setModalVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', pressEscHandle)

        return () => {
            document.removeEventListener('keydown', pressEscHandle)
        }
    }, [])

    return (
        <section className="pt-25 pl-4 pr-4">
            <section className={BurgerConstructorStyles.constructor__list}>
                {constructorItems[0]}
                <div className={BurgerConstructorStyles.constructor_scroll}>
                    {constructorItems.slice(1, constructorItems.length - 1)}
                </div>
                {constructorItems[constructorItems.length - 1]}
            </section>
            <footer className={`${BurgerConstructorStyles.constructor__info} mt-10`}>
                <div className="mr-10">
                    <span className="text_type_digits-medium mr-2">{totalCost}</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={showModal}>
                    Оформить заказ
                </Button>
            </footer>

            {
                modalVisible ?
                    <Modal onClose={closeModal}>
                        <OrderDetails />
                    </Modal> : ''
            }
        </section>
    );
}

const ingredientObject = PropTypes.shape({
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
})

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientObject).isRequired
};

export default BurgerConstructor;
