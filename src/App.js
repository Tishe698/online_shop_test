import React, { useState } from 'react';
import Header from './header/header'; // Путь к файлу Header.js
import Content from './content/content';
import Footer from "./footer/footer"; // Путь к файлу Content.js
import '../src/css/index.css'
const Container = () => {
    const [showPriceInCharacteristics, setShowPriceInCharacteristics] = useState(false);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    return (
        <div className="Container">
            <Header showPriceInCharacteristics={showPriceInCharacteristics} totalCartPrice={totalCartPrice} />
            <Content setShowPriceInCharacteristics={setShowPriceInCharacteristics} setTotalCartPrice={setTotalCartPrice} />
            <Footer/>
        </div>
    );
};

export default Container;

