const mongoose = require("mongoose");
const Chat = require("./models/schema.js");

main()
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err)
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

let documents = [
    {
        from: "faishal",
        to: "safeeq",
        message: "hi hello how are you",
        created_at: new Date()
    },
    {
       from: "vishal",
       to: "aman",
       message: "kab chalega jammu", 
       created_at: new Date()
    },
    {
        from: "faheem",
        to: "kapil",
        message: "girls hostel chlna hai kya wo bula rahi hai sab",
        created_at: new Date(),
    }
];

Chat.insertMany(documents)
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});
