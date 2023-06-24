/**
 * The TransactionsWidget class is responsible for
 * opening pop-up windows for creating new income or expense.
 */

class TransactionsWidget {
  /**
   * Sets the received element to the element property.
   * If the passed element does not exist, throw an error.
   */
  constructor(element) {
    if (!element) {
      throw new Error('No such element');
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Registers click event handlers for the "New Income" and "New Expense" buttons.
   * When clicked, calls Modal.open() for the corresponding modal window.
   */
  registerEvents() {
    const createIncomeButton = this.element.querySelector('.create-income-button');
    const createExpenseButton = this.element.querySelector('.create-expense-button');
    const newIncome = App.getModal('newIncome');
    const newExpense = App.getModal('newExpense');

    createIncomeButton.addEventListener('click', () => newIncome.open());
    createExpenseButton.addEventListener('click', () => newExpense.open());
  }
}
