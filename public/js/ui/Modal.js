// Modal class
 class Modal {

  constructor(element){
    if (element === undefined) {
      throw new Error('No such an element');
    }
    this.element = element;
    this.registerEvents();
  }

  /**

  When clicking on an element with data-dismiss="modal",
  it should close the current modal window
  (using the Modal.onClose method)
  */

  registerEvents() {
    const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    for (let i =0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener('click', () => this.onClose());
    }

    // Add possibility to close modal by clicking outside of modal and pressing escape button
    const closeModal = Array.from(document.querySelectorAll('.modal'));

    closeModal.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.close();
          }
        });
      document.addEventListener('keydown', (e) => {
          if (e.code === 'Escape') {
            this.close();
        }
      });
    });
  }

  /**

  Triggered after clicking on elements that close the modal.
  Closes the current modal (Modal.close())
  */

  onClose() {
    this.close(); 
  }


  /**
  Opens the modal: sets the CSS property display
  with the value "block"
  */

  open() {
    this.element.style = 'display: block';
  }

  /**

  Closes the modal: removes the CSS property display
  */

  close(){
    this.element.style = 'display: none';
  }
}