'use strict';

// logout
const logout = new LogoutButton();

logout.action = () => {
  ApiConnector.logout(response => {
    if (response.success !== true) return;
    location.reload();
  });
};

// profileInfo
 ProfileWidget.refreshInfo = function() {
  ApiConnector.current(response => {
    if (response.success !== true) return;
    this.showProfile(response.data);
  });
};

ProfileWidget.refreshInfo();

// ratesBoard
const ratesBoard = new RatesBoard();

ratesBoard.getRates = function () {
  ApiConnector.getStocks(response => {
    if (response.success !== true) return;
    this.clearTable();
    this.fillTable(response.data);
  });
};

ratesBoard.getRates();
const refreshRatesTimer = setInterval(ratesBoard.getRates(), 60000);

// moneyOperations
// Money Add
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function ({ currency, amount }) {
  ApiConnector.addMoney({ currency, amount }, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    ProfileWidget.showProfile(response.data);
    this.setMessage(response.success, `Счет пополнен на ${amount} ${currency}`);
  });
};

// Money Conversion
moneyManager.conversionMoneyCallback = function ({ fromCurrency, targetCurrency, fromAmount }) {
  ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    ProfileWidget.showProfile(response.data);
    this.setMessage(response.success, `${fromAmount} ${fromCurrency} успешно сконвертировано в ${targetCurrency}`);
  });
};

// Money Transfer
moneyManager.sendMoneyCallback = function ({ to, currency, amount }) {
  ApiConnector.transferMoney({ to, currency, amount }, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    ProfileWidget.showProfile(response.data);
    this.setMessage(response.success, `${amount} ${currency} успешно переведено пользователю ${to}`);
  });
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

// Показать избранных пользователей
favoritesWidget.getFavorites = function () {
  ApiConnector.getFavorites(response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    this.clearTable();
    this.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  });
};

favoritesWidget.getFavorites();

// Добавление пользователя в избранное
favoritesWidget.addUserCallback = function ({ id, name }) {
  ApiConnector.addUserToFavorites({ id, name }, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    this.clearTable();
    this.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  });
};

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = function (id) {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    this.clearTable();
    this.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  });
};