import { Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './header.module.scss';

interface Props {
  setLevel: Dispatch<any>;
  setSize: Dispatch<any>;
  onCheckBoard: () => void;
}

const Header = ({ onCheckBoard, setLevel, setSize }: Props) => {
  const history = useHistory();

  const onStartNewGame = () => {
    setLevel(null);
    setSize(null);
    history.push('/');
  };

  return (
    <div className={classes.header}>
      <button className={classes.generateButton} onClick={onStartNewGame}>
        Start new game
      </button>
      <button className={classes.checkButton} onClick={onCheckBoard}>
        Check
      </button>
    </div>
  );
};

export default Header;
