import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/main/main';
import Start from './pages/start/start';
import './index.scss';
import { SudokuGame } from './utils/game';
import { useState } from 'react';

export interface ISelectOption {
  value: string;
  label: string;
}

const App = () => {
  const [game, setGame] = useState<SudokuGame | null>(null);
  const [board, setBoard] = useState<Array<Array<string>>>(
    new Array(9).fill(undefined).map(() => {
      return new Array(9).fill('-');
    })
  );
  const [solvedBoard, setSolvedBoard] = useState<Array<Array<string>> | null>(
    null
  );
  const [empty, setEmpty] = useState<Array<string> | null>(null);
  const [level, setLevel] = useState<ISelectOption | null>(null);
  const [size, setSize] = useState<ISelectOption | null>(null);

  const onCreateTable = () => {
    if (!size || !level) return;

    const newBoard: Array<Array<string>> = new Array(+size?.value)
      .fill(undefined)
      .map(() => {
        return new Array(+size?.value).fill('-');
      });

    const sudoku = new SudokuGame(
      newBoard,
      +size.value,
      Math.sqrt(+size.value),
      level.label
    );
    setGame(sudoku);

    const result = sudoku.play();
    const emptyIndexes: any = [];

    result[1].forEach((item, y) => {
      item.forEach((el: any, x: number) => {
        if (el === '-') {
          emptyIndexes.push(`${y}, ${x}`);
        }
      });
    });

    setEmpty(emptyIndexes);
    setSolvedBoard(result[0]);
    setBoard(result[1]);
  };

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Start
            level={level}
            setLevel={setLevel}
            setSize={setSize}
            size={size}
            onCreateTable={onCreateTable}
          />
        </Route>
        <Route exact path='/game'>
          <Main
            size={size}
            setLevel={setLevel}
            setSize={setSize}
            setBoard={setBoard}
            empty={empty}
            solvedBoard={solvedBoard}
            board={board}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
