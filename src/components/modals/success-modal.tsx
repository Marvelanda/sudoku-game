import classes from './modals.module.scss';

interface Props {
  correct: boolean;
}

const SuccessFailModal = ({ correct }: Props) => {
  return (
    <>
      <div className={classes.modalScreen}></div>
      <div className={classes.modalWrapper}>
        <div className={classes.modal}>
          {correct ? <div>Succes</div> : <div>Fail</div>}
          <button>Close</button>
        </div>
      </div>
    </>
  );
};

export default SuccessFailModal;
