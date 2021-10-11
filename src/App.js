import './App.css';
import data from './components/utils/data';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

function App() {
  return (
    <section className="pl-10 pr-10 pt-10">
      <AppHeader />
      <section className="main-container">
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </section>
    </section>
  );
}

export default App;
