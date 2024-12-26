import { faker } from '@faker-js/faker';

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const password = faker.internet.password(10);

describe('Тестирование входа', function () {
    it('Проверка логина', function () {
        cy.visit('http://localhost:3000/');
        cy.get('input[name="username"]').type('govard698@gmail.com');
        cy.get('input[name="password"]').type('govard698@gmail.com');
        cy.get('button[type="submit"]').click();

        // Проверяем наличие токена
        cy.window().its('localStorage.authToken').should('exist');

        // Убеждаемся, что произошел редирект
        cy.url().should('include', '/home');
    });
    it('работает кнопка нет аккаунта', function () {
        cy.visit('http://localhost:3000/');
        cy.get('a').click();

        // Убеждаемся, что произошел редирект
        cy.url().should('include', '/register');
    });
});


describe('Регистрация нового пользователя', function () {
    it('Должен зарегистрировать нового пользователя с уникальными данными', function () {
        cy.visit('http://localhost:3000/register');
        cy.get('#email').type(randomEmail);
        cy.get('#name').type(randomName);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click();
        cy.get('.MuiButtonBase-root').click() // проверка что уже есть аккаунт с данным именем
        cy.url().should('include', '/login');
        // Убеждаемся, что произошел редирект
    });
});

describe('Регистрация нового пользователя', function () {
    it('Должен зарегистрировать нового пользователя с уникальными данными', function () {
        cy.visit('http://localhost:3000/register');
        cy.get('#email').type(randomEmail);
        cy.get('#name').type(randomName);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click();
        cy.get('.MuiButtonBase-root').click() // проверка что уже есть аккаунт с данным именем
        cy.url().should('include', '/login');
        // Убеждаемся, что произошел редирект
    });
});