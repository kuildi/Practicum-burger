import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const totalCost = props.ingredients.reduce((sum, current) => sum + current.price, 0);
    const ingredientsLastIndex = props.ingredients.length - 1;
    const constructorItems = props.ingredients.map((item, i) => {
        return (
            <div className={`${BurgerConstructorStyles.constructor__item} 
            ${i === 0 || i === ingredientsLastIndex ? "ml-8" : ''}`} >
                {i === 0 || i === ingredientsLastIndex ? '' : <DragIcon />}
                <ConstructorElement
                    key={item._id}
                    type={i === 0 ? "top" : '' || i === ingredientsLastIndex ? "bottom" : ''}
                    isLocked={i === 0 || i === ingredientsLastIndex ? true : false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />
            </div>
        );
    });

    return (
        <section className="pt-25 pl-4 pr-4">
            <section className={BurgerConstructorStyles.constructor__list}>
                {constructorItems}
            </section>
            <footer className={`${BurgerConstructorStyles.constructor__info} mt-10`}>
                <div className="mr-10">
                    <span className="text_type_digits-medium mr-2">{totalCost}</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </footer>
        </section>
    );
}

export default BurgerConstructor;
