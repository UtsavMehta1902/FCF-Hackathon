/**
 * The CreateTransactionForm class manages the form
 * for creating a new transaction.
 */
class CreateTransactionForm extends AsyncForm {
  /**
   * Calls the parent constructor and
   * the renderAccountsList method.
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Retrieves the list of accounts using Account.list
   * and updates the dropdown list in the modal form.
   */
  renderAccountsList() {
    if (!User.current()) {
      return;
    } else {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          const select = this.element.querySelector(".accounts-select");
          select.innerHTML = '';
          response.data.forEach(element => {
            select.insertAdjacentHTML("beforeend", `<option value="${element.id}">${element.name}</option>`);
          });
        }
      });
    }
  }

  /**
   * Creates a new transaction (expense or income)
   * using Transaction.create. Upon success, it calls
   * App.update(), resets the form, and closes the modal window.
   */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.getModal('newExpense').close();
        App.getModal('newIncome').close();
        App.update();
      }
    });
  }
}
