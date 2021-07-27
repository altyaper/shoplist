import { useState } from 'react';
import './App.css';
import Challenges from './components/Challenges';

const App = () => {

  const [value, setValue] = useState('');
  const [titleValue, setTitleValue] = useState(JSON.parse(window.localStorage.getItem('header_title')) || 'Retos de hoy');
  const [challenges, setChallenges] = useState(JSON.parse(window.localStorage.getItem('challenges')) || []);
  
  const handleTitleValue = event => {
    const newTitleValue = event.target.value;
    setTitleValue(newTitleValue);
    window.localStorage.setItem("header_title", JSON.stringify(newTitleValue));
  }
  
  const handleOnSubmit = event => {
    event.preventDefault();
    const newChallenges = [...challenges, {idx: challenges.length, done: false, text: value}];
    setChallenges(newChallenges);
    updateLocalStorage(newChallenges);
    setValue('');
  }

  const updateLocalStorage = (sessionChallenges) => {
    window.localStorage.setItem("challenges", JSON.stringify(sessionChallenges));
  }
  
  const handleRemoveChallenge = idx => {
    const newChallenges = challenges.filter(ch => {
      if (idx === ch.idx) return false;
      return true;
    });
    setChallenges(newChallenges);
    updateLocalStorage(newChallenges);
  }
  
  const handleMarkDone = idx => {
    const newChallenges = challenges.map(ch => {
      if (idx === ch.idx) {
        ch.done = !ch.done;
      }
      return ch;
    });
    setChallenges(newChallenges);
    updateLocalStorage(newChallenges);
  }
  
  const handleOnChanges = event => {
    const newValue = event.target.value;
    setValue(newValue);
  }

  return (
    <div className="App wrapper">
      <form className='todos-lists' onSubmit={handleOnSubmit}>
        <input className='input-todo' type="text" value={value} onChange={handleOnChanges} />
        <button>Agregar</button>
      </form>
      <header>
        <input className='header-title' onChange={handleTitleValue} value={titleValue} />
      </header>
      <Challenges 
        onRemove={handleRemoveChallenge}
        onMarkDone={handleMarkDone}
        challenges={challenges} />
    </div>
  );
}

export default App;
