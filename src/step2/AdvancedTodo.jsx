import { useState } from "react";
import "../components/shared/styles.css";
import "./AdvancedTodo.css";
import TodoFilter from "./TodoFilter";
import TodoActions from "./TodoActions";

function AdvancedTodo() {
  const [todoList, setTodoList] = useState([
    { id: 1, job: "장보기", state: "완료" },
    { id: 2, job: "산책하기", state: "미완료" },
    { id: 3, job: "책 읽기", state: "미완료" },
  ]);
  // TODO: 1. 사용자 입력값을 저장할 state, 현재 필터 상태를 저장할 state, 수정 중인 할 일의 ID와 수정 중인 텍스트를 저장할 state들 생성
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // TODO: 2. 새로운 할 일을 목록에 추가하는 함수 구현
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      job: inputValue,
      state: "미완료",
    };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };

  // TODO: 3. 할 일의 완료/미완료 상태를 전환하는 함수 구현 (특정 id를 받아서 처리)
  const toggleTodoState = (id) => {
    const toggledTodoList = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, state: todo.state === "완료" ? "미완료" : "완료" }
        : todo
    );
    setTodoList(toggledTodoList);
  };

  // TODO: 4. 특정 할 일을 목록에서 제거하는 함수 구현 (특정 id를 받아서 삭제)
  const deleteTodo = (id) => {
    const deletedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(deletedTodoList);
  };

  // TODO: 5. 할 일 텍스트 수정을 시작하는 함수 구현
  const startEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
    setIsComposing(false);
  };

  // TODO: 6. 수정된 할 일 텍스트를 저장하는 함수 구현
  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, job: editText } : todo
    );
    setTodoList(updatedTodoList);
    setEditId(null);
    setEditText("");  
    setIsComposing(false);
  };

  // TODO: 7. 할 일 수정을 취소하고 원래 상태로 돌리는 함수 구현
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
    setIsComposing(false);
  };

  // TODO: 8. 엔터키를 눌렀을 때 할 일을 추가하는 키보드 이벤트 함수 구현
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isComposing) {
      if (editId !== null) {
        saveEdit(editId);
      } else {
        addTodo();
      }
    }
  };

  //전체 선택 함수
  const selectAll = () => {
    const allSelect = todoList.map((todo) => ({ ...todo, state: "완료" }));
    setTodoList(allSelect);
  }

  //전체 해제 함수
  const deselectAll = () => {
    const allDeselect = todoList.map((todo) => ({ ...todo, state: "미완료" }));
    setTodoList(allDeselect);
  }

  //완료된 할 일 일괄 삭제 함수
  const deleteCompleted = () => {
    const deleteCompleteTodos = todoList.filter((todo) => todo.state !== "완료");
    setTodoList(deleteCompleteTodos);
  }

  //필터링 함수 - switch문 사용
  const getFilteredTodoList = () => {
    switch (filter) {
      case "all":
        return todoList;
      case "completed":
        return todoList.filter((todo) => todo.state === "완료");
      case "incomplete":
        return todoList.filter((todo) => todo.state === "미완료");
      default:
        return todoList;
    }
  }

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* TODO: 9. 입력 필드와 사용자 입력값을 연결 */}
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            id="new-todo-input"
            name="new-todo-input"
            placeholder="새로운 할 일을 입력하세요..."
            value={inputValue} // 현재 입력된 텍스트 표시
            onChange={(e) => {
              setInputValue(e.target.value);
            }} // 입력값이 변경될 때마다 상태 업데이트
            onKeyDown={handleKeyPress}
          />
          <button className="add-button" onClick={addTodo}>
            추가
          </button>
        </div>

        {/* TODO: 10. 필터링 기능을 위한 TodoFilter 컴포넌트 import*/}
        <div className="filter-container">
          <TodoFilter
            currentFilter={filter}
            onFilterChange={(newFilter) => setFilter(newFilter)}
            todoList={todoList}
          />
        </div>
        {/* TODO: 11. 전체 선택/삭제 기능을 위한 TodoActions 컴포넌트 import */}
        <div className="actions-container">
          <TodoActions
            allSelected={
              todoList.every((todo) => todo.state === "완료") &&
              todoList.length > 0
            }
            onSelectAll={selectAll}
            onDeselectAll={deselectAll}
            onDeleteCompleted={deleteCompleted}
            todoList={todoList}
          />
        </div>
        {/* TODO: 12. 필터링된 할 일 목록을 화면에 표시 */}
        <div className="todo-list">
          <div className="todo-items">
            {getFilteredTodoList().map((todo) => (
              <div key={todo.id} className="advanced-todo-item">
                {/* TODO: 13. 할 일 완료 상태를 체크박스에 연결 */}
                <input
                  className="todo-checkbox"
                  type="checkbox"
                  id={`todo-checkbox-${todo.id}`}
                  name={`todo-checkbox-${todo.id}`}
                  checked={todo.state === "완료"}
                  onChange={() => toggleTodoState(todo.id)}
                />

                <div className="todo-content">
                  {editId === todo.id ? (
                    <input
                      className="edit-input"
                      type="text"
                      id={`edit-todo-${todo.id}`}
                      name={`edit-todo-${todo.id}`}
                      value={editText}
                      autoFocus
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isComposing) {
                          saveEdit(todo.id);
                        } else if (e.key === "Escape") {
                          cancelEdit();
                        }
                      }}
                    />
                  ) : (
                    <p
                      className={`todo-text ${
                        todo.state === "완료" ? "completed" : ""
                      }`}
                      onDoubleClick={
                        editId === null
                          ? () => startEdit(todo.id, todo.job)
                          : undefined
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {todo.job}
                    </p>
                  )}
                </div>

                <div className="todo-actions">
                  <span
                    className={`todo-badge ${
                      todo.state === "완료" ? "completed" : ""
                    }`}
                  >
                    {todo.state === "완료" ? "완료" : "진행중"}
                  </span>

                  <div className="edit-actions">
                    {editId === todo.id ? (
                      <button
                        className="edit-button"
                        style={{
                          color: "white",
                          backgroundColor: "red",
                          padding: "4px 12px",
                          minWidth: "32px",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          boxSizing: "border-box",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelEdit();
                        }}
                        disabled={editId !== null && editId !== todo.id}
                      >
                        취소
                      </button>
                    ) : (
                      <button
                        className="edit-button"
                        onClick={() => startEdit(todo.id, todo.job)}
                        disabled={editId !== null && editId !== todo.id}
                      >
                        ✎
                      </button>
                    )}
                    <button
                      className="edit-button"
                      onClick={() => deleteTodo(todo.id)}
                      disabled={editId !== null}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedTodo;
