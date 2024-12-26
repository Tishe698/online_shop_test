import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './1.css'; // Подключаем файл стилей

export default function ActiveLastBreadcrumb() {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link className="breadcrumb-link" href="/client/public" key="catalog">
                Каталог
            </Link>
            <Link className="breadcrumb-link" href="#" key="shoes">
                Обувь
            </Link>
            <Link className="breadcrumb-link" href="#" key="sneakers">
                Кроссовки
            </Link>
            <Link className="breadcrumb-link" href="#" aria-current="page" key="running">
                Беговые
            </Link>
        </Breadcrumbs>
    );
}


