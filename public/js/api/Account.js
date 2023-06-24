/**
The Account class inherits from Entity.
Manages user accounts.
Has a URL property with the value '/account'.
*/

class Account extends Entity {

  static URL = '/account';
  /**
    Retrieves information about the account.
  */

   static get(id = '', callback){
    createRequest({
      url: this.URL + '/' + id,
      method: 'GET',
      callback: callback,
    });
  }
}
