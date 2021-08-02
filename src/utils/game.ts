export class SudokuGame {
  board: Array<Array<string>>;
  solvedBoard: Array<Array<string>> | null = null;
  numberOfCells: number;
  numberOfFilledCells: number = 0;
  level: string;
  box: number;

  constructor(
    board: Array<Array<string>>,
    numberOfCells: number,
    box: number,
    level: string
  ) {
    this.board = board;
    this.numberOfCells = numberOfCells;
    this.box = box;
    this.level = level;
  }

  play() {
    if (this.level === 'Easy' || !this.level) {
      this.numberOfFilledCells =
        Math.round(Math.pow(this.numberOfCells, 2) / 3) * 2;
    } else if (this.level === 'Medium') {
      this.numberOfFilledCells = Math.round(
        Math.pow(this.numberOfCells, 2) / 2
      );
    } else {
      this.numberOfFilledCells = Math.round(
        Math.pow(this.numberOfCells, 2) / 3
      );
    }

    const newBoard = this.generateRandom();

    this.solve(newBoard);

    const solvedBoard = [
      ...newBoard.map((item) => {
        return [...item.map((el) => el)];
      }),
    ];

    this.solvedBoard = solvedBoard;
    this.board = newBoard;

    const generatedBoard = this.fillWithEmpty();

    return [solvedBoard, generatedBoard];
  }

  shuffle(arr: Array<number>) {
    for (let i = 0; i < arr.length; i++) {
      const randomIndex = Math.round(Math.random() * 8);
      const temp = arr[i];
      arr[i] = arr[randomIndex];
      arr[randomIndex] = temp;
    }

    return arr;
  }

  generateRandom() {
    const newBoard = [
      ...this.board.map((item) => {
        return [...item.map((el) => el)];
      }),
    ];

    const numToFill = [];

    for (let num = 1; num <= this.numberOfCells; num++) {
      numToFill.push(num);
    }

    const shuffledArr = this.shuffle(numToFill);

    for (let i = 0; i < shuffledArr.length; i++) {
      if (i === 0) {
        console.log();

        newBoard[0][0] = shuffledArr[i].toString();
      } else {
        const [y, x] = this.generateRandomCell();
        newBoard[y][x] = shuffledArr[i].toString();
      }
    }

    return newBoard;
  }

  generateRandomCell() {
    const y = Math.round(Math.random() * (this.numberOfCells - 1));
    const x = Math.round(Math.random() * (this.numberOfCells - 1));

    return [y, x];
  }

  fillWithEmpty() {
    for (
      let i = 1;
      i <= Math.pow(this.board.length, 2) - this.numberOfFilledCells;
      i++
    ) {
      const [y, x] = this.generateRandomCell();
      if (this.board[y][x] === '-' && this.box !== 2) {
        --i;
      }

      this.board[y][x] = '-';
    }

    return this.board;
  }

  solve(board: Array<Array<string>>) {
    for (let y = 0; y < this.numberOfCells; y++) {
      for (let x = 0; x < this.numberOfCells; x++) {
        const currPos = board[y][x];

        if (currPos === '-') {
          for (let num = 1; num <= this.numberOfCells; num++) {
            const currentNum = num.toString();
            const isValid = this.validateTable(board, [y, x], currentNum);

            if (isValid) {
              board[y][x] = currentNum;

              if (this.solve(board)) {
                return board;
              } else {
                board[y][x] = '-';
              }
            }
          }
          return false;
        }
      }
    }
    return board;
  }

  validateTable(board: Array<Array<string>>, pos: Array<number>, num: string) {
    const [y, x] = pos;

    // check y-coordinate
    for (let i = 0; i < this.numberOfCells; i++) {
      if (board[i][x] === num && i !== y) {
        return false;
      }
    }

    // check x-coordinates
    for (let j = 0; j < this.numberOfCells; j++) {
      if (board[y][j] === num && j !== x) {
        return false;
      }
    }

    // check box
    const boxRow = Math.floor(y / this.box) * this.box;
    const boxCol = Math.floor(x / this.box) * this.box;

    for (let i = boxRow; i < this.box + boxRow; i++) {
      for (let j = boxCol; j < this.box + boxCol; j++) {
        if (board[i][j] === num && i !== y && j !== x) {
          return false;
        }
      }
    }

    return true;
  }
}
