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
    querySuccess(message){
        sa2.fire({
            title:message,
            icon:'success'
        }).then(result=>{
            {result.isConfirmed ? window.location.reload(true) : null;}
        });
    }

    querySuccesRedirect(message,url){
        sa2.fire({
            title:message,
            icon:'success'
        }).then(result=>{
            {result.isConfirmed ? window.location.href = url : null;}
        });
    }

    queryError(message){
        sa2.fire({
            title:message,
            icon:'error'
        });
    }
}

const Alert = new Alerts();

module.exports = { Alert };