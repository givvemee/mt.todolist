import { useState } from "react";
import "../components/shared/styles.css";
import "./AdvancedTodo.css";
import TodoActions from "./TodoActions";
import TodoFilter from "./TodoFilter";

function AdvancedTodo() {
  const [todoList, setTodoList] = useState([
    { id: 1, job: "장보기", state: "완료" },
    { id: 2, job: "산책하기", state: "미완료" },
    { id: 3, job: "책 읽기", state: "미완료" },
  ]);
  // TODO: 1. 사용자 입력값을 저장할 state, 현재 필터 상태를 저장할 state, 수정 중인 할 일의 ID와 수정 중인 텍스트를 저장할 state들 생성
  const [inputValue, setInputValue] = useState("");

  // TODO: 2. 새로운 할 일을 목록에 추가하는 함수 구현
  const addTodo = () => {
    if (!inputValue) return;
    const newId = Date.now();
    const newTodo = { id: newId, job: inputValue, state: "미완료" };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };

  // TODO: 3. 할 일의 완료/미완료 상태를 전환하는 함수 구현 (특정 id를 받아서 처리)
  const toggleTodoState = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, state: todo.state === "완료" ? "미완료" : "완료" }
          : todo
      )
    );
  };

  // TODO: 4. 특정 할 일을 목록에서 제거하는 함수 구현 (특정 id를 받아서 삭제)
  const deleteTodo = (id) => {
    const newTodo = [...todoList];
    const result = newTodo.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(result);
  };

  // TODO: 5. 할 일 텍스트 수정을 시작하는 함수 구현
  const [isEditId, setIsEditId] = useState(null);
  const [isEditValue, setIsEditValue] = useState("");
  const startEdit = (id, currentText) => {
    setIsEditId(id);
    setIsEditValue(currentText);
  };

  // TODO: 6. 수정된 할 일 텍스트를 저장하는 함수 구현
  const saveEdit = (id, currentText) => {
    setIsEditId("");
    const newTodo = todoList.map((todo) =>
      todo.id === id ? { ...todo, job: currentText } : todo
    );
    setTodoList(newTodo);
  };

  // TODO: 7. 할 일 수정을 취소하고 원래 상태로 돌리는 함수 구현
  const cancelEdit = () => {
    setIsEditId("");
  };

  // TODO: 8. 엔터키를 눌렀을 때 할 일을 추가하는 키보드 이벤트 함수 구현
  const handleKeyPress = (e) => {
    if (e.key == "Enter") addTodo();
  };

  //필터 함수
  const [currentFilter, setCurrentFilter] = useState("전체");
  const onFilterChange = (label) => {
    setCurrentFilter(label);
    cancelEdit();
  };

  // 체크박스 전체선택 기능 함수
  const [allSelected, setAllSelected] = useState(false);
  const onSelectAll = () => {
    if (todoList.length === 0) return;
    setAllSelected(false);
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.state === "완료" ? { ...todo, state: "미완료" } : todo
      )
    );
  };

  // 체크박스 전체해제 기능 함수
  const onDeselectAll = () => {
    if (todoList.length === 0) return;
    setAllSelected(true);
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.state === "미완료" ? { ...todo, state: "완료" } : todo
      )
    );
  };

  // 완료 항목 삭제 기능 함수
  const onDeleteCompleted = () => {
    setTodoList((prev) => prev.filter((todo) => todo.state !== "완료"));
    onSelectAll();
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* TODO: 9. 입력 필드와 사용자 입력값을 연결 */}
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            placeholder="새로운 할 일을 입력하세요..."
            value={inputValue} // 현재 입력된 텍스트 표시
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
            }} // 입력값이 변경될 때마다 상태 업데이트
            onKeyDown={handleKeyPress}
          />
          <button className="add-button" onClick={addTodo}>
            추가
          </button>
        </div>
        {/* TODO: 10. 필터링 기능을 위한 TodoFilter 컴포넌트 import*/}
        <TodoFilter
          currentFilter={currentFilter}
          onFilterChange={onFilterChange}
        />
        {/* TODO: 11. 전체 선택/삭제 기능을 위한 TodoActions 컴포넌트 import */}
        <TodoActions
          todoList={todoList}
          onSelectAll={onSelectAll}
          onDeselectAll={onDeselectAll}
          onDeleteCompleted={onDeleteCompleted}
          allSelected={allSelected}
        />
        {/* TODO: 12. 필터링된 할 일 목록을 화면에 표시 */}
        <div className="todo-list">
          {todoList.length > 0 ? (
            <div className="todo-items">
              {todoList.map((todo) => {
                const shouldShow = () => {
                  if (currentFilter === "전체") return true;
                  return currentFilter === todo.state;
                };

                return shouldShow() ? (
                  <div key={todo.id} className="advanced-todo-item">
                    {/* TODO: 13. 할 일 완료 상태를 체크박스에 연결 */}
                    <input
                      className="todo-checkbox"
                      type="checkbox"
                      checked={todo.state === "완료" ? true : false} // 할 일의 완료 상태 확인
                      onChange={() => toggleTodoState(todo.id)}
                    />
                    <div className="todo-content">
                      {isEditId !== todo.id ? (
                        <p
                          className={`todo-text ${
                            todo.state === "완료" ? "completed" : ""
                          }`}
                          onDoubleClick={() => startEdit(todo.id, todo.job)}
                          style={{ cursor: "pointer" }}
                        >
                          {todo.job}
                        </p>
                      ) : (
                        <input
                          type="text"
                          value={isEditValue}
                          onChange={(e) => {
                            const value = e.target.value;
                            setIsEditValue(value);
                          }}
                          onKeyUp={(e) => e.key === "Escape" && cancelEdit()}
                        />
                      )}
                    </div>
                    {/* TODO: 14. 할 일의 상태 표시와 수정/삭제 버튼 구현 */}
                    <div className="todo-actions">
                      <span
                        className={`todo-badge ${
                          todo.state === "완료" ? "completed" : ""
                        }`}
                      >
                        {todo.state === "완료" ? "완료" : "진행중"}
                      </span>

                      <div className="edit-actions">
                        {isEditId !== todo.id ? (
                          <button
                            className="edit-button"
                            onClick={() => startEdit(todo.id, todo.job)}
                          >
                            ✎
                          </button>
                        ) : (
                          <>
                            <button
                              className="edit-button"
                              onClick={() => saveEdit(todo.id, isEditValue)}
                            >
                              수정
                            </button>
                            <button
                              className="edit-button"
                              onClick={() => cancelEdit(todo.id, todo.job)}
                            >
                              취소
                            </button>
                          </>
                        )}
                        <button
                          className="edit-button"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-text">할 일이 없습니다</p>
              <p className="empty-subtext">새로운 할 일을 추가해보세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdvancedTodo;
