const months = [
    '',
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]

function getActualDate(){
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    return {
        stringDate:`${day}-${months[month]}-${year}`,
        dateJS:today,
        numberDate:{
            day,
            month,
            year
        }
    }
}

module.exports = {
    getActualDate,
    months
}