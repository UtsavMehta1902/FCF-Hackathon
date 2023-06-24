/**
 * The AccountsWidget class manages the display of accounts in the sidebar column.
 */

class AccountsWidget {
  /**
   * Sets the current element to the element property.
   * Registers event handlers using AccountsWidget.registerEvents().
   * Calls AccountsWidget.update() to retrieve the list of accounts and display them.
   * If the passed element does not exist, throw an error.
   */
  constructor(element) {
    if (!element) {
      throw new Error('No such element');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * When clicking on .create-account, opens the #modal-new-account window
   * to create a new account.
   * When clicking on one of the existing accounts
   * (displayed in the sidebar column),
   * calls AccountsWidget.onSelectAccount()
   */
  registerEvents() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.pull-right')) {
        const modal = App.getModal('createAccount');
        modal.open();
      } else if (e.target.closest('.account')) {
        this.onSelectAccount(e.target.closest('.account'));
      }
    });
  }

  /**
   * This method is only available to authenticated users (User.current()).
   * If the user is authenticated, it needs to
   * retrieve the list of accounts through Account.list(). Upon
   * successful response, it needs to clear the previously displayed accounts list
   * through AccountsWidget.clear().
   * Displays the list of retrieved accounts using
   * the renderItem() method.
   */
  update() {
    if (!User.current()) {
      return;
    }
    Account.list(User.current(), (err, response) => {
      if (err) {
        return;
      }
      if (!response.data) {
        return;
      }
      this.clear();
      response.data.forEach((item) => {
        this.renderItem(item);
      });
    });
  }

  /**
   * Clears the previously displayed accounts list.
   * To do this, all .account elements in the sidebar column
   * need to be removed.
   */
  clear() {
    [...this.element.querySelectorAll('.account')].forEach((item) => item.remove());
  }

  /**
   * Triggers when an account is selected.
   * Adds the .active class to the currently selected account element.
   * Removes the .active class from the previously selected account element.
   * Calls App.showPage('transactions', { account_id: account_id }) to show the transactions page.
   */
  onSelectAccount(element) {
    if (this.element.querySelector('.active')) {
      this.element.querySelector('.active').classList.remove('active');
    }
    element.closest('.account').classList.add('active');
    App.showPage('transactions', { account_id: element.closest('.account').dataset.id });
  }

  /**
   * Returns the HTML code for an account to be displayed
   * in the sidebar column.
   * item - object with account data
   */
  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
          <a href="#">
              ${item.name} / ${item.sum} $
          </a>
      </li>
    `;
  }

  /**
   * Gets an array with account information.
   * Displays the HTML code of the account item received
   * with AccountsWidget.getAccountHTML method
   * and appends it inside the widget element.
   */
  renderItem(item) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
  }
}
