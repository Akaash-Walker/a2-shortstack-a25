const http = require("http"),
    fs = require("fs"),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you"re testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.
    mime = require("mime"),
    dir = "public/",
    port = 3000

let appdata = [];

const server = http.createServer(function (request, response) {
    if (request.method === "GET") {
        handleGet(request, response)
    } else if (request.method === "POST") {
        handlePost(request, response)
    }
})

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1)

    if (request.url === "/") {
        sendFile(response, "public/index.html")
    } else if (request.url === "/data") {
        response.writeHead(200, "OK", {"Content-Type": "application/json"});
        response.end(JSON.stringify(appdata));
    } else {
        sendFile(response, filename)
    }
}

const handlePost = function (request, response) {
    if (request.url === "/submit") {
        let dataString = ""

        request.on("data", function (data) {
            dataString += data
        })

        request.on("end", function () {
            // convert the data string into a JSON object
            const parsedData = JSON.parse(dataString)

            // calculate age from dob and add it to the parsedData object
            parsedData.age = calculateAge(parsedData.dob)

            // store the parsedData object in the appdata array
            appdata.push(parsedData);
            console.log(appdata);



            response.writeHead(200, "OK", {"Content-Type": "text/plain"})
            response.end(JSON.stringify(appdata))
        })
    } else if (request.url === "/delete") {
        let dataString = "";

        request.on("data", function (data) {
            dataString += data;
        });

        request.on("end", function () {
            const parsedData = JSON.parse(dataString);
            const nameToDelete = parsedData.name;
            const dobToDelete = parsedData.dob;

            appdata = appdata.filter(entry => !(entry.name.toLowerCase() === nameToDelete.toLowerCase() && entry.dob === dobToDelete));
            console.log(appdata);

            response.writeHead(200, "OK", {"Content-Type": "text/plain"});
            response.end(JSON.stringify(appdata));
        });
    } else if (request.url === "/change") {
        let dataString = "";

        request.on("data", function (data) {
            dataString += data;
        });

        request.on("end", function () {
            const parsedData = JSON.parse(dataString);
            const lookupName = parsedData.name;
            const newDob = parsedData.dob;

            appdata = appdata.map(entry => {
                if (entry.name.toLowerCase() === lookupName.toLowerCase()) {
                    entry.dob = newDob;
                    entry.age = calculateAge(newDob);
                }
                return entry;
            });
            console.log(appdata);

            response.writeHead(200, "OK", {"Content-Type": "text/plain"});
            response.end(JSON.stringify(appdata));
        });
    }
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename)

    fs.readFile(filename, function (err, content) {

        // if the error = null, then we"ve loaded the file successfully
        if (err === null) {

            // status code: https://httpstatuses.com
            response.writeHeader(200, {"Content-Type": type})
            response.end(content)

        } else {

            // file not found, error code 404
            response.writeHeader(404)
            response.end("404 Error: File Not Found")

        }
    })
}

server.listen(process.env.PORT || port)
