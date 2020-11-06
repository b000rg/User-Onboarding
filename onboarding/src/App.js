import './App.css';
import {useState} from 'react';
import OnboardingForm from './components/OnboardingForm';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = user => {setUsers([...users, user])};

  return (
    <div className="App">
      <OnboardingForm addUser={addUser} />
      {users.map((user, i) => 
        <pre key={i}>{JSON.stringify(user)}</pre>  
      )}
    </div>
  );
};

export default App;
