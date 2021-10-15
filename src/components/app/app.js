import React, { useState, useEffect } from 'react';

import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

function App() {
  const [data, setData] = useState(null);
  const domainUrl = 'norma.nomoreparties.space';

  const getData = async () => {
    try {
      let response = await fetch(`https://${domainUrl}/api/ingredients`);
      let responseData = await response.json();

      setData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <section className="pl-10 pr-10 pt-10">
      <AppHeader />
      <section className={AppStyles.main_container}>
        {
          data ?
            <>
              <BurgerIngredients ingredients={data} />
              <BurgerConstructor ingredients={data} />
            </>
            : null
        }
      </section>
    </section>
  );
}

export default App;