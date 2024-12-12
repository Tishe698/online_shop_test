// ActiveLastBreadcrumb.js
import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './1.css'; // Подключаем файл стилей

export default function ActiveLastBreadcrumb() {
    return (
            <Breadcrumbs aria-label="breadcrumb">
                <Link className="breadcrumb-link" href="/client/public">
                    <a className="breadcrumb-text">Каталог</a>
                </Link>
                <Link className="breadcrumb-link" href="/material-ui/getting-started/installation/">
                    <span className="breadcrumb-text">Обувь</span>
                </Link>
                <Link className="breadcrumb-link" color="text.primary" href="/material-ui/react-breadcrumbs/" aria-current="page">
                    <span className="breadcrumb-text">Кроссовки</span>
                </Link>
                <Link className="breadcrumb-link" color="text.primary" href="/material-ui/react-breadcrumbs/" aria-current="page">
                    <span className="breadcrumb-text">Беговые</span>
                </Link>
            </Breadcrumbs>
    );
}


