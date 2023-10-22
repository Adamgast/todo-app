import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './task.css';

function Task({ todo, onDeleted, onEdited, onToggleDone, onToggleEdit, onUploadTimer, onEditTimerId }) {
  let { timerId } = todo;

  const [labelState, setLabelState] = useState(todo.label);
  const [play, setPlay] = useState(Boolean(timerId));
  const [pause, setPause] = useState(Boolean(!timerId));

  const startTimer = () => {
    timerId = setInterval(onUploadTimer, 1000);
    onEditTimerId(timerId);
    setPlay(true);
    setPause(false);
  };

  const stopTimer = () => {
    clearInterval(timerId);
    onEditTimerId(0);
    setPlay(false);
    setPause(true);
  };

  const handleDeleteItem = () => {
    if (timerId) stopTimer();
    const timeout = setTimeout(() => {
      onDeleted();
      clearTimeout(timeout);
    }, 100);
  };

  const handleChangeLabel = (e) => {
    setLabelState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (labelState !== '') {
      onEdited(labelState);
    } else {
      handleDeleteItem();
    }
  };

  const handleChangeDone = () => {
    if (timerId) stopTimer();
    onToggleDone();
  };

  const { id, edit, done, label, date, min, sec } = todo;

  const formElement = (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChangeLabel} type="text" className="edit" value={labelState} />
    </form>
  );

  return (
    <div>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={done} onChange={handleChangeDone} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button
              className={`icon icon-play ${play ? 'hidden' : ''}`}
              type="button"
              aria-label="play button"
              disabled={play}
              onClick={startTimer}
            />
            <button
              className={`icon icon-pause ${pause ? 'hidden' : ''}`}
              type="button"
              aria-label="pause button"
              disabled={pause}
              onClick={stopTimer}
            />
            <span className="timer">
              {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
            </span>
          </span>
          <span className="description">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
        </label>
        <button aria-label="edit" type="button" className="icon icon-edit" onClick={onToggleEdit} />
        <button aria-label="delete" type="button" className="icon icon-destroy" onClick={handleDeleteItem} />
      </div>
      {edit ? formElement : null}
    </div>
  );
}

Task.defaultProps = {
  todo: {},
};

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    label: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }),
};

export default Task;
