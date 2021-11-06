import React from "react";
import { useSelector } from 'react-redux';

import OrderDetailsStyles from './order-details.module.css';
import iconDone from '../../images/done.svg'

const OrderDetails = () => {
    const order = useSelector(store => store.orderDetails.orderDetails);
    const loader = useSelector(store => store.orderDetails.orderRequest);

    if (loader) {
        return (
            <p>Loading...</p>
        )
    } else {
        return (
            <section className={`${OrderDetailsStyles.order_details} pt-20 pb-20`}>
                <h1 className="text text_type_digits-large mb-8">{order.order.number}</h1>
                <p className="text text_type_main-medium">индефикатор заказа</p>
                <span className="mt-15 mb-15">
                    <img src={iconDone} alt="Done icon" />
                </span>
                <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </section>
        )
    }
}

export default OrderDetails;