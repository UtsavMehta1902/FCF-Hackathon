/**
 * The CreateAccountForm class manages the form
 * for creating a new account.
 */
class CreateAccountForm extends AsyncForm {
  /**
   * Creates an account using Account.create, closes
   * the window in case of success, and calls App.update()
   * as well as resets the form.
   */
  onSubmit(options) {
    Account.create(options, (err, response) => {
      if (response.success) {
        App.getModal('createAccount').close();
        this.element.reset();
        App.update();
        // console.log('New account added', this.element);
      }
    });
  }
}
