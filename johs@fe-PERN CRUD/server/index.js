const express = require('express');
const app = express();

const cors = require("cors");
const pool = require("./database")


//middleware
app.use(express.json());//req.body
app.use(cors());



//ROUTES

//creating a new contact
    app.post('/contact' ,async (req,res) => {
    try {

        const { yourName , email, contact } = req.body
        
        const user = await pool.query("SELECT * FROM my_user WHERE  user_email = $1",[
            email
        ]);        
        if(user.rows.length !==0){
            return res.status(401).json("User already exists")
        }

        const newContact = await pool.query(
            "INSERT INTO my_user ( user_name, user_email, user_contact) VALUES ($1 ,$2 , $3) RETURNING * ",
         [ yourName ,email ,contact] );

        res.json(newContact.rows[0])
  
    } catch (err) {
        console.error(err.message);     
    }
});

//getting all contacts

app.get("/contact" ,async(req,res) => {
    try {

        const contacts = await pool.query(
            "SELECT * FROM my_user"
        )
        res.json(contacts.rows);
        
    } catch (err) {
        console.error(err.message);
        
    }
});


//getting a contact

app.get('/contact/:id',async (req,res) =>{
    try {
        const { id } =req.params
        const contact = await pool.query(
            "SELECT * FROM my_user WHERE user_id = $1", [id ]
        )

        res.json(contact.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        
    }
})


//update a contact

app.put('/contact/:id',async (req,res)=> {
    try {
        const { id } =req.params
        const { yourName , email ,contact} =req.body;

        console.log({ yourName, email, contact});
        const update = await pool.query(
            "UPDATE my_user SET user_name=$2, user_email= $3, user_contact=$4 WHERE user_id =$1 ",[id, yourName , email, contact ]
            
        );
        res.json("contact was updated")
        res.json(update.rows[0]);
        console.log(`Contact:${id} was updated successfully`);
    } catch (err) {
        console.error(err.message);
        
    }

});

//delete a contact
app.delete('/contact/:id',async (req,res) =>{
    try {
        const { id } = req.params
        const remove = await pool.query(
            "DELETE  FROM my_user WHERE user_id= $1 ",[ id ]
        );
        // res.json(remove.rows[0])
        res.json(`Contact ${id} deleted successfully`)
        console.log(`Contact ${id} deleted successfully`)
        
    } catch (err) {
        console.error(err.message);  
    }
})

app.listen(5000,()=>{
    console.log("server has started at port 5000")
});