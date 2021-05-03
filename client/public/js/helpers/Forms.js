class Forms{
    setData(data){
        data.map(input=>{
            const idInput = Object.keys(input)[0];
            document.getElementById(idInput).value = input[idInput];
        })
    }

    setSelect(options,idInsert,valueName,valueText,selectedDB){
        let htmlOptions = ``;

        options.map(option=>{
            console.log()
            htmlOptions+= `<option ${option[valueName]===selectedDB ? 'selected = "true"' : '' } 
            value="${option[valueName]}">${option[valueText]}</option>`;
        });

        document.getElementById(idInsert).innerHTML = htmlOptions;
    }
}

const Form = new Forms();

module.exports = {Form};