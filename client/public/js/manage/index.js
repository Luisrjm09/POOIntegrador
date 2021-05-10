const UI = require('../helpers/UI');
const { getActualDate } = require('../helpers/date');
const ManageUI = require('../helpers/Manage');
const { formatMoney } = require('../helpers/numbers');

const today = getActualDate();

async function initialLoad(){
    await ManageUI.getMoves();
    
    const [income,expenses] = ManageUI.calculateMoney();
    
    ManageUI.printManage(formatMoney.format(income),'income');
    ManageUI.printManage(formatMoney.format(expenses),'expenses');
    
    const cashRegister = income - expenses;
    ManageUI.printManage(formatMoney.format(cashRegister),'cashRegister');
}

initialLoad();

document.getElementById('actualDate').innerHTML = today.stringDate;