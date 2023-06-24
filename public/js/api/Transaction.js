/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
static URL = '/transaction';
static edit(data, callback) {
    //edit transaction in json db
    
    createRequest({
        url: this.URL + '/edit',
        method: 'PUT',
        data: data,
        callback: (err, response) => {
            callback(err, response);
        }
    });

}

}