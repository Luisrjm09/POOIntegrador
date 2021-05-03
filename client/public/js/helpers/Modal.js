class Modal{
    openModal(idBtn){
        document.getElementById(idBtn).click();
    }
}

const ModalUI = new Modal();

module.exports = {ModalUI};