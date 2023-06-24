/**
 * The UserWidget class is responsible for displaying
 * user information after login or logout.
 */

class UserWidget {
  /**
   * Sets the received element to the element property.
   * If the passed element does not exist, throw an error.
   */
  constructor(element) {
    if (!element) {
      throw new Error('No such element');
    }
    this.element = element;
  }

  /**
   * Retrieves information about the current user using User.current().
   * If the user is logged in, sets the name of the logged-in user
   * in the .user-name element.
   */
  update() {
    const user = User.current();
    if (!user) {
      return;
    } else {
      const userName = this.element.querySelector('.user-name');
      userName.textContent = user.name;
    }
  }
}
