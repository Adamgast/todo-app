import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Component } from 'react';
import './task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.timer = props.todo.timerId;
    this.timeout = null;
    this.state = {
      labelState: props.todo.label,
      finalDelete: false,
      pause: Boolean(!this.timer),
      play: Boolean(this.timer),
    };
  }

  componentWillUnmount() {
    const { finalDelete } = this.state;
    if (finalDelete) {
      clearInterval(this.timer);
      clearTimeout(this.timeout);
    }
  }

  pauseFn = () => {
    const { onEditTimerId } = this.props;
    onEditTimerId(0);
    clearInterval(this.timer);
    this.setState({ pause: true, play: false });
  };

  playFn = () => {
    const { onUploadTimer, onEditTimerId } = this.props;
    this.timer = setInterval(onUploadTimer, 1000);
    onEditTimerId(this.timer);
    this.setState({ pause: false, play: true });
  };

  handleDeleteItem = () => {
    const { onDeleted } = this.props;
    this.setState({ finalDelete: true });
    this.timeout = setTimeout(() => onDeleted(), 100);
  };

  handleChangeLabel = (e) => {
    this.setState({ labelState: e.target.value });
  };

  handleSubmit = (e) => {
    const { labelState } = this.state;
    const { onEdited } = this.props;
    e.preventDefault();
    if (labelState !== '') {
      onEdited(labelState);
    } else {
      this.handleDeleteItem();
    }
  };

  render() {
    const { todo, onToggleDone, onToggleEdit } = this.props;
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
          <button aria-label="delete" type="button" className="icon icon-destroy" onClick={this.handleDeleteItem} />
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
