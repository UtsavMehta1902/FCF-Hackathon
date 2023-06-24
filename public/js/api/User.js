/*
  The User class manages user authentication, logout, and registration within the application.
  It has a URL property that is initialized with the value '/user'.
*/
class User {
  /*
    Sets the current user in the local storage.
  */
  static URL = "/user";

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }
  /*
    Removes information about the authenticated user from the local storage.
  */
  static unsetCurrent() {
    delete localStorage.user;
  }
  /*
    Returns the current authenticated user from the local storage.
  */
  static current() {

    if (!localStorage.user) {
      return undefined;
    }
    else {
      return JSON.parse(localStorage.user);
    }
  }
  /*
    Retrieves information about the current authenticated user.
  */

  static fetch(callback ) {

    let options = {
      url: this.URL + '/' + 'current',
      responseType: 'JSON',
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } else if (response.success === false) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    };
    return createRequest(options);
}

  /*
    Attempts to authenticate the user.
    After successful authentication, the user should be saved using the User.setCurrent method.
  */
   static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        } 
        callback(err, response);
        if (response.success === false) {
          Swal.fire('Wrong login or password.');
        }
      }
    });
  }
  
  /*
    Attempts to register a user.
    After successful registration, the user should be saved using the User.setCurrent method.
  */
   static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (err === null && response.success) {
          this.setCurrent(response.user);
          callback(err, response);
        } else {
          Swal.fire('User already exists');
        }
      }
    }); 
  }

  /*
    Logs out of the application. After successful logout, the User.unsetCurrent method should be called.
  */
  static logout(data, callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.success) {
          User.unsetCurrent();
          Swal.fire('See you later!');

        }
        callback(err, response);
      }
    });
  }
}




