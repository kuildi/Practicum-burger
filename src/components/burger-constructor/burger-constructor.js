import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './burger-constructor.module.css';
import { ADD_CONSTRUCTOR_ITEM, REPLACE_CONSTRUCTOR_BUN } from '../../services/actions/constants';
import { INGREDIENT } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorItem from '../constructor-item/constructor-item';
import { getOrder } from '../../services/actions';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.ingredients.ingredientsConstructor);
    const [modalVisible, setModalVisible] = useState(false);
    const itemsIds = [];

    const [{ highlighted }, dropTarget] = useDrop({
        accept: INGREDIENT,
        collect: monitor => ({
            highlighted: monitor.canDrop(),
        }),
        drop(item) {
            if (ingredients.find(item => item.type === 'bun') && item.type === 'bun') {
                dispatch({
                    type: REPLACE_CONSTRUCTOR_BUN,
                    item: { ...item, itemKey: Math.floor(Math.random() * 300) }
                })
            } else {
                dispatch({
                    type: ADD_CONSTRUCTOR_ITEM,
                    item: { ...item, itemKey: Math.floor(Math.random() * 300) }
                })
            }
        }
    });

    const totalCost = ingredients.reduce((sum, current) => (
        sum + (current.type === 'bun' ? 2 * current.price : current.price)
    ), 0);

    const constructorItems = ingredients.map((item) => {
        if (item.type !== 'bun') {
            return (
                <ConstructorItem key={item.itemKey} {...item} />
            )
        } else return null;
    });

    const topBun = ingredients.map((item) => {
        if (item.type === 'bun') {
            return (
                <ConstructorItem key={item.itemKey} itemType="top" addText="(верх)" {...item} />
            )
        } else return null;
    })

    const bottomBun = ingredients.map((item) => {
        if (item.type === 'bun') {
            return (
                <ConstructorItem key={item.itemKey} itemType="bottom" addText="(низ)" {...item} />
            )
        } else return null;
    })

    const makeOrder = () => {
        ingredients.forEach(item => {
            itemsIds.push(item._id);
        });
        dispatch(getOrder(itemsIds));
        setModalVisible(true);
    }

    const closeModal = (e) => {
        if (e.type === 'keydown') {
            setModalVisible(false);
        } else {
            let target = e.nativeEvent.target;

            if (target.getAttribute('backdrop')) {
                setModalVisible(false);
            } else if (target.closest('span') && target.closest('span').getAttribute('backdrop')) {
                setModalVisible(false);
            }
        }
    }

    return (
        <section className="pt-25 pl-4 pr-4">
            <section ref={dropTarget} className={`${BurgerConstructorStyles.constructor__list} ${highlighted && BurgerConstructorStyles.bordered}`} style={{ minHeight: 300 }}>
                {
                    ingredients.length > 0 ?
                        <>
                            {topBun}
                            <div className={BurgerConstructorStyles.constructor_scroll}>
                                {constructorItems}
                            </div>
                            {bottomBun}
                        </>
                        : <p className={`${BurgerConstructorStyles.align_center} text_type_main-medium`}>
                            Место для вашего бургера
                        </p>
                }

            </section>
            <footer className={`${BurgerConstructorStyles.constructor__info} mt-10`}>
                <div className="mr-10">
                    <span className="text_type_digits-medium mr-2">{totalCost}</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={makeOrder}>
                    Оформить заказ
                </Button>
            </footer>

            {
                modalVisible &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            }
        </section>
    );
}

export default BurgerConstructor;
