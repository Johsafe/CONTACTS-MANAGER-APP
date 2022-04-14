import { Route ,Switch} from 'react-router-dom';
import Editcontact from './components/editcontact';
import Listcontact from './components/listcontacts';
import './App.css';
import Addcontact from './components/addcontact';

function App() {
  return (
     <div>
      <Switch>

      <Route exact path='/'>
        <Listcontact/>
        </Route>

        <Route path='/new' exact>
        <Addcontact/>
        </Route>

        <Route path='/edit'>
        <Editcontact/>
        </Route>

      </Switch>
      </div>
      
  );
}

export default App;
