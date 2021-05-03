const sa2 = require('sweetalert2');

class Alerts {
    deleteSuccess(message, idRow) {
        sa2.fire({
            title: message,
            icon: 'success'
        }).then(result => {
            if (result.isConfirmed) {
                document.getElementById(idRow).remove();
            }
        })
    }
}

const Alert = new Alerts();

module.exports = { Alert };