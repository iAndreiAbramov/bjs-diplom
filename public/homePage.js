'use strict'

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

