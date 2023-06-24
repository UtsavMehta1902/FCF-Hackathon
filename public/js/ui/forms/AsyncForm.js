/**
 * The AsyncForm class manages all the application forms
 * that should not be submitted with a page reload. Instead,
 * the data from such forms is collected and passed to the onSubmit
 * method for further processing.
 */
class AsyncForm {
  /**
   * If the provided element does not exist,
   * an error should be thrown.
   * Saves the provided element and registers events
   * using registerEvents().
   */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error('No such element');
    }
  }

  /**
   * Prevents form submission and calls the submit() method
   * at the moment of submission.
   */
  registerEvents() {
    this.element.addEventListener('submit', event => {
      event.preventDefault();
      this.submit();
    });
  }

  /**
   * Converts the form data into an object of the form:
   * {
   *   'form field 1 name': 'form field 1 value',
   *   'form field 2 name': 'form field 2 value',
   *   ...
   * }
   */
  getData() {
    const formData = new FormData(this.element);
    const entries = formData.entries();
    const data = {};
    for (let item of entries) {
      const key = item[0];
      const value = item[1];
      data[key] = value;
    }
    return data;
  }

  /**
   * Placeholder method to be overridden in the subclass.
   * Called when the form is submitted and receives the data
   * obtained from the getData() method.
   */
  onSubmit(options) {}

  /**
   * Calls the onSubmit method and passes the data obtained
   * from the getData() method.
   */
  submit() {
    let data = this.getData();
    this.onSubmit(data);
  }
}
