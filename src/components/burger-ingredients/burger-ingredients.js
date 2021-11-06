import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { ADD_VIEWD_INGREDIENT, REMOVE_VIEWD_INGREDIENT } from "../../services/actions/constants";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import Modal from "../modal/modal";
import Ingredient from "../ingredient/ingredient";
import IngredientDetails from "../ingredient-details/ingredient-details";


const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const viewedIngredient = useSelector(store => store.viewedIngredient.viewedIngredient);
    const ingredients = useSelector(store => store.ingredients.items);

    const [current, setCurrent] = useState('one');
    const [modalVisible, setModalVisible] = useState(false);

    let rolls = [];
    let sauces = [];
    let fillings = [];

    const showModal = (e) => {
        let clickedIngredientId = e.currentTarget.getAttribute('id');
        let clickedIngredientData = ingredients.find(item => item._id === clickedIngredientId);

        setModalVisible(true);
        dispatch({
            type: ADD_VIEWD_INGREDIENT,
            data: clickedIngredientData
        })
    }

    const closeModal = (e) => {
        if (e.type === 'keydown') {
            setModalVisible(false);
            dispatch({
                type: REMOVE_VIEWD_INGREDIENT,
                data: {}
            })
        } else {
            let target = e.nativeEvent.target;

            if (target.getAttribute('backdrop')) {
                setModalVisible(false);
                dispatch({
                    type: REMOVE_VIEWD_INGREDIENT,
                    data: {}
                })
            } else if (target.closest('span') && target.closest('span').getAttribute('backdrop')) {
                setModalVisible(false);
                dispatch({
                    type: REMOVE_VIEWD_INGREDIENT,
                    data: {}
                })
            }
        }
    }

    // Распределение ингредиентов по типу
    ingredients.forEach((item) => {
        if (item.type === 'bun') {
            rolls.push(item);
        }
        if (item.type === 'main') {
            fillings.push(item);
        }
        if (item.type === 'sauce') {
            sauces.push(item);
        }
    });

    // Массив булок
    const rollsItems = rolls.map((item) =>
        <Ingredient key={item._id} id={item._id} onClick={showModal} {...item} />
    );

    // Массив начинок
    const fillingsItems = fillings.map((item) =>
        <Ingredient key={item._id} id={item._id} onClick={showModal} {...item} />
    );

    // Массив соусов
    const saucesItems = sauces.map((item) =>
        <Ingredient key={item._id} id={item._id} onClick={showModal} {...item} />
    );

    // Функция отслеживания активного таба
    const checkTabs = () => {
        let tabsOffsetY = document.querySelector('#tabs').getBoundingClientRect().y;
        let sectionsHeaders = document.querySelectorAll('.section-header');
        let diffsArr = [];

        for (let i = 0; i < sectionsHeaders.length; i++) {
            diffsArr.push(Math.abs(tabsOffsetY - sectionsHeaders[i].getBoundingClientRect().y));
        }

        let minDiff = diffsArr.indexOf(Math.min(...diffsArr));

        if (minDiff === 0) {
            setCurrent('one');
        } else if (minDiff === 1) {
            setCurrent('two');
        } else setCurrent('three');
    }

    useEffect(() => {
        document.getElementById('scrollContainer').addEventListener('scroll', checkTabs);

        return () => {
            document.getElementById('scrollContainer') && 
            document.getElementById('scrollContainer').removeEventListener('scroll', checkTabs);
        }
    }, [current]);

    return (
        <section id="ingredientsContainer" className="pt-10">
            <h1 className="text_type_main-large mb-5">Соберите бургер</h1>
            <div id="tabs" className={`${BurgerIngredientsStyles.tabs} mb-10`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section id="scrollContainer" className={BurgerIngredientsStyles.ingredients_scroll}>
                <section id="rolls" className="mb-10">
                    <h2 id="rollsHeader" className="section-header text_type_main-medium mb-6">Булки</h2>
                    <section className={BurgerIngredientsStyles.ingredients}>
                        {rollsItems}
                    </section>
                </section>
                <section id="sauces" className="mb-10">
                    <h2 id="saucesHeader" className="section-header text_type_main-medium mb-6">Соусы</h2>
                    <section className={BurgerIngredientsStyles.ingredients}>
                        {saucesItems}
                    </section>
                </section>
                <section id="fillings" className="mb-10">
                    <h2 id="fillingsHeader" className="section-header text_type_main-medium mb-6">Начинки</h2>
                    <section className={BurgerIngredientsStyles.ingredients}>
                        {fillingsItems}
                    </section>
                </section>
                {
                    modalVisible &&
                    <Modal title="Детали ингредиента" onClose={closeModal}>
                        <IngredientDetails {...viewedIngredient} />
                    </Modal>
                }
            </section>
        </section>
    );
}

export default BurgerIngredients;