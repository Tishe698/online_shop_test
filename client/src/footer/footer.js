import React from 'react';  // Подключаем библиотеку React
import '../css/footer.css';
import logo from '../img/header/logo.png';
import {Button} from "@mui/material";
import pdf from '../img/footer/pdf.png';
import info from '../img/footer/info.png';
import video from '../img/footer/video.png';
import youtube from '../img/footer/you_tube.png';
import gray_logo from '../img/footer/gray_footer_logo.png';
const Footer = () => {
    return (
        <footer>
            <div className="top_footer">
                <div className="footer_logo">
                    <img className={'logo_footer_content'} src={logo} alt="Логотип"/>
                    <div className="support_contacts">
                        <h4>8 800 841-95-95</h4>
                        <p>Служба поддержки</p>
                    </div>
                    <div className="support_contacts">
                        <h4>support@sport.ru</h4>
                        <p>Служба поддержки</p>
                    </div>
                </div>
                <div className="footer_link">
                    <nav>
                        <ul>
                            <li>
                                <a href="/client/public">Вакансии</a>
                            </li>
                            <li>
                                <a href="/client/public">Блог</a>
                            </li>
                            <li>
                                <a href="/client/public">Акции</a>
                            </li>
                            <li>
                                <Button style={{
                                    borderRadius: '8px',
                                    /* Brand/Ghost */
                                    background: 'rgb(242, 246, 255)',
                                    width: '179px',
                                    height: '48px',
                                    color: 'rgb(21, 81, 229)',
                                }}>
                                    Предложить идею
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="content_footer">
                <div className="female">
                    <h4>Женщинам</h4>
                    <nav>
                        <ul>
                            <li><a href="/client/public">Одежда</a></li>
                            <li><a href="/client/public">Обувь</a></li>
                            <li><a href="/client/public">Аксессуары</a></li>
                            <li><a href="/client/public">Белье</a></li>
                            <li><a href="/client/public">Bra fitting</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="male">
                    <h4>Мужчинам</h4>
                    <nav>
                        <ul>
                            <li><a href="/client/public">Одежда</a></li>
                            <li><a href="/client/public">Обувь</a></li>
                            <li><a href="/client/public">Аксессуары</a></li>
                            <li><a href="/client/public">Белье</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="kids">
                    <h4>Детям</h4>
                    <nav>
                        <ul>
                            <li><a href="/client/public">Одежда</a></li>
                            <li><a href="/client/public">Обувь</a></li>
                            <li><a href="/client/public">Аксессуары</a></li>
                            <li><a href="/client/public">Белье</a></li>
                            <li><a href="/client/public">Игрушки</a></li>
                            <li><a href="/client/public">Малыши</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="type_of_sport">
                    <h4>Велоспорт</h4>
                    <nav>
                        <ul>
                            <li><a href="/client/public">Туризм</a></li>
                            <li><a href="/client/public">Тренажеры и фитнес</a></li>
                            <li><a href="/client/public">Командные виды спорта</a></li>
                            <li><a href="/client/public">Самокаты</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="down_footer">
                <nav>
                    <ul>
                        <li><a href="/client/public"><img src={pdf} alt="pdf"/> PDF презентация</a></li>
                        <li><a href="/client/public"><img src={video} alt="видео интсрукция"/> Видео инструкция</a></li>
                        <li><a href="/client/public"><img src={info} alt="FAQ"/> FAQ</a></li>
                        <li><a href="/client/public"><img src={youtube} alt="Youtube"/> Мы на YouTube</a></li>
                        <li><a href="/client/public">Политика конфиденциальности</a></li>
                        <li><a href="/client/public">Лицензионное соглашение</a></li>
                    </ul>
                </nav>
            </div>
            <div className="security_policy">
                <p>Настоящая Политика обработки персональных данных разработана в соответствии с Конституцией Российской
                    Федерации, Трудовым кодексом Российской Федерации, Гражданским кодексом Российской Федерации,
                    Федеральным законом от 27 июля 2006 года 149-ФЗ "Об информации, информационных технологиях и о
                    защите информации",
                </p>
            </div>
            <div className="end_footer">
                <img src={gray_logo} alt="logo"/>
                <h4>Разработка платформы</h4>
            </div>
        </footer>
    );
}

export default Footer;
