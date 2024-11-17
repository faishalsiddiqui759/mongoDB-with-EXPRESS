const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/schema.js");
const methodOverride = require("method-override");


main()
.then((res)=>{
    console.log();
})
.catch((err)=>{
    console.log(err);
});

async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.listen(8080, ()=>{
    console.log("app is listening on port 8080");
});

app.get("/chats", async (req, res)=>{
   let chats = await Chat.find();
   res.render("index.ejs", {chats});
});

app.get("/chats/new",(req, res)=>{
    res.render("add.ejs");
});

app.post("/chats", (req, res)=>{
    let {from, to, message} = req.body;
    let chat1 = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    chat1.save()
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async(req, res)=>{
    let {id} = req.params;
   let chat = await Chat.findById(id);
   res.render("edit.ejs", {chat});
});

app.put("/chats/:id", async(req, res)=>{
    let {id} = req.params;
    let { message: newMessage } = req.body;
    let updatedMessage = await Chat.findByIdAndUpdate(id, {message: newMessage}, {runValidators: true, new: true});

    console.log(updatedMessage);
    res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id); 
    console.log(deletedChat);
    res.redirect("/chats");
});