'use strict';

// logout
const logout = new LogoutButton();

logout.action = () => {
  ApiConnector.logout(response => {
    if (response.success !== true) return;
    location.reload();
    return response;
  });
};

// profileInfo
const refreshInfo = function(response) {
  if (response.success !== true) return;
  ProfileWidget.showProfile(response.data);
};

ApiConnector.current(refreshInfo);

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
// moneyAdd
const moneyManager = new MoneyManager();

// Разобраться с обновлением данных (оно запаздывает на 1 шаг)
moneyManager.addMoneyCallback = function({ currency, amount }) {
  ApiConnector.addMoney({ currency, amount }, response => {
    if (!response.success !== true) return this.setMessage(response.success, response.error);
    this.setMessage(response.success, `Счет пополнен на ${amount} ${currency}`);
    ApiConnector.current(refreshInfo);
  });
};

// Разобраться с обновлением данных (оно запаздывает на 1 шаг)
moneyManager.conversionMoneyCallback = function({ fromCurrency, targetCurrency, fromAmount }) {
  ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, response => {
    console.log(response);
    if (response.success !== true) return this.setMessage(response.success, response.error);
    this.setMessage(response.success, `${fromAmount} ${fromCurrency} успешно сконвертировано в ${targetCurrency}`);
    ApiConnector.current(refreshInfo);
  });
};

// Разобраться с обновлением данных (оно запаздывает на 1 шаг)
moneyManager.sendMoneyCallback = function({ to, currency, amount }) {
  ApiConnector.transferMoney({ to, currency, amount }, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    console.log(response);

  });
};

// Работа с избранным
const favoritesWidget = new FavoritesWidget();

favoritesWidget.getFavorites = function() {
  ApiConnector.getFavorites(response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    this.clearTable();
    this.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  });
};

favoritesWidget.getFavorites();

favoritesWidget.addUserCallback = function({ id, name }) {
  ApiConnector.addUserToFavorites({ id, name }, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    this.clearTable();
    this.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  });
};

favoritesWidget.removeUserCallback = function(id) {
  ApiConnector.removeUserFromFavorites(id, response => {
    if (response.success !== true) return this.setMessage(response.success, response.error);
    this.clearTable();
    this.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  });
};