
import React from "react";
import { Fragment } from "react";
import { Link } from 'react-router-dom'
import {useEffect, useState} from 'react'
import avatar from '../images/avatar.png';
import add from '../images/add-group.png'
import background from '../images/background1.jpg';
import Editcontact from "./editcontact";
import Footer from "./Footer";
import { Delete } from "@material-ui/icons";
import { Favorite } from "@material-ui/icons";
import { Edit } from "@material-ui/icons";
import { Add } from "@material-ui/icons";
import { Search } from "@material-ui/icons";
import ReactPaginate from "react-paginate";


const Listcontact = (props) =>{

  const [contacts ,setContacts] = useState([ ]);

        //~delete a contact
  const deleteContact = async id =>{
    try {

      const deleteContact = await fetch(`http://localhost:5000/contact/${id}`,{
        method:"DELETE"
      });
      setContacts(contacts.filter(contacts=> contacts.user_id !== id))
      
    } catch (err) {
      console.error(err.message);
    }
  }

        //~listcontact
  const getContacts = async() =>{
    try {
      //fetch data from the database
      const response = await fetch("http://localhost:5000/contact")
      const jsonData = await response.json();
      setContacts(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(()=>{
    getContacts();

  },[]);

  
     //~search for a contact function

     const [search ,setSearch] = useState(""); 
     const [searchResult , setSearchResult ] = useState([]); 
     const searchHandler =(searchValue) =>{
    
       setSearch(searchValue);

       if(search !== ''){
       const newContactList = contacts.filter((contact)=>{
        return Object.values(contact).join('').toLowerCase().includes(search.toLowerCase());
       
      })
       setSearchResult(newContactList);
      }else{
         setSearchResult(contacts);
      }
      
      }   


      //~ my favorite list
      const [favorites ,setFavorites] = useState([]);

      const myFavorite = async id =>{

        const newFavorite = favorites.map(contacts =>{
          return contacts.user_id === id ? { ...contacts , favorite : !contacts.favorite } : contacts ;
        });

        console.log(newFavorite);


      }
      useEffect(() =>{
        console.log(favorites);
      },[favorites])

      //~pagination
      

   return(
       <Fragment>

              {/* list contact header */}

          <div 
          //  background
           style={{backgroundImage:`url(${background})` ,backgroundRepeat:"no-repeat",
          backgroundBlendMode:"darken",position:"reflective",backfaceVisibility:"revert",
          backgroundSize:"cover",backgroundPosition:"center",height:"100%" ,width:"100%"}}>
          
          {/* header */}
           <h1  
           style={{fontSize:"45px"}} className="text-center mt-2 my-3">
           CONTACTS MANAGER APP</h1>
           <div className="d-flex mt-3">

          {/* search input*/}
          <div className="form-group">
          <input 
          className="form-control mr-sm-2" 
          type="search" placeholder="Search..." 
          style={{borderRadius:" 20px 40px",width:"550px",marginLeft:"120px"}}
          onChange={(e) => searchHandler(e.target.value)} 
          
           />
           {/* <Search/> */}
           </div>
           

          {/* add button   */}
          <button type="button"  style={{marginLeft:"250px" ,borderRadius:"30px 0px",width:"200px"}} 
          className="btn btn-primary sm-2" >
          <Link style={{color:"white",textDecoration:"none",fontWeight:"600",fontSize:"17px"}} to="/new" >
            <img src={add} style={{ width:"25px"}} />
            
            Add contact
          </Link>
          </button>
         
          </div>

          {/* list contact body */}

         <div>
           
      {search.length > 1 ? (
        searchResult.map((contacts) => {
          return(
                  // shows searched results
           <div >
           <div className="card">
           <div key={contacts.user_id} className="d-flex justify-content-between">

           <div >         
           <img style={{width:"80px",right:"30px" ,marginTop:"20px"}}src={avatar}/>
           </div>

           <div className="block" style={{marginTop:"20px"}}>
           <Link to={`/contact/${contacts.user_id}`}>
           <div class="text-dark" style={{fontFamily:"cursive"}}>{contacts.user_name}</div>
           <div class="text-primary" style={{fontFamily:"Gloria Hallelujah"}}>{contacts.user_email}</div>
           
              </Link>
             </div>
          
         
                 {/* card buttons */}
              <div className="btn-group-vertical">
              <button className="btn-sm btn btn-warning"> <Favorite/> </button>
              <Editcontact  contacts={contacts}/>
              <button onClick={()=>deleteContact(contacts.user_id)} 
         className="btn-sm btn btn-danger"> <Delete/> </button>
              </div>

           </div>
        </div>
        </div>
       
          )
        })
      ):(
      contacts.map(contacts => (
              
              //maps the data
    
      <div >
      <div className="card">
      <div key={contacts.user_id} className="d-flex justify-content-between">

      <div >         
      <img style={{width:"80px",right:"30px" ,marginTop:"20px"}}src={avatar}/>
      </div>

      <div className="block" style={{marginTop:"20px"}}>
      <Link to={`/contact/${contacts.user_id}`}>
      <div class="text-dark" style={{fontFamily:"cursive"}}>{contacts.user_name}</div>
      <div class="text-primary" style={{fontFamily:"Gloria Hallelujah"}}>{contacts.user_email}</div>
      
         </Link>
        </div>
     
    
            {/* card buttons */}
         <div className="btn-group-vertical">
         <button className="btn-sm btn btn-warning" onClick={()=> myFavorite(contacts.user_id)}> 
         <Favorite/> </button>
         <Editcontact  contacts={contacts}/>
         <button onClick={()=>deleteContact(contacts.user_id)} 
          className="btn-sm btn btn-danger"> <Delete/> </button>
         
         </div>

      
      
       
      </div>
   </div>
   </div>
      
      ))
      )} 

          {/* footer */}
         <div>
           <Footer/>
         </div>

       </div>
       

          


       </div>
       </Fragment>
   
   );
}
export default Listcontact;