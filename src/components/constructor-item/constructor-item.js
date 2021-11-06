import React, { useRef } from "react";
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import PropTypes from 'prop-types';

import ConstructorItemStyles from './constructor-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REMOVE_CONSTRUCTOR_ITEM, DRAG_SORT } from "../../services/actions/constants";
import { CONSTRUCTOR_ITEM } from "../../utils/types";

const ConstructorItem = (props) => {
    const dispatch = useDispatch();
    const isBun = props.type === 'bun';
    const ref = useRef(null);

    const removeItem = (itemKey) => {
        dispatch({
            type: REMOVE_CONSTRUCTOR_ITEM,
            itemKey: itemKey
        })
    }


    const [, drop] = useDrop({
        accept: CONSTRUCTOR_ITEM,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.itemKey;
            const hoverIndex = props.itemKey;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            dispatch({
                type: DRAG_SORT,
                dragIndex: dragIndex,
                hoverIndex: hoverIndex
            })
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: CONSTRUCTOR_ITEM,
        item: { ...props },
        canDrag: isBun ? false : true,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });
    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));

    return (
        <div id={props.itemKey} ref={ref} className={`${ConstructorItemStyles.constructor__item} 
        ${!isBun && ConstructorItemStyles.cursor_grab}`} style={{ opacity }} >
            {!isBun && <DragIcon />}
            <ConstructorElement
                type={props.itemType}
                isLocked={isBun}
                text={`${props.name} ${props.addText ? props.addText : ''}`}
                price={props.price}
                thumbnail={props.image}
                handleClose={() => removeItem(props.itemKey)}
            />
        </div>
    )
}

ConstructorItem.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    itemType: PropTypes.string,
    addText: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    itemKey: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
};

export default ConstructorItem;