/**
 * The TransactionsPage class manages the page for displaying
 * income and expenses of a specific account.
 */
class TransactionsPage {
  /**
   * If the provided element does not exist,
   * it throws an error.
   * Saves the provided element and registers events
   * through registerEvents().
   */
  constructor(element) {
    if (element) {
      this.element = element;
    } else {
      throw new Error('No such element');
    }
  }

  /**
   * Calls the render method to render the page.
   */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Listens for clicks on the transaction delete button
   * and the account delete button. Inside the handlers, use
   * the methods TransactionsPage.removeTransaction and
   * TransactionsPage.removeAccount respectively.
   */
  registerEvents() {
    let self = this;
    const accountRemove = this.element.querySelector('.remove-account');
    const transactionRemove = this.element.querySelectorAll('.transaction__remove');
    const transactionEdit = this.element.querySelectorAll('.transaction__edit');

    accountRemove.onclick = function () {
      self.removeAccount();
    };
    for (let i = 0; i < transactionRemove.length; i++) {
      transactionRemove[i].onclick = function (event) {
        self.removeTransaction(event.currentTarget.dataset.id);
      };
      transactionEdit[i].onclick = function (event) {
        self.editTransaction(event.currentTarget.dataset.id);
      };
    }
  }

  /**
   * Removes the account. It should display a confirmation dialog (using confirm()).
   * If the user agrees to delete the account, call
   * Account.remove and TransactionsPage.clear with
   * empty data to clear the page.
   * Upon successful deletion, call App.updateWidgets() and App.updateForms()
   * or update only the account widget and the income and expense creation forms
   * to update the application.
   */
  removeAccount() {
    if (this.lastOptions) {
      const question = confirm('Are you sure you want to delete this account?');
      if (question) {
        Account.remove({ id: this.lastOptions.account_id }, callback);
        this.clear();
        function callback(err, response) {
          if (response) {
            App.updateWidgets();
            App.updateForms();
          }
        }
      }
    }
  }

  /**
   * Removes the transaction (income or expense). Requires confirmation (using confirm()).
   * After deleting the transaction, call App.update()
   * or update the current page (update method) and the account widget.
   */
  removeTransaction(id) {
    const question = confirm('Are you sure you want to delete this transaction?');
    if (question) {
      Transaction.remove({ id: id }, callback);
      function callback(err, response) {
        if (response) {
          App.update();
        }
      }
    }
  }

  /**
   * Edits the transaction. It should open the editTransaction modal window
   * using App.getModal('editTransaction') and set the id using setId(id) method.
   * Then, render the accounts list using renderAccountsList() method
   * and open the modal window.
   */
  editTransaction(id) {
    App.getForm('editTransaction').setId(id);
    App.getForm('editTransaction').renderAccountsList();
    App.getModal('editTransaction').open();
  }

  /**
   * Retrieves the account name using Account.get() and displays it
   * using TransactionsPage.renderTitle().
   * Retrieves the Transaction.list and passes the received data
   * to TransactionsPage.renderTransactions().
   */
  render(options) {
    let self = this;
    if (options) {
      this.lastOptions = options;
      Account.get(this.lastOptions.account_id, callback);
      function callback(err, response) {
        if (response) {
          self.renderTitle(response.data.name);
        }
      }
      Transaction.list(options, callback1);
      function callback1(err, response) {
        if (response) {
          self.renderTransactions(response.data);
        }
      }
    }
  }

  /**
   * Clears the page. Calls TransactionsPage.renderTransactions()
   * with an empty array and sets the title to "Account name".
   */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Account name');
    this.lastOptions = null;
  }

  /**
   * Sets the title in the .content-title element.
   */
  renderTitle(name) {
    const title = this.element.querySelector('.content-title');
    title.textContent = name;
  }

  /**
   * Formats the date from "2019-03-10 03:20:41" (string) to "10 March 2019 at 03:20".
   */
  formatDate(date) {
    let currentDate = new Date();

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let weekday = weekdays[currentDate.getDay()];

    let day = currentDate.getDate();

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let month = months[currentDate.getMonth()];

    let year = currentDate.getFullYear();

    function addZero(i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }
    let hour = addZero(currentDate.getHours());
    let minutes = addZero(currentDate.getMinutes());

    return `${weekday} ${day} ${month} ${year} at ${hour}:${minutes}`;
  }

  /**
   * Generates the HTML code for a transaction (income or expense).
   * item - object containing transaction information.
   */
  getTransactionHTML(item) {
    return `
      <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum}<span class="currency">$</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>
          </button>
          <button class="btn btn-info transaction__edit" data-id="${item.id}">
            <i class="fa fa-edit"></i>
          </button>
        </div>
      </div>`;
  }

  /**
   * Renders the list of transactions on the page
   * using getTransactionHTML.
   */
  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    let transactions = '';
    for (let i in data) {
      transactions += this.getTransactionHTML(data[i]);
    }
    content.innerHTML = transactions;
    this.registerEvents();
  }
}
