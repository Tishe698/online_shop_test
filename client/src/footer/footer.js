import React from 'react';
import '../css/footer.css';
import logo from '../img/header/logo.png';
import { Button } from "@mui/material";
import pdf from '../img/footer/pdf.png';
import info from '../img/footer/info.png';
import video from '../img/footer/video.png';
import youtube from '../img/footer/you_tube.png';
import gray_logo from '../img/footer/gray_footer_logo.png';

const FooterLinksSection = ({ title, links }) => (
    <div className="footer-section">
        <h4>{title}</h4>
        <nav>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link.href}>{link.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
);

const Footer = () => {
    const womenLinks = [
        { href: "/client/public", text: "Одежда" },
        { href: "/client/public", text: "Обувь" },
        { href: "/client/public", text: "Аксессуары" },
        { href: "/client/public", text: "Белье" },
        { href: "/client/public", text: "Bra fitting" },
    ];

    const menLinks = [
        { href: "/client/public", text: "Одежда" },
        { href: "/client/public", text: "Обувь" },
        { href: "/client/public", text: "Аксессуары" },
        { href: "/client/public", text: "Белье" },
    ];

    const kidsLinks = [
        { href: "/client/public", text: "Одежда" },
        { href: "/client/public", text: "Обувь" },
        { href: "/client/public", text: "Аксессуары" },
        { href: "/client/public", text: "Белье" },
        { href: "/client/public", text: "Игрушки" },
        { href: "/client/public", text: "Малыши" },
    ];

    const sportLinks = [
        { href: "/client/public", text: "Туризм" },
        { href: "/client/public", text: "Тренажеры и фитнес" },
        { href: "/client/public", text: "Командные виды спорта" },
        { href: "/client/public", text: "Самокаты" },
    ];

    const utilityLinks = [
        { href: "/client/public", text: <><img src={pdf} alt="PDF" /> PDF презентация</> },
        { href: "/client/public", text: <><img src={video} alt="Видео" /> Видео инструкция</> },
        { href: "/client/public", text: <><img src={info} alt="FAQ" /> FAQ</> },
        { href: "/client/public", text: <><img src={youtube} alt="YouTube" /> Мы на YouTube</> },
        { href: "/client/public", text: "Политика конфиденциальности" },
        { href: "/client/public", text: "Лицензионное соглашение" },
    ];

    return (
        <footer>
            <div className="top_footer">
                <div className="footer_logo">
                    <img className="logo_footer_content" src={logo} alt="Логотип" />
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
                            <li><a href="/client/public">Вакансии</a></li>
                            <li><a href="/client/public">Блог</a></li>
                            <li><a href="/client/public">Акции</a></li>
                            <li>
                                <Button
                                    style={{
                                        borderRadius: '8px',
                                        background: 'rgb(242, 246, 255)',
                                        width: '179px',
                                        height: '48px',
                                        color: 'rgb(21, 81, 229)',
                                    }}
                                >
                                    Предложить идею
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="content_footer">
                <FooterLinksSection title="Женщинам" links={womenLinks} />
                <FooterLinksSection title="Мужчинам" links={menLinks} />
                <FooterLinksSection title="Детям" links={kidsLinks} />
                <FooterLinksSection title="Спорт и Туризм" links={sportLinks} />
            </div>
            <div className="down_footer">
                <nav>
                    <ul>
                        {utilityLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.href}>{link.text}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="security_policy">
                <p>
                    Настоящая Политика обработки персональных данных разработана в соответствии с Конституцией Российской Федерации...
                </p>
            </div>
            <div className="end_footer">
                <img src={gray_logo} alt="Логотип" />
                <h4>Разработка платформы</h4>
            </div>
        </footer>
    );
};

export default Footer;
