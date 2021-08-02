import React, { ChangeEvent, Component, Dispatch } from 'react';
import classes from './start.module.scss';

import Select from 'react-select';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const levelOptions: ISelectOption[] = [
  { value: '0', label: 'Easy' },
  { value: '1', label: 'Medium' },
  { value: '2', label: 'Hard' },
];

const boardSizeOptions: ISelectOption[] = [
  { value: '9', label: '9 x 9' },
  { value: '16', label: '16 x 16' },
];

interface ISelectOption {
  value: string;
  label: string;
}

interface Props {
  onCreateTable: () => void;
  level: ISelectOption | null;
  size: ISelectOption | null;
  setLevel: Dispatch<any>;
  setSize: Dispatch<any>;
}

const Start = ({ onCreateTable, level, size, setLevel, setSize }: Props) => {
  const [redirect, setRedirect] = useState(false);

  const onStartGame = () => {
    if (!level || !size) {
      return;
    }

    onCreateTable();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={'/game'} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.text}>
          <div>Welcome to Sudoku game.</div>
          <div>Please, choose a level and a board size.</div>
        </div>
        <div className={classes.selectWrapper}>
          <Select
            value={level}
            onChange={(selectedOption) => setLevel(selectedOption)}
            className={classes.select}
            placeholder='Level'
            options={levelOptions}
          />
          <Select
            value={size}
            onChange={(selectedOption) => setSize(selectedOption)}
            className={classes.select}
            placeholder='Size'
            options={boardSizeOptions}
          />
        </div>

        <button onClick={onStartGame} className={classes.startButton}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Start;
