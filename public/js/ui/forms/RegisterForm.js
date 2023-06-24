/**
 * The RegisterForm class manages the registration form.
 */

class RegisterForm extends AsyncForm {
  /**
   * Performs registration using User.register.
   * After successful registration, sets the state to App.setState('user-logged')
   * and closes the modal window containing the form.
   */
  onSubmit(options) {
    User.register(options, (error, response) => {
      if (response.success) {
        const registerForm = document.querySelector("#register-form");
        registerForm.reset();
        App.setState('user-logged');
        App.getModal('register').close();
      }
    });
  }
}
