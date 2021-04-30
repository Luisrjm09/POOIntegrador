const {URL_CLIENT} = require('../config');

/* ------------------------- [CREATE MENU FOR EACH SCREEN] --------------- */

const menu = document.getElementById('menu');

/* 1- Class name of fontawesome
2- Text to display when the mouse hovers the menu */
class ItemMenu{
    constructor(icon,text,link){
        this.icon = icon;
        this.text = text;
        this.link = link;
    }

    createItem(){

        const linkElement = document.createElement('A');

        linkElement.setAttribute('href',`${URL_CLIENT}${this.link}`);

        const htmlElement = document.createElement('DIV');

        linkElement.appendChild(htmlElement);

        const iconElement = document.createElement('I');
        iconElement.className = this.icon;

        htmlElement.appendChild(iconElement);

        document.getElementById('menu').appendChild(linkElement);
    }
}

menu.addEventListener('mouseenter',(e)=>{
    menu.style.width = "35%";
    const itemsMenu = menu.querySelectorAll('DIV');

    const textMenu = ['Clientes','Tickets','Servicios','Inventario','Gestion'];

    itemsMenu.forEach((item,i)=>{
        const text = document.createElement('SPAN');
        text.innerText = textMenu[i];
        item.appendChild(text);
    })
});

menu.addEventListener('mouseleave',()=>{
    menu.style.width = "10%";
    const itemsMenu = menu.querySelectorAll('SPAN');
    
    itemsMenu.forEach(item=>{
        item.innerText = '';
    })
})

const ClientItem = new ItemMenu('fas fa-address-book','Clientes','clientes.html');
ClientItem.createItem();

const TicketsItem = new ItemMenu('rotate-l90 fas fa-ticket-alt', 'Tickets','tickets.html');
TicketsItem.createItem();

const ManagmentItem = new ItemMenu('fas fa-dollar-sign','Gestion','servicios.html');
ManagmentItem.createItem();

const InventoryItem = new ItemMenu('fas fa-boxes','Inventario','inventario.html');
InventoryItem.createItem();

const ServicesItem = new ItemMenu('fas fa-wrench','Servicios','gestion.html');
ServicesItem.createItem();

// ----------------------------------------------------------------------
class Table{

    // A JSON WITH THE DATA
    constructor(data){
        this.data = data;
    }

    createRow(idBody){
        this.data.map((info,i)=>{
            const htmlElement = document.createElement('TR');
            htmlElement.setAttribute("id",info.id);
            htmlElement.setAttribute("value",JSON.stringify(info));
            
            const columnsData = Object.keys(info).length;
            
            for(let j=0;j<columnsData;j++){
                const dataCell = document.createElement('TD');
                dataCell.innerText = info[Object.keys(info)[j]];
                htmlElement.appendChild(dataCell);
            }
            
            document.getElementById(idBody).appendChild(htmlElement);
        })
    }

    addActions(body,icons){
        const bodyID = document.getElementById(body);
        const rows = bodyID.querySelectorAll('tr');

        for(let i=0;i<rows.length;i++){
            const htmlElement = document.createElement('TD');
            htmlElement.className = `d-flex justify-content-around`;
            for(let j=0;j<icons.length;j++){
                const icon = document.createElement('I');
                icon.className = `${icons[j]} cursor-pointer`;
                htmlElement.appendChild(icon);
            }
            rows[i].appendChild(htmlElement);
        }
    }

}

module.exports = {Table};