import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import { TiDeleteOutline } from 'react-icons/ti';

const Challenge = ({
  onMarkDone,
  onRemove,
  challenge
}) => {
  return (
    <li className='challenge gradient-animation'>
      <div className='inline challenge-check' onClick={() => onMarkDone(challenge.idx)}>
        { challenge.done ? (
          <FiCheckSquare />
        ) : (
          <FiSquare />
        )}
      </div>
      <span className='challenge-title'>{challenge.text}</span>
      <button className='challenge-delete' onClick={() => onRemove(challenge.idx)}>
        <TiDeleteOutline />
      </button>
    </li>
  );
}

export default Challenge;