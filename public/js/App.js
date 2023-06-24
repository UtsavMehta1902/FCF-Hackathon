/**
 * The App class manages the entire application.
 */
class App {
  /**
   * Initializes the application.
   * Performs the initial setup of pages, forms, modals, widgets, and the sidebar.
   */
  static init() {
    this.element = document.querySelector(".app");
    this.content = document.querySelector(".content-wrapper");

    this.initPages();
    this.initForms();
    this.initModals();
    this.initWidgets();

    Sidebar.init();

    this.initUser();
  }

  /**
   * Initializes the user.
   * Retrieves information about the current user using User.fetch().
   * If the user is logged in, sets the state to 'user-logged'.
   * If the user is not logged in, sets the state to 'init'.
   */
  static initUser() {
    User.fetch(() => this.setState(User.current() ? "user-logged" : "init"));
  }

  /**
   * Initializes the transactions page.
   */
  static initPages() {
    this.pages = {
      transactions: new TransactionsPage(this.content),
    };
  }

  /**
   * Initializes the modals.
   */
  static initModals() {
    this.modals = {
      register: new Modal(document.querySelector("#modal-register")),
      login: new Modal(document.querySelector("#modal-login")),
      createAccount: new Modal(document.querySelector("#modal-new-account")),
      newIncome: new Modal(document.querySelector("#modal-new-income")),
      newExpense: new Modal(document.querySelector("#modal-new-expense")),
      editTransaction: new Modal(document.querySelector("#modal-edit-transaction")),
    };
  }

  /**
   * Initializes the widgets.
   */
  static initWidgets() {
    this.widgets = {
      accounts: new AccountsWidget(document.querySelector(".accounts-panel")),
      transactions: new TransactionsWidget(document.querySelector(".transactions-panel")),
      user: new UserWidget(document.querySelector(".user-panel")),
    };
  }

  /**
   * Initializes the forms.
   */
  static initForms() {
    this.forms = {
      login: new LoginForm(document.querySelector("#login-form")),
      register: new RegisterForm(document.querySelector("#register-form")),
      createAccount: new CreateAccountForm(document.querySelector("#new-account-form")),
      createIncome: new CreateTransactionForm(document.querySelector("#new-income-form")),
      createExpense: new CreateTransactionForm(document.querySelector("#new-expense-form")),
      editTransaction: new EditTransactionForm(document.querySelector("#edit-transaction-form")),
    };
  }

  /**
   * Returns the modal by name.
   * @param {string} modalName - The name of the modal.
   * @returns {Modal} The modal instance.
   */
  static getModal(modalName) {
    return this.modals[modalName];
  }

  /**
   * Returns the page by name.
   * @param {string} pageName - The name of the page.
   * @returns {Page} The page instance.
   */
  static getPage(pageName) {
    return this.pages[pageName];
  }

  /**
   * Returns the widget by name.
   * @param {string} widgetName - The name of the widget.
   * @returns {Widget} The widget instance.
   */
  static getWidget(widgetName) {
    return this.widgets[widgetName];
  }

  /**
   * Returns the form by name.
   * @param {string} formName - The name of the form.
   * @returns {Form} The form instance.
   */
  static getForm(formName) {
    return this.forms[formName];
  }

  /**
   * Shows the specified page with options.
   * Retrieves the page using getPage and calls its render method with the options object.
   * @param {string} pageName - The name of the page.
   * @param {object} options - The options object to pass to the page's render method.
   */
  static showPage(pageName, options) {
    const page = this.getPage(pageName);
    page.render(options);
  }

  /**
   * Sets the state of the application.
   * Updates the class of the App.element to "app_${state}".
   * Removes the old class if a state was already set.
   * If the state is 'user-logged', calls the update method.
   * If the state is 'init', calls the clear method.
   * @param {string} state - The state to set.
   */
  static setState(state) {
    if (this.state) {
      this.element.classList.remove(`app_${this.state}`);
    }
    this.element.classList.add(`app_${state}`);
    this.state = state;

    if (state === "user-logged") {
      this.update();
    }
    if (state === "init") {
      this.clear();
    }
  }

  /**
   * Clears the pages.
   * Calls the clear method of the transactions page obtained through getPage.
   */
  static clear() {
    this.getPage("transactions").clear();
  }

  /**
   * Updates the widgets and page content.
   * Calls the updateWidgets, updatePages, and updateForms methods.
   */
  static update() {
    this.updateWidgets();
    this.updatePages();
    this.updateForms();
  }

  /**
   * Updates the pages.
   * Calls the update method of the transactions page obtained through getPage.
   */
  static updatePages() {
    this.getPage("transactions").update();
  }

  /**
   * Updates the widgets.
   * Calls the update method of the accounts and user widgets obtained through getWidget.
   */
  static updateWidgets() {
    this.getWidget("accounts").update();
    this.getWidget("user").update();
  }

  /**
   * Updates the forms.
   * Calls the renderAccountsList method of the createIncome, createExpense, and editTransaction forms obtained through getForm.
   */
  static updateForms() {
    this.getForm("createIncome").renderAccountsList();
    this.getForm("createExpense").renderAccountsList();
    this.getForm("editTransaction").renderAccountsList();
  }
}
