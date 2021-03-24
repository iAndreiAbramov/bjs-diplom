'use strict';

const logout = new LogoutButton();

logout.action = () => {
  ApiConnector.logout(response => {
    if (response.success !== true) return;
    location.reload();
    return response;
  });
};

ApiConnector.current(response => {
  if (response.success !== true) return;
  return ProfileWidget.showProfile(response.data);
});

const ratesBoard = new RatesBoard();

ratesBoard.getRates = function() {
  ApiConnector.getStocks(response => {
    if (response.success !== true) return;
    this.clearTable();
    this.fillTable(response.data);
  });
};

  ratesBoard.getRates();
  const refreshRatesTimer = setInterval(ratesBoard.getRates(), 60000);
