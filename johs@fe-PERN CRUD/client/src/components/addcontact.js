
import { useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addBg from '../images/addBg.jpg';
import bg from '../images/bg.jpg';


const Addcontact = () =>{

       //check and capture inputs
    const [inputs , setInputs] = useState({
        yourName:"",
        email:"",
        contact:"",
    });
    const { yourName ,email , contact } =inputs;

      //captures changed inputs
    const onChange = (e) =>{
       setInputs({
           ...inputs,
           [e.target.name]: e.target.value
       });
    } 

    //submitting the form
    const onSubmitForm = async (e) =>{
        e.preventDefault();

        try {
            const body = { yourName , email, contact };
            if( !yourName ||!email ||!contact){
                return toast.error("Not all field are filled")
            }
            //adds the data to the databse through the server
            const response = await fetch("http://localhost:5000/contact" ,{            
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify(body)
            });

            // console.log(response);
            
            window.location ="/"
            return toast.success("New contact succesfully added")
            
        } catch (err) {
            console.error(err.message)
        }
    }
      //cancelling the form
    const onCancelForm = (e) =>{
        e.preventDefault();
        window.location ="/"

    }

   return(     
           
    //contact adding form
    <div style={{backgroundImage:`url(${addBg})` ,backgroundRepeat:"no-repeat",
                                backgroundBlendMode:"darken",position:"absolute",
                                backfaceVisibility:"revert",backgroundSize:"cover",
                                backgroundPosition:"center",height:"100%" ,width:"100%"}}>
               
        <form    style={{ margin:"90px 0px 0px 300px"}}>

            <div style={{backgroundImage:`url(${bg})` ,backgroundRepeat:"no-repeat",
                             backgroundBlendMode:"darken",backgroundSize:"cover",
                             backgroundPosition:"center",height:"50%" ,width:"70%",
                             padding:"40px",borderRadius:"60px 20px",
                             boxShadow:"3px 0 2px 4px "}}>

         <h1 className="text-start">Add Contact</h1>

         <div>
             
            <input type="text" name="yourName"
            placeholder="name" className='form-control my-3'
            style={{borderRadius:"10px 20px 30px 40px", width:"650px"}}
            value={yourName}
            // onChange={e=> setInputs(e.target.value)}
            onChange = { e=> onChange(e)}
            />
            
            <input type="email" name="email"
            placeholder="email" className='form-control  my-3'
            style={{borderRadius:"10px 20px 30px 40px", width:"650px"}}
            value={email}
            onChange = {e=> onChange(e)}
            />
            
             <input type="text" name="contact"
            placeholder="contact" className='form-control  my-3'
            style={{borderRadius:"10px 20px 30px 40px", width:"650px"}}
            value={contact}
            onChange = {e => onChange(e)}
            />

            <div className="d-flex mt-3" >
            <button type="submit" value="send" onClick={onSubmitForm}
            className="form-control btn btn-outline-primary"
            style={{ marginTop: "20px", width:"150px",borderRadius:" 20px 40px",
            fontSize:"19px",}}>Add</button>

            <button type="submit" value="cancel" 
            onClick={onCancelForm}
            className="form-control btn btn-outline-secondary ml-5"
            style={{ marginTop: "19px", width:"150px",borderRadius:" 20px  40px",
            fontSize:"20px",}}>Cancel</button>

             </div>
             <ToastContainer />
             </div>
             
             </div>

            </form>

            </div>
            
           
   );
}
export default Addcontact;