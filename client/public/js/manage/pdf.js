console.log(121312);
import { jsPDF } from "jspdf";

const doc = new jsPDF();


doc.text("Hello world!", 10, 10);
doc.save("a4.pdf");

document.getElementById('btnGenerateReport').addEventListener('click',()=>{
    alert(123);
    console.log(`Generating report...`);
    pdf.text('pdf on browser',10,10);
    pdf.save("reporte_123.pdf");
});