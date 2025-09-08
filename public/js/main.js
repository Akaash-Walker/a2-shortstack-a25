// FRONT-END (CLIENT) JAVASCRIPT HERE

// deletes and redraws the table with new data
const updateTable = (newData) => {
    const table = document.querySelector("table")
    const tbody = table.querySelector("tbody")
    tbody.innerHTML = "";

    newData.forEach((row) => {
        const newRow = tbody.insertRow(-1)
        const nameCell = newRow.insertCell(0)
        const dobCell = newRow.insertCell(1)
        const ageCell = newRow.insertCell(2)

        nameCell.innerText = row.name
        dobCell.innerText = row.dob
        ageCell.innerText = row.age
    })
}

const submit = async function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const name = document.querySelector("#name").value
    const dob = document.querySelector("#dob").value

    if (!name || !dob) {
        alert("Please enter both name and date of birth.");
        return;
    }

    const body = JSON.stringify({name: name, dob: dob})

    const response = await fetch("/submit", {
        method: "POST",
        body
    })

    const tableData = await response.json()

    updateTable(tableData);
}

const deleteEntry = function (event) {
    event.preventDefault();

    const nameToDelete = document.querySelector("#deleteName").value;
    const dobToDelete = document.querySelector("#deleteDob").value;

    if (!nameToDelete || !dobToDelete) {
        alert("Please enter both name and date of birth to delete an entry.");
        return;
    }

    fetch("/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: nameToDelete, dob: dobToDelete})
    })
        .then(response => response.json())
        .then(updatedData => {
            updateTable(updatedData);
        });
}

const changeDob = (e) => {
    e.preventDefault();

    const lookupName = document.querySelector("#changeName").value;
    const newDob = document.querySelector("#changeDob").value;

    if (!lookupName || !newDob) {
        alert("Please enter both name and new date of birth to change an entry.");
        return;
    }

    fetch("/change", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: lookupName, dob: newDob})
    })
        .then(response => response.json())
        .then(updatedData => {
            updateTable(updatedData);
        });
}

const getData = async function () {
    const response = await fetch("/data", {
        method: "GET"
    })
    return response.json()
}


window.onload = function () {
    const button = document.querySelector("button");
    const deleteForm = document.getElementById("deleteForm");
    const changeForm = document.getElementById("changeForm");
    changeForm.onsubmit = changeDob;
    deleteForm.onsubmit = deleteEntry;
    button.onclick = submit;
    getData().then(response => {
        console.log(response)
        updateTable(response)
    });
}