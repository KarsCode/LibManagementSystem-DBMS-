import express from "express";
import registerRouter from "./routes/register.js"
import loginRouter from "./routes/login.js" 
import bookRouter from "./routes/books.js"
import borrowRouter from "./routes/borrow.js"
import borrowlistRouter from "./routes/borrowlist.js"
import finelistRouter from "./routes/finelist.js"
import returnRouter from "./routes/return.js"
import cors from "cors"
import CookieParser from 'cookie-parser'
import jwt from "jsonwebtoken"


const app = express();
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}));
app.use(CookieParser());
app.use(express.json()); // Middleware to parse JSON requests

// Use the register router for handling registration requests
app.use('/register', registerRouter);
app.use('/login', loginRouter)
app.use('/books',bookRouter)
app.use('/borrow',borrowRouter)
app.use('/borrowlist',borrowlistRouter)
app.use('/finelist',finelistRouter)
app.use('/return',returnRouter)


app.get('/profile', async (req,res) => {
  const {token} = req.cookies;
  if(token){
    jwt.verify(token,'LOGIN',{},(err,user)=>{
      if(err) throw err;
      res.json(user);
    });
  }else{
    res.json(null)
  }
});



// Start the server
app.listen(5555, () => {
  console.log('Server is running on port 5173');
});