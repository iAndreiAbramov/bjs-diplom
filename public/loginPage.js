'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function() {

  const data = userForm.getData(this.loginForm);
  console.log(data);

  try {
    ApiConnector.login(data, response => response);
    location.reload();
  } catch(error) {
    throw new Error('Ошибка авторизации');
  }

};

userForm.registerFormCallback = function() {
  
  const data = userForm.getData(this.registerForm);
  console.log(data);
  
  try {
    ApiConnector.register(data, response => response);
  } catch(error) {
    throw new Error('Запрос на регистрацию отклонен сервером');
  }

};

