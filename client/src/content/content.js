import React, { useState, useEffect, useCallback } from 'react';
import ActiveLastBreadcrumb from '../companent/breadcrumbs/breadcrumbs';
import '../css/content.css';
import * as MUI from '@mui/material';
import MyCarousel from "../companent/Carousel/Carousel";
import CounterInput from "../companent/counter_number/counter_imput";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const { Switch, Button } = MUI;

const Content = ({ setShowPriceInCharacteristics, setTotalCartPrice }) => {
    const [quantity, setQuantity] = useState(1);
    const pricePerPair = 6938;
    const discount = 0.15;

    const priceDiscount = Math.floor(pricePerPair * (1 - discount) * quantity);
    const priceNosale = pricePerPair * quantity;

    useEffect(() => {
        const savedQuantity = localStorage.getItem('quantity');
        if (savedQuantity) {
            setQuantity(parseInt(savedQuantity, 10) || 1); // If parsing fails, default to 1
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('quantity', quantity);
    }, [quantity]);

    const handleAddToCart = useCallback(() => {
        setShowPriceInCharacteristics(true);
        setTotalCartPrice((prevTotal) => prevTotal + priceDiscount);
    }, [priceDiscount, setShowPriceInCharacteristics, setTotalCartPrice]);

    return (
        <div className="content">
            <ActiveLastBreadcrumb style={{ marginBottom: "32px", height: "50px" }} />
            <h1>Кроссовки мужские Skechers Sunny Dale</h1>
            <div className="product_box">
                <div className="carousel_product">
                    <MyCarousel />
                </div>
                <div className="boxs11">
                    <div className="box_paramet_product">
                        <div className="paramet_product">
                            <div className="price">
                                <div className="no_sale">
                                    <p>{priceNosale} цена без скидки</p>
                                </div>
                                <div className="price_for_sale_block">
                                    <div className="sale_price">
                                        <p>{priceDiscount} ₽</p>
                                    </div>
                                    <div className="procent_sale">
                                        <p>{(discount * 100).toFixed(0)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pack_box">
                                <div className="quantity">
                                    <p>{quantity} штук в уп.</p>
                                </div>
                                <div className="pack_order">
                                    <Switch color="primary" />
                                    <p>Заказ упаковкой</p>
                                </div>
                            </div>
                            <div className="line_bottom_price"></div>
                            <div className="three_param_delivery">
                                {['Завтра доставка', 'Тарасовка', 'Тарасовка'].map((item, index) => (
                                    <div key={index} className={`Quantity${index + 1}`}>
                                        <p>{quantity} штук</p>
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="selection_box">
                                <CounterInput
                                    value={quantity}
                                    onChange={(value) => setQuantity(value)}
                                />
                                <div className="basket_like_block">
                                    <Button
                                        style={{
                                            backgroundColor: 'rgb(21, 81, 229)',
                                            color: 'white',
                                            width: '280px',
                                            height: '56px',
                                        }}
                                        variant="contained"
                                        onClick={handleAddToCart}
                                    >
                                        В корзину
                                    </Button>

                                    <Checkbox
                                        style={{
                                            width: '72px',
                                            height: '56px',
                                            background: 'rgb(242, 246, 255)',
                                            borderRadius: '8px',
                                        }}
                                        {...label}
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="vertical_line_charac_product"></div>
                        <div className="characteristics_product">
                            <h3>Характеристики</h3>
                            <div className="blocks_characteristics">
                                {[
                                    { code: 'ELC00696', description: 'Код РАЭК' },
                                    { code: 'ELC00696', description: 'Код поставщика' },
                                    { code: 'Electric used', description: 'Бренд' },
                                    { code: 'ELC0200000696', description: 'Код производителя' },
                                    { code: 'ELC0200000696', description: 'Артикул' },
                                    { code: 'ELC00696', description: 'Код ЕТМ' },
                                    { code: 'ELC00696', description: 'Серия' },
                                ].map((item, index) => (
                                    <div key={index} className="characteristic_block">
                                        <span>{item.code}</span>
                                        <span>{item.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        <h3>Описание товара</h3>
                        <p>
                            Создание приверженного покупателя специфицирует неопровержимый комплексный анализ
                            ситуации. CTR существенно индуцирует из ряда вон выходящий SWOT-анализ.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
