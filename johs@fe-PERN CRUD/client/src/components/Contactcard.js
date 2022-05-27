

import avatar from '../images/avatar.png';
import { Link, useParams } from 'react-router-dom';

const contactCard = ({contacts}) =>{

      //  const { id } = useParams();
    
      return(
        <div>
        <div class="card" style={{width:"400px"}}>
            <img class="card-img-top" src={avatar}  alt={avatar}/>
            <div class="card-body">
            <h4 class="card-title">{contacts.user_name}</h4>
            <p class="card-text">{contacts.user_email}</p>
            <p class="card-text">{contacts.user_contact}</p>

            </div>
            </div>
            <div class="d-flex">
            <Link to="/edit">  <button class="btn btn-primary">Edit</button> </Link>
           <Link to="/"> <button class="btn btn-primary">Back to Contact</button> </Link>
           </div>
        </div>
      );

}

export default contactCard;