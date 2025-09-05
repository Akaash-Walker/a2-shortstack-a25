// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const name = document.querySelector("#name").value
    const dob = document.querySelector("#dob").value

    // calculation should be done on the server
    const calculatedAge = ( dob ) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const body = JSON.stringify( { name: name, dob: dob, age: calculatedAge(dob) } )

    const response = await fetch( "/submit", {
        method:"POST",
        body
    })

    const text = await response.text()

    console.log( "text:", text )
}

const fetchTable = async () => {
    const response = await fetch( "/table")
    const data = await response.json()

    console.log( "data:", data )

    let table = "<table><tr><th>Name</th><th>DOB</th></tr>"

    for( let i=0; i<data.length; i++ ) {
        const entry = JSON.parse( data[i] )
        table += `<tr><td>${entry.name}</td><td>${entry.dob}</td></tr>`
    }

    table += "</table>"

    document.querySelector("#tableBody").innerHTML = table
}

window.onload = function() {
    const button = document.querySelector("button");
    button.onclick = submit;
}