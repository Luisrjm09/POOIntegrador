const UI = require('../helpers/UI');
const { getActualDate } = require('../helpers/date');
const ManageUI = require('../helpers/Manage');
const { formatMoney } = require('../helpers/numbers');

const today = getActualDate();

async function initialLoad(){
    await ManageUI.getMoves();
    
    let [income,expenses,cashRegister] = ManageUI.calculateMoney();
    
    ManageUI.printManage(formatMoney.format(income),'income');
    ManageUI.printManage(formatMoney.format(expenses),'expenses');

    console.log(income,expenses);
    
    cashRegister = (income - expenses)+cashRegister;
    ManageUI.printManage(formatMoney.format(cashRegister),'cashRegister');
}

initialLoad();

document.getElementById('actualDate').innerHTML = today.stringDate;