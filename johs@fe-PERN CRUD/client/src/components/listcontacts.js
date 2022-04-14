
import React from "react";
import { Fragment } from "react";
import {Link } from 'react-router-dom'
// import { Add } from '@material-ui/icons';
import {useEffect, useState} from 'react'
import avatar from '../images/avatar.png';
import Editcontact from "./editcontact";


const Listcontact = () =>{

  const [contacts ,setContacts] = useState([ ]);

        //delete a contact
  const deleteContact = async id =>{
    try {

      const deleteContact = await fetch(`http://localhost:5000/contact/${id}`,{
        method:"DELETE"
      });
      // console.log(deleteContact);
      setContacts(contacts.filter(contacts=> contacts.user_id !== id))
      
      
    } catch (err) {
      console.error(err.message);
      
    }
  }
        //listcontact
  const getContacts = async() =>{
    try {
      //fetch data from the database
      const response = await fetch("http://localhost:5000/contact")
      const jsonData = await response.json();

      setContacts(jsonData);
    } catch (err) {
      console.error(err.message)
      
    }
  }

  useEffect(()=>{
    getContacts();
  },[]);

     //search for a contact
     const [search ,setSearch] = useState("");
     
  // const searchHandler =( ) =>{
  //   if(search !==" "){
  //     return contacts.filter((contact) =>{
  //       console.log(Object.values(contact).join(""));
  //     })
  //   }
  // }



   return(
       <Fragment>
         <h1  style={{fontSize:"45px"}} className="text-center mt-5 my-3"><i>My Contact List</i></h1>
           <div className="d-flex mt-3">


         <input type="search" placeholder="search" className="form-control my-4" 
         style={{borderRadius:" 20px 40px",width:"650px",marginLeft:"120px"}} 
         onChange={(e) => setSearch(e.target.value)} searchTerm={searchHandler}/>

                        
         <button type="button"  style={{marginLeft:"250px" ,borderRadius:"30px 0px",width:"200px"}} 
          className="btn btn-primary my-4" >
             <Link style={{color:"white",textDecoration:"none",fontWeight:"600",fontSize:"20px"}} to="/new" >
             {/* <Add/> */}
             Add contact
             </Link>
             </button>
         
          </div>

         <div class="container">
            
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Profile</th>
        <th>Name</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>

      {contacts.map(contacts => (
        <tr key={contacts.user_id}>
          <td><img style={{width:"35px",right:"30px"}}src={avatar}/></td>
        <td>{contacts.user_name}</td>
        <td>{contacts.user_contact}</td>
        <td>{contacts.user_email}</td>
        
       
        <td>
          <Editcontact contacts={contacts}/>
        </td>
        <td><button onClick={()=>deleteContact(contacts.user_id)} 
        className="btn-sm btn btn-danger">Delete</button></td>
      </tr>
      ))}
           
         </tbody>
        </table>
       </div>



       </Fragment>
   
   );
}
export default Listcontact;