'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function() {

  const data = userForm.getData(this.loginForm);
  
    ApiConnector.login(data, response => {
      if (response.success !== true) return this.setLoginErrorMessage('Ошибка авторизации');
      location.reload();
      return response;
    });
};

userForm.registerFormCallback = function() {

  const data = userForm.getData(this.loginForm);
  
  ApiConnector.register(data, response => {
    if (response.success !== true) return this.setRegisterErrorMessage('Ошибка регистрации');
    location.reload();
    return response;
  });
};

