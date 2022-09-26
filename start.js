const fs = require("fs");
const child = require("child_process");

// console.log("checking for node_modules...");

// if (!fs.existsSync("./node_modules")) {
//     console.log("node_modules folder not detected.\nInstalling modules...");
//     child.execSync("npm install -d");
// }

// console.log("good.\nchecking for private folder and all files within");

// if (!fs.existsSync("./private")) {
//     console.log("private folder not detected. creating folder...");

//     fs.mkdirSync("private");
//     fs.writeFileSync("./private/config.json", "{\n\t\"Discord\" : {\n\t\t\"token\" : \"insert_token_here\",\n\t\t\"prefix\" : \"insert_prefix_here\",\n\t\t\"app_id\" : \"insert_app_id_here\",\n\t\t\"devs\" : [\"enter_dev_ids_here\"]}\n}");
// }
// finish later tbh

console.log(`Current running node version: ${child.execSync("node --version")}`);

console.log("deploying commands");
child.fork("./src/deploy-commands.js");

child.fork("./src/main.js");