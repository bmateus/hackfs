import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Wallet from './components/Wallet'
import ProfileView from './components/ProfileView';

const App = (props) => 
{  
  return (
      <div className="App">
        <header className="App-header">
          <Container>
              <Wallet/>
          </Container>
        </header>
        <div className="App-title">
            <h1>Blockchain Account Profile</h1>
          </div>
        <div className="App-body">
          <ProfileView/>
        </div>
        <footer className="App-header"></footer>
      </div>);
}

export default App;
