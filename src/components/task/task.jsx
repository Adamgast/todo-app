import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Component } from 'react';
import './task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      labelState: props.todo.label,
      min: props.todo.min,
      sec: props.todo.sec,
      pause: true,
      play: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { onUploadTimer } = this.props;
    const { min, sec } = this.state;
    if (prevState.sec !== sec) {
      onUploadTimer(min, sec);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTime = () => {
    const { sec } = this.state;
    // eslint-disable-next-line no-shadow
    this.setState(({ sec }) => ({ sec: Number(sec) + 1 }));
    if (sec === 59) {
      this.setState(({ min }) => ({ sec: 0, min: Number(min) + 1 }));
    }
  };

  pauseFn = () => {
    clearInterval(this.timer);
    this.setState({ pause: true, play: false });
  };

  playFn = () => {
    this.timer = setInterval(this.updateTime, 1000);
    this.setState({ pause: false, play: true });
  };

  handleChangeLabel = (e) => {
    this.setState({ labelState: e.target.value });
  };

  handleSubmit = (e) => {
    const { labelState } = this.state;
    const { onEdited, onDeleted } = this.props;
    e.preventDefault();
    if (labelState !== '') {
      onEdited(labelState);
    } else {
      onDeleted();
    }
  };

  render() {
    const { todo, onDeleted, onToggleDone, onToggleEdit } = this.props;
    const { id, edit, done, label, date, min, sec } = todo;
    const { labelState, play, pause } = this.state;

    const formElement = (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChangeLabel} type="text" className="edit" value={labelState} />
      </form>
    );

    return (
      <div>
        <div className="view">
          <input id={id} className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button
                className={`icon icon-play ${play ? 'hidden' : ''}`}
                type="button"
                aria-label="play button"
                disabled={play}
                onClick={this.playFn}
              />
              <button
                className={`icon icon-pause ${pause ? 'hidden' : ''}`}
                type="button"
                aria-label="pause button"
                disabled={pause}
                onClick={this.pauseFn}
              />
              <span className="timer">
                {min.toString().padStart(2, '0')}:{sec.toString().padStart(2, '0')}
              </span>
            </span>
            <span className="description">created {formatDistanceToNow(date, { includeSeconds: true })} ago</span>
          </label>
          <button aria-label="edit" type="button" className="icon icon-edit" onClick={onToggleEdit} />
          <button aria-label="delete" type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {edit ? formElement : null}
      </div>
    );
  }
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
