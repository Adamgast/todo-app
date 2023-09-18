import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css';
function Footer({ toDo, onClear, filter, onChangeFilter }) {
	return (
		<footer className="footer">
			<span className="todo-count">{toDo} items left</span>
			<TasksFilter filter={filter} onChangeFilter={onChangeFilter} />
			<button onClick={onClear} className="clear-completed">Clear completed</button>
		</footer>
	);
}
export default Footer;