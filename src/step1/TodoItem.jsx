import "./TodoItem.css";

// TODO: 1. props 구조분해할당으로 받기
const TodoItem = ({ todo, index, toggleTodoState, deleteTodo }) => {
  return (
    <div className="todo-item-container">
      {/* TODO: 2. 체크박스 구현 onChange 함수를 완성해봅시다. */}
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={todo.state === "완료"}
        onChange={() => {
          toggleTodoState(index);
        }}
      />

      <div className="todo-content">
        <p className={`todo-text ${todo.state === "완료" ? "completed" : ""}`}>
          {/* TODO: 3. 할 일 내용 표시 */}
          {todo.job}
        </p>
      </div>

      <div className="todo-actions">
        <span
          className={`todo-badge ${todo.state === "완료" ? "completed" : ""}`}
        >
          {/* TODO: 5. 삼항 연산자를 이용하여 상태 표시 배지 */}
          {todo.state === "완료" ? "완료" : "미완료"}
        </span>

        {/* TODO: 6. 삭제 버튼 구현  onClick 함수를 완성해 봅시다.*/}
        <button
          className="delete-button"
          onClick={() => {
            deleteTodo(index);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
