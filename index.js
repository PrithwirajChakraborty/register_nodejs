const express =require ("express");
const cors =require("cors");
const mongoose =require("mongoose");

const app = express()
app.use(express.json())
// app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://user:123@cluster0.j6jrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "Not registered"})
        }
    })
}) 

app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "Already registerd"})
        } else {
            // res.send({message: "User is not register",name:name, email:email, password:password})
            const user = new User({
                name:name,
                email:email,
                password:password
            })
            user.save(
                (err,result)

            )
        }
    })
    
}) 

app.listen(4001,()=>{
    console.log("running on port 4001");
});