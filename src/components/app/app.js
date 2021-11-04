import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getIngredients } from '../../services/actions';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.ingredients.items);
  const loader = useSelector(store => store.ingredients.ingredientsRequest)

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (loader) {
    return (
      <p className={`${AppStyles.align_center} text_type_main-medium`}>Loading...</p>
    )
  } else {
    return (
      <section className="pl-10 pr-10 pt-10">
        <AppHeader />
        <section className={AppStyles.main_container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor />
          </DndProvider>
        </section>
      </section>
    );
  }
}

export default App;