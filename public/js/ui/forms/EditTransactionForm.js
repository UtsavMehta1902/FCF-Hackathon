/**
 * The EditTransactionForm class extends the AsyncForm class and manages the form for editing transactions.
 */
class EditTransactionForm extends AsyncForm {
    id = "";
  
    /**
     * Initializes the EditTransactionForm instance.
     * Sets the element and renders the accounts list.
     */
    constructor(element) {
      super(element);
      this.element = element;
      this.renderAccountsList();
    }
  
    /**
     * Renders the accounts list.
     * If the user is not logged in, returns.
     * Otherwise, retrieves the accounts list using Account.list and renders the options in the select element.
     */
    renderAccountsList() {
      if (!User.current()) {
        return;
      } else {
        Account.list(User.current(), (error, response) => {
          console.log("Here\n\n\n", response);
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
     * Submits the form data.
     * Sets the transaction ID from the form data.
     * Calls Transaction.edit to edit the transaction.
     * Defines a callback function that closes the edit transaction modal and updates the application.
     */
    onSubmit(data) {
      data.id = this.id;
      Transaction.edit(data, callback);
  
      function callback(err, response) {
        if (response) {
          App.getModal('editTransaction').close();
          App.update();
        }
      }
    }
  
    /**
     * Sets the transaction ID.
     * @param {string} id - The transaction ID to set.
     * @returns {EditTransactionForm} The EditTransactionForm instance.
     */
    setId(id) {
      this.id = id;
      return this;
    }
  }
  