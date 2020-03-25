const express=require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000,(req,res)=>{
    console.log("Neighbor Hate Online - Port 3000")
})