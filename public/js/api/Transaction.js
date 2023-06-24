/*
    The Transaction class inherits from Entity.
    Manages user transactions.
    Has a URL property with the value '/transaction'.
*/
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