import PropTypes from 'prop-types';
import './tasks-filter.css';

function TasksFilter({ filter, onChangeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={() => onChangeFilter('ALL')} className={filter === 'ALL' ? 'selected' : null}>
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => onChangeFilter('Active')}
          className={filter === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => onChangeFilter('Completed')}
          className={filter === 'Completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

TasksFilter.defaulProps = {
  filter: 'ALL',
};

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
export default TasksFilter;
