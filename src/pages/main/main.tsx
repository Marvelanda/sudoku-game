import { Dispatch, SetStateAction, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ISelectOption } from '../../app';
import Header from '../../components/header/header';
import SudokuBoard from '../../components/sudoku-board/sudoku-board';

import classes from './main.module.scss';

interface Props {
  board: string[][];
  solvedBoard: string[][] | null;
  empty: Array<string> | null;
  setBoard: Dispatch<SetStateAction<string[][]>>;
  setLevel: Dispatch<any>;
  setSize: Dispatch<any>;
  size: ISelectOption | null;
}

const Main = ({
  board,
  solvedBoard,
  empty,
  setBoard,
  setLevel,
  setSize,
  size,
}: Props) => {
  const [showSolved, setShowSolved] = useState(false);
  const onCheckBoard = () => {
    setShowSolved(true);
  };

  if (!solvedBoard) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.container}>
      <Header
        setLevel={setLevel}
        setSize={setSize}
        onCheckBoard={onCheckBoard}
      />
      <SudokuBoard
        size={size}
        showSolved={showSolved}
        solvedBoard={solvedBoard}
        empty={empty}
        board={board}
        setBoard={setBoard}
      />
    </div>
  );
};

export default Main;
