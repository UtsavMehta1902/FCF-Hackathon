/**
 * The LoginForm class manages the login form.
 */

class LoginForm extends AsyncForm {
  /**
   * Performs login using User.login.
   * After successful login, resets the form,
   * sets the state to App.setState('user-logged'),
   * and closes the modal window containing the form.
   */
  onSubmit(options) {
    User.login(options, (error, response) => {
      if (response.success) {
        const loginForm = document.querySelector("#login-form");
        loginForm.reset();
        App.setState('user-logged');
        App.getModal('login').close();
      }
    });
  }
}
