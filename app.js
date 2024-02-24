
const commander = require('commander')
const fs = require('fs')
const sendEmail = require('./services/sendEmail')

// create new Instance
const program = new commander.Command()

program
    .option("-t, --to <to>","recipient email address")
    .arguments("<files...>")
    .on("--help",()=>{
        console.log("")
        console.log("Examples:")
        console.log(
            " $cliShare -t recipientemail@gmail.com file1.txt file2.txt  "
        )
        console.log("")
    })

program.parse(process.argv)
const recipientEmail = program._optionValues.to
if(!recipientEmail){
    console.error("Error : Please provide the recipient email address. ")
    process.exit(1)
}
let files = []

for(let i = 0 ; i < program.args.length;i++){
    const fileName = program.args[i]
    const fileContent = fs.readFileSync(fileName)
    files.push(
        {
            filename : fileName,
           content :  fileContent
        }
    )
}

const data = {
    gmail : recipientEmail,
    subject : "File shared through clishare",
    message : 'This file is sent through clishare. Try it today : npm i -g clishare',
    files
}

sendEmail(data)
.then((res)=>{
    console.log("File sent successfully")
})
.catch((err)=>{
    console.log(err.message)
    process.exit(1)
})