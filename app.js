const express=require('express');
const mongoose=require('mongoose');
const Product=require('./models/Product');
const {render}=require('ejs');
const port = process.env.PORT || 3000;

//Express App
const app=express();
const dbURI="mongodb+srv://admin:admin1234@cluster0.6unm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//Connect with mongo.
mongoose.connect(dbURI,{
        useUnifiedTopology:true,useNewUrlParser:true}
    )
    .then((result)=>{
        app.listen(port);
    })
    .catch((err)=>{
        console.log(err);
    });

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

//Index Page - Login
app.get('/',(req,res)=>{
    Product.find()
    .then((result)=>{
        console.log(result);
        res.render('dashboard',{productlist:result});
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.get('/ProductDetails/:id',(req,res)=>{
    const productid=req.params.id;
    Product.findById(productid)
    .then((result)=>{
        console.log(result);
        res.render('ProductDetails',{productdetails:result});
    })
    .catch((err)=>{
        console.log(err);
    })
});




