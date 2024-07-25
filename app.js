const express = require('express');
const app = express();
const path = require('path')
const cookieparser = require('cookie-parser')
const db = require('./config/mongoose-connection')
const ownerRouter = require('./routers/ownerRouter')
const userRouter = require('./routers/userRouter')
const productRouter = require('./routers/productRouter')
const indexRoute = require('./routers/index');
const expressSession = require('express-session')
const flash = require('connect-flash')

require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieparser());

app.use(
    expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET,    
    })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}))


app.use("/", indexRoute);
app.use("/owners", ownerRouter)
app.use("/users", userRouter)
app.use("/products", productRouter)


app.listen(3000);
