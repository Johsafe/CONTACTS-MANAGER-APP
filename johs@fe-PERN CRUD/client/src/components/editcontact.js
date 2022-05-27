


import { useState } from "react";
import { Fragment } from "react";
import { Edit } from "@material-ui/icons";
// import { ToastContainer,toast } from "react-toastify";

const Editcontact = ({contacts}) =>{

   // console.log(contacts)
   const [edit ,setEdit] = useState({

      //taking known values

      yourName:contacts.user_name,
      email:contacts.user_email,
      contact :contacts.user_contact

   });

   const { yourName, email , contact } = edit;

   const onChange = (e) =>{
      setEdit({
         ...edit,
         [e.target.name] :e.target.value
      });
   }

   const updateContact = async (e) =>{

      e.preventDefault();

      const body= { yourName ,email ,contact};

      const updateContact = await fetch(`http://localhost:5000/contact/${contacts.user_id}`,{
         method:"PUT",
         headers:{"Content-Type" :" application/json"},
         body: JSON.stringify(body)
      });
      // console.log(updateContact)
      window.location = "/";
      
   }

   const onCancelForm = (e) =>{
      e.preventDefault();
      window.location ="/"

  }

   return(
            // ~ edit contact component
       <Fragment>

       <button type="button"  class="btn btn-primary btn-sm " data-toggle="modal" 
       data-target={`#id${contacts.user_id}` }>
         <Edit/>
        </button>
        <div class="modal" id={`id${contacts.user_id}`} >
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title" className="text-start mt-3">Edit Contact</h1>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

      <div class="modal-body">
            <input type="text" name="yourName" value={yourName}
            onChange={e =>onChange(e)}
            placeholder="name" className='form-control my-3'
            style={{borderRadius:"20px 40px",width:"420px"}}
            />
            
            <input type="email" name="email" value={email}
            onChange={e =>onChange(e)}
            placeholder="email" className='form-control  my-3'
            style={{borderRadius:"20px 40px", width:"420px"}}
            />
            
             <input type="text" name="contact" value={contact}
             onChange={e =>onChange(e)}
            placeholder="contact" className='form-control  my-3'
            style={{borderRadius:"20px 40px",width:"420px"}}
            />
        </div>


         <div class="modal-footer">
          <div>
         <button type="submit"  onClick={updateContact}
         className="form-control btn btn-primary"
        
            style={{ marginTop: "20px", width:"150px", borderRadius:"20px 40px"}}>
               Update
            </button> </div>

         <div>
           <button type="button" class="btn btn-danger" 
         style={{ marginTop: "20px", width:"150px", borderRadius:"20px 40px"}}
          data-dismiss="modal">Close</button> </div>
         </div>

         </div>
       </div>
    </div>  

 </Fragment>
   );
}
export default Editcontact;
