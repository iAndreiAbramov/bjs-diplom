'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function() {

  const data = userForm.getData(this.loginForm);
  
    ApiConnector.login(data, response => {
      if (response.success !== true) return this.setLoginErrorMessage(response.error);
      location.reload();
      return response;
    });
};

userForm.registerFormCallback = function() {

  const data = userForm.getData(this.registerForm);
  
  ApiConnector.register(data, response => {
    if (response.success !== true) return this.setRegisterErrorMessage(response.error);
    location.reload();
    return response;
  });
};

