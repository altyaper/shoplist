import { useState } from 'react';
import './App.css';
import Challenges from './components/Challenges';

const App = () => {

  const [value, setValue] = useState('');
  const [challenges, setChallenges] = useState([]);

  const handleOnChanges = event => {
    const newValue = event.target.value;
    setValue(newValue);
  }

  const handleOnSubmit = event => {
    event.preventDefault();
    const newChallenges = [...challenges, {idx: challenges.length, done: false, text: value}];
    setChallenges(newChallenges);
    setValue('');
  }

  const handleRemoveChallenge = idx => {
    const newChallenges = challenges.filter(ch => {
      if (idx === ch.idx) return false;
      return true;
    });
    setChallenges(newChallenges);
  }

  const handleMarkDone = idx => {
    const newChallenges = challenges.map(ch => {
      if (idx === ch.idx) {
        ch.done = !ch.done;
      }
      return ch;
    });
    setChallenges(newChallenges);
  }

  return (
    <div className="App">
      <form className='todos-lists' onSubmit={handleOnSubmit}>
        <input type="text" value={value} onChange={handleOnChanges} />
        <button>Agregar</button>
      </form>
      <header>Retos de hoy</header>
      <Challenges 
        onRemove={handleRemoveChallenge}
        onMarkDone={handleMarkDone}
        challenges={challenges} />
    </div>
  );
}

export default App;
