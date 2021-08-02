import { ISelectOption } from '../../app';
import classes from './sudoku-board.module.scss';

interface Props {
  empty: Array<string> | null;
  board: string[][];
  size: ISelectOption | null;
  setBoard: (b: any) => void;
  showSolved: boolean;
  solvedBoard: string[][] | null;
}

const SudokuBoard = ({
  size,
  empty,
  board,
  setBoard,
  showSolved,
  solvedBoard,
}: Props) => {
  const onChangeNumber = (coords: [number, number], num: string) => {
    const [y, x] = coords;
    const isEmpty = empty?.find((item) => item === `${y}, ${x}`);

    if (!isEmpty) return;

    setBoard((prev: Array<Array<string>>) => {
      return prev?.map((item, i) => {
        return item.map((el, j) => {
          if (i === y && j === x) {
            return num;
          } else {
            return el;
          }
        });
      });
    });
  };

  return (
    <div className={classes.wrapper}>
      {!!board?.length && !showSolved ? (
        <>
          {board.map((item, y: number) => {
            return (
              <div key={y}>
                {item.map((el: string, x: number) => {
                  const isEmpty = empty?.find((item) => item === `${y}, ${x}`);

                  return (
                    <div
                      key={`${y}${x}`}
                      className={`${classes.sudokuCell} 
                      ${size?.value === '9' && `${classes.sudokuMiddleCell}`}
                      ${size?.value === '16' && `${classes.sudokuSmallCell}`}
                      `}
                    >
                      <input
                        className={
                          isEmpty
                            ? `${classes.sudokuInput} ${classes.emptyCell}`
                            : classes.sudokuInput
                        }
                        type='text'
                        value={board[y][x]}
                        onChange={(e) => onChangeNumber([y, x], e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      ) : (
        <>
          {solvedBoard?.map((item, y: number) => {
            return (
              <div key={y}>
                {item.map((el: string, x: number) => {
                  const isEmpty = empty?.find((item) => item === `${y}, ${x}`);

                  return (
                    <div
                      key={`${y}${x}`}
                      className={`${classes.sudokuCell} 
                    ${size?.value === '9' && `${classes.sudokuMiddleCell}`}
                    ${size?.value === '16' && `${classes.sudokuSmallCell}`}
                    `}
                    >
                      <input
                        className={
                          isEmpty
                            ? `${classes.sudokuInput} ${classes.emptyCell}`
                            : classes.sudokuInput
                        }
                        type='text'
                        value={solvedBoard[y][x]}
                        disabled
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
      ;
    </div>
  );
};

export default SudokuBoard;
