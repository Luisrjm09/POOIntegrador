const UI = require('../helpers/UI');
const { getActualDate } = require('../helpers/date');
const ManageUI = require('../helpers/Manage');
const { formatMoney } = require('../helpers/numbers');
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

document.getElementById('btnGenerateReport').addEventListener('click',()=>{
    /* pdfMake.vfs = pdfFonts.pdfMake.vfs; */

    const htmlStructure = {
        content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
    }

    pdfMake.createPdf(htmlStructure).download();
})