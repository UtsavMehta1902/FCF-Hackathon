/*
The Entity class is a base class for server interactions.
It has a URL property that is initialized with an empty string.
*/
 class Entity {
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
      createRequest({
        url: this.URL,
        method: 'GET',
        callback: callback,
        data: data,
      });
  }

  /*
    Requests a list of data from the server.
    It can be accounts or incomes/expenses
    (depending on what is inherited from Entity).
  */
  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: 'PUT',
      callback: callback,
      data: data,
    });
  }

  /*
    Deletes information about an account or income/expense
    (depending on what is inherited from Entity).
  */
  static remove(data, callback ) {
    createRequest({
      url: this.URL,
      method: 'DELETE',
      callback: callback,
      data: data,
    });
  }
}
