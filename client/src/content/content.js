import React, {useState, useEffect} from 'react';
import ActiveLastBreadcrumb from '../companent/breadcrumbs/breadcrumbs';
import '../css/content.css';
import * as MUI from '@mui/material';
import MyCarousel from "../companent/Carousel/Carousel";
import CounterInput from "../companent/counter_number/counter_imput";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


const label = {inputProps: {'aria-label': 'Checkbox demo'}}
const {Switch, Button} = MUI;
const Content = ({setShowPriceInCharacteristics, setTotalCartPrice}) => {
    const [quantity, setQuantity] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const pricePerPair = 6938;
    const discount = 0.15;
    const priceDiscount = Math.floor(pricePerPair * (1 - discount) * quantity);

    useEffect(() => {
        const savedQuantity = localStorage.getItem('quantity');
        if (savedQuantity) {
            setQuantity(parseInt(savedQuantity));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('quantity', quantity);
    }, [quantity]);

    const priceNosale = pricePerPair * quantity;

    const handleAddToCart = () => {
        const newItem = {name: 'Кроссовки мужские Skechers Sunny Dale', price: priceDiscount};
        setCartItems([...cartItems, newItem]);
        setShowPriceInCharacteristics(true);
        setTotalCartPrice(prevTotal => prevTotal + priceDiscount); // Update total cart price
    };


    return (
        <div className="content">
            <ActiveLastBreadcrumb
            style={{marginBottom: "32px",
            height: "50px",}}
            />
            <h1>Кроссовки мужские Skechers Sunny Dale</h1>
            <div className="product_box">
                <div className="carousel_product">
                    <MyCarousel/>
                </div>
                <div className="boxs11">
                    <div className="box_paramet_product">
                        <div className="paramet_product">
                            <div className="price">
                                <div className="no_sale"><p>{parseInt(priceNosale)} цена без скидки</p></div>
                                <div className="price_for_sale_block">
                                    <div className="sale_price"><p>{priceDiscount} ₽</p></div>
                                    <div className="procent_sale"><p>{(discount * 100).toFixed(0)}%</p></div>
                                </div>

                            </div>
                            <div className="pack_box">
                                <div className="quantity">
                                    <p>{quantity} штук в уп.</p>
                                </div>
                                <div className="pack_order">
                                    <Switch color="primary"/>
                                    <p>Заказ упаковкой</p>
                                </div>
                            </div>
                            <div className="line_bottom_price"></div>
                            <div className="three_param_delivery">
                                <div className="tomorrow">
                                    <p>Завтра</p>
                                    <p>Доставка</p>
                                </div>
                                <div className="Quantity">
                                    <p>{quantity} штук</p>
                                    <p>Тарасовка</p>
                                </div>
                                <div className="Quantity2">
                                    <p>{quantity} штук</p>
                                    <p>Тарасовка</p>
                                </div>
                            </div>
                            <div className="selection_box">
                                <CounterInput value={quantity} onChange={(value) => setQuantity(value)}/>
                                <div className="basket_like_block">
                                    <Button style={{
                                        backgroundColor: 'rgb(21, 81, 229)',
                                        color: 'white',
                                        width: '280px',
                                        height: '56px'
                                    }} variant="contained" onClick={handleAddToCart}>В корзину</Button>

                                    <Checkbox
                                        style={{
                                            width: '72px',
                                            height: '56px',
                                            background: 'rgb(242, 246, 255)',
                                            borderRadius: '8px',
                                        }}
                                        {...label}
                                        icon={<FavoriteBorder/>}
                                        checkedIcon={<Favorite/>}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="vertical_line_charac_product"></div>
                        <div className="characteristics_product">
                            <h3>Характеристики</h3>
                            <div className="blocks_characteristics">
                                <div className="characteristic_block">
                                    <span>ELC00696</span>
                                    <span>ККод РАЭК</span>
                                </div>
                                <div className="characteristic_block">
                                    <span>ELC00696</span>
                                    <span>Код поставщика</span>
                                </div>
                                <div className="characteristic_block">
                                    <span>Electric used</span>
                                    <span>Бренд</span>
                                </div>
                                <div className="characteristic_block">
                                    <span>ELC0200000696</span>
                                    <span>Код производителя</span>
                                </div>
                                <div className="characteristic_block">
                                    <span>ELC0200000696</span>
                                    <span>Артикул</span>
                                </div>
                                <div className="characteristic_block">
                                    <span>ELC00696</span>
                                    <span>Код ЕТМ</span>
                                </div>
                                <div className="characteristic_block">
                                    <span>ELC00696</span>
                                    <span>Серия</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <h3>Описание товара</h3>
                        <p>Создание приверженного покупателя специфицирует неопровержимый комплексный анализ ситуации.
                            CTR существенно индуцирует из ряда вон выходящий SWOT-анализ. Воздействие на потребителя
                            определяет возрастающий интеграл по поверхности, что известно даже школьникам. Отсюда
                            естественно следует, что коммуникация уравновешивает косвенный фактор коммуникации. Поле
                            направлений естественно допускает экспериментальный скачок функции, таким образом сбылась
                            мечта идиота - утверждение полностью доказано. Арифметическая прогрессия притягивает линейно
                            зависимый пул лояльных изданий.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;



