class EditTransactionForm extends AsyncForm {
    id = "";

    constructor(element) {
        super(element);
        this.element = element;
        this.renderAccountsList();
      }
    
  renderAccountsList() {
    if (!User.current()) {
      return;
    } else
      Account.list(User.current(), (e, response) => {
        console.log("herer\n\n\n",response);
    if (response.success) {
      const select = this.element.querySelector(".accounts-select");
    //   console.log(this.element.innerHTML);
      console.log(select.innerHTML);
      select.innerHTML = '';
      response.data.forEach(element => {
        // console.log(`<option value="${element.id}">${element.name}</option>`);
      select.insertAdjacentHTML("beforeend", `<option value="${element.id}">${element.name}</option>`);
      
      });
    //   console.log(this.element.innerHTML);
    }})}


    onSubmit(data) {
        data.id = this.id;
    Transaction.edit(data, callback);
    function callback(err, response) {
      if (response) {
        
        App.getModal('editTransaction').close();
        App.update();
      }
    }
  }
    setId(id){
        this.id = id;
        return this;
    }
}