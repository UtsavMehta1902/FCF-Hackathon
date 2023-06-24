const body = document.getElementsByTagName("body");

/**
 * The Sidebar class handles the functionality of the sidebar:
 * toggling the visibility of the sidebar in the mobile version of the website
 * and managing menu buttons.
 */
class Sidebar {
  /**
   * Initializes the sidebar by invoking initAuthLinks and initToggleButton.
   */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Handles the toggling of the sidebar:
   * toggles two classes for the body element: sidebar-open and sidebar-collapse
   * when the .sidebar-toggle button is clicked.
   */
  static initToggleButton() {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    sidebarToggle.addEventListener("click", () => {
      body[0].classList.toggle("sidebar-open");
      body[0].classList.toggle("sidebar-collapse");
    });
  }

  /**
   * Handles the functionality of authentication links:
   * - Displays the login window when the login button is clicked
   *   (using App.getModal)
   * - Displays the registration window when the register button is clicked
   * - Calls User.logout and sets App.setState('init') upon successful logout.
   */
  static initAuthLinks() {
    const registerButton = document.getElementsByClassName("menu-item_register");
    registerButton[0].addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });

    const loginButton = document.getElementsByClassName("menu-item_login");
    loginButton[0].addEventListener("click", (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });

    const logOutButton = document.getElementsByClassName("menu-item_logout");
    logOutButton[0].addEventListener("click", () => {
      User.logout(User.current(), (err, response) => {
        if (response && response.success) {
          App.setState('init');
        }
      });
    });
  }
}
