import React, { useState, useEffect } from 'react';
import '../css/header.css';
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import basket from '../img/header/shopbasket.png';
import avatar from '../img/header/Avatar.png';
import logo from '../img/header/logo.png';
import menu_button_img from '../img/header/button_menu.png';
import icon_manag from '../img/header/manag_icon.png';
import * as MUI from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { BsBell, BsBellFill } from 'react-icons/bs';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Dashboard from '../companent/dashboard_login/dashboard';

// Label для чекбокса
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const { Button: MUIButton } = MUI;

// Компонент Header
const Header = ({ showPriceInCharacteristics, totalCartPrice }) => {
    const [searchText, setSearchText] = useState('');
    const [openSupportDialog, setOpenSupportDialog] = useState(false);
    const [userName, setUserName] = useState(''); // Состояние для имени пользователя

    // Загружаем имя пользователя при монтировании компонента
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Токен авторизации
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserName(data.name || 'Неизвестный пользователь'); // Установка имени пользователя
                } else {
                    console.error('Ошибка загрузки имени пользователя');
                }
            } catch (error) {
                console.error('Ошибка при загрузке имени:', error);
            }
        };

        fetchUserName();
    }, []);

    const handleClearSearch = () => {
        setSearchText('');
    };

    const handleOpenSupportDialog = () => {
        setOpenSupportDialog(true);
    };

    const handleCloseSupportDialog = () => {
        setOpenSupportDialog(false);
    };

    return (
        <header className="header">
            <div className="first-companent_header">
                {/* Логотип */}
                <a href="/home"><img className={'logo'} src={logo} alt="Логотип" /></a>
                {/* Кнопка меню */}
                <MUIButton className={'menu-button MuiButton-root'}>
                    <img className={'menu_button_img'} src={menu_button_img} alt="Меню" /><p>Меню</p>
                </MUIButton>
                {/* Поле поиска */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Название запроса"
                        className="search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <BsSearch className={'search-icon'} />
                    <RxCross2 className={'clear-icon'} onClick={handleClearSearch} />
                </div>
                {/* Чекбоксы */}
                <Checkbox
                    {...label}
                    icon={<BsBell className={'alarm_active'} />}
                    checkedIcon={<BsBellFill className={'alarm_deactive'} />}
                />
                <div className="vertical_line"></div>
                <Checkbox
                    {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                {/* Кнопка корзины */}
                <MUIButton style={{
                    backgroundColor: 'rgb(242, 246, 255)',
                    color: 'rgb(21, 81, 229)',
                    width: '149px',
                    height: '48px',
                    gap: '12px',
                    marginRight: '24px',
                }}>
                    <img className={'basket'} src={basket} alt="Корзина" />
                    {showPriceInCharacteristics && <p className="characteristics">{totalCartPrice}</p>}
                </MUIButton>
                {/* Аватар */}
                <div className="avatar">
                    <img src={avatar} alt="Аватар" />
                </div>
                {/* Имя пользователя */}
                <p className={'avatar_name'}>{userName || 'Загрузка...'}</p>
                <Dashboard />
            </div>
            <div className="bottom_nav">
                <nav>
                    {/* Навигация */}
                    <ul className={'nav_link'}>
                        <li><a href="/client/public">Мои заказы</a></li>
                        <li><a href="/about">Сотрудники</a></li>
                        <li><a href="/contact">Шаблоны заказов</a></li>
                        <li><a href="/contact">Обращения</a></li>
                    </ul>
                </nav>
                <div className="two_nav">
                    {/* Менеджер */}
                    <MUIButton className={'button_manager'} onClick={handleOpenSupportDialog}>
                        <img className={'manager_icon'} src={icon_manag} alt="Менеджер" />Ваш менеджер
                    </MUIButton>
                    {/* Акции */}
                    <MUIButton className={'button_action'}>
                        <p className={'percentage_icon'}>%</p>
                        <p>Акции</p>
                    </MUIButton>
                    {/* Блог */}
                    <MUIButton className={'blog_button'}>Блог</MUIButton>
                </div>
            </div>

            {/* Диалог поддержки */}
            <Dialog open={openSupportDialog} onClose={handleCloseSupportDialog}>
                <DialogTitle>Техническая поддержка</DialogTitle>
                <DialogContent>
                    <p>Здесь может быть ваш контент технической поддержки</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSupportDialog}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </header>
    );
};

export default Header;
