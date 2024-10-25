describe('автотесты для формы логина и пароля', function () {

    it('верный логин и пароль', function () {
         cy.visit('https://login.qa.studio/');
         cy.get('#mail').type('german@dolnikov.ru');
         cy.get('#pass').type('iLoveqastudio1');
         cy.get('#loginButton').click();//нажать войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
         cy.get('#messageHeader').should('be.visible'); //форма видна
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); //крестик
     })
    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');//цвет кнопки забыли пароль
        cy.get('#forgotEmailButton').click();// нажать на забыли пароль
        cy.get('#mailForgot').type('german@dolnikov.ru');//логин
        cy.get('#restoreEmailButton').click();//отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#messageHeader').should('be.visible'); //форма видна
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//крестик
    })
     it('Верный логин и НЕверный пароль', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('german@dolnikov.ru');//логин правильный
        cy.get('#pass').type('iLoveqastudio2');//пароль неправильный
        cy.get('#loginButton').click();//нажать войти
        cy.get('#messageHeader').should('be.visible');//форма видна
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//крестик
    })
     it('НЕВерный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('germfan@dolnikov.ru');//логин неправильный
        cy.get('#pass').type('iLoveqastudio1');//пароль правильный
        cy.get('#loginButton').click();//нажать войти
        cy.get('#messageHeader').should('be.visible');//форма видна
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//крестик
    })
     it('Валидация на наличие @', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('germandolnikov.ru');//логин без @, а если оставить @ и написать после нее любую букву в любом месте, то тоже будет ошибка валидации
        cy.get('#pass').type('iLoveqastudio');//пароль правильный
        cy.get('#loginButton').click();//нажать
        cy.get('#messageHeader').should('be.visible');//форма видна
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//крестик
    })
     it('проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('GerMan@Dolnikov.ru');//логин 
        cy.get('#pass').type('iLoveqastudio');//пароль правильный
        cy.get('#loginButton').click();//нажать
        cy.get('#messageHeader').should('be.visible');//форма видна
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');//крестик
    })
 }) 