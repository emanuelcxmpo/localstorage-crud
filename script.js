var selectRow = null;
var directory = [];

updateAfterPageRefresh();

function onSubmitForm() {
    if (validate()) {
        var formData = readForm();
        if (selectRow == null) {
            insertNewRecord(formData);
        }
        else {
            updateRecord(formData);
        }
        resetForm();
    }
}

function readForm() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["email"] = document.getElementById("email").value;
    formData["muni"] = document.getElementById("muni").value;
    formData["hood"] = document.getElementById("hood").value;
    formData["adr"] = document.getElementById("adr").value;
    return formData
}

function insertNewRecord(formData) {
    var table = document.getElementById("phoneDirectory").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = formData.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = formData.phone;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = formData.email;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = formData.muni;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = formData.hood;
    cell3 = newRow.insertCell(5);
    cell3.innerHTML = formData.adr;
    cell5 = newRow.insertCell(6);
    cell5.innerHTML = `<a onClick=editForm(this)>Editar</a><br><a onClick=deleteRecord(this)>Eliminar</a>`
    directory.push(formData);
    localStorage.setItem("directory", JSON.stringify(directory));
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("muni").value = "";
    document.getElementById("hood").value = "";
    document.getElementById("adr").value = "";
    selectRow = null;
}

function deleteRecord(a) {
    var row = a.parentElement.parentElement
    if (confirm("Estas seguro de eliminar esta fila")) {
        document.getElementById("phoneDirectory").deleteRow(row.rowIndex);
        directory.splice(row.rowIndex - 1, 1);
        localStorage.setItem("directory", JSON.stringify(directory));

    }
}

function editForm(a) {
    selectRow = a.parentElement.parentElement;
    document.getElementById("name").value = selectRow.cells[0].innerHTML;
    document.getElementById("phone").value = selectRow.cells[1].innerHTML;
    document.getElementById("email").value = selectRow.cells[2].innerHTML;
    document.getElementById("muni").value = selectRow.cells[3].innerHTML;
    document.getElementById("hood").value = selectRow.cells[4].innerHTML;
    document.getElementById("adr").value = selectRow.cells[5].innerHTML;
}

function updateRecord(formData) {
    selectRow.cells[0].innerHTML = formData.name;
    selectRow.cells[1].innerHTML = formData.phone;
    selectRow.cells[2].innerHTML = formData.email;
    selectRow.cells[3].innerHTML = formData.muni;
    selectRow.cells[4].innerHTML = formData.hood;
    selectRow.cells[5].innerHTML = formData.adr;
    directory.splice(selectRow.rowIndex - 1, 1, { name: formData.name, phone: formData.phone, email: formData.email, muni: formData.muni, hood: formData.hood, adr: formData.adr });
    localStorage.setItem("directory", JSON.stringify(directory));
}

function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("labelId").classList.remove("hide");
    } if (document.getElementById("phone").value == "") {
        isValid = false;
        document.getElementById("labelIdTwo").classList.remove("hide");
    } if (document.getElementById("phone").value == "") {
        isValid = false;
        document.getElementById("labelIdTre").classList.remove("hide");
    } if (document.getElementById("phone").value == "") {
        isValid = false;
        document.getElementById("labelIdFor").classList.remove("hide");
    } if (document.getElementById("phone").value == "") {
        isValid = false;
        document.getElementById("labelIdFive").classList.remove("hide");
    }
    else {
        isValid = true;
        if (!document.getElementById("labelId").classList.contains("hide")) {
            document.getElementById("labelId").classList.add("hide");
        }
    }
    return isValid;
}

function updateAfterPageRefresh() {
    if (localStorage.getItem("directory") == null) {
        console.log("No hay nada en el almacenamiento local.")
    }
    else {
        directory = JSON.parse(localStorage.getItem("directory"));
        for (let index = 0; index < directory.length; index++) {
            let nombre = directory[index].name;
            let telefono = directory[index].phone;
            let email = directory[index].email;
            let municipio = directory[index].muni;
            let barrio = directory[index].hood;
            let direccion = directory[index].adr;

            document.getElementById("tbody").innerHTML +=
                `<tr>
                <td>${nombre}</td>
                <td>${telefono}</td>
                <td>${email}</td>
                <td>${municipio}</td>
                <td>${barrio}</td>
                <td>${direccion}</td>
                <td><a onClick=editForm(this)>Editar</a><br><a onClick=deleteRecord(this)>Eliminar</a></td>
                </tr>`
        }
    }
}