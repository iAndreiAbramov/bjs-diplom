'use strict'

const logout = new LogoutButton();

logout.action = () => {
  ApiConnector.logout(response => {
    console.log(response);
    if (response.success !== true) return;
    location.reload();
    return response;
  });
};