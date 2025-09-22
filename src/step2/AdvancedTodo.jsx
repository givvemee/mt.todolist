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
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("전체");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // TODO: 2. 새로운 할 일을 목록에 추가하는 함수 구현
  const addTodo = () => {
    if (newTodo === "") return;

    const newTodoItem = {
      id: Date.now(),
      job: newTodo,
      state: "미완료",
    };
    // 스프레드 연산자로 기존 배열을 복사하고 새로운 할 일의 객체 추가
    setTodoList([...todoList, newTodoItem]);
    // 입력 필드 비우기
    setNewTodo("");
  };

  // TODO: 3. 할 일의 완료/미완료 상태를 전환하는 함수 구현 (특정 id를 받아서 처리)
  const toggleTodoState = (id) => {
    setTodoList(
      todoList.map((todo) => {
        return todo.id === id
          ? {
              ...todo,
              state: todo.state === "완료" ? "미완료" : "완료",
            }
          : todo;
      })
    );
  };

  // TODO: 4. 특정 할 일을 목록에서 제거하는 함수 구현 (특정 id를 받아서 삭제)
  const deleteTodo = (id) => {
    setTodoList((todoList) => todoList.filter((todo) => todo.id !== id));
  };

  // TODO: 5. 할 일 텍스트 수정을 시작하는 함수 구현
  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  // TODO: 6. 수정된 할 일 텍스트를 저장하는 함수 구현
  const saveEdit = () => {
    if (editingText === "") return;

    setTodoList(
      todoList.map((todo) => {
        return todo.id === editingId
          ? {
              ...todo,
              job: editingText,
            }
          : todo;
      })
    );

    setEditingId(null);
    setEditingText("");
  };

  // TODO: 7. 할 일 수정을 취소하고 원래 상태로 돌리는 함수 구현
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // TODO: 8. 엔터키를 눌렀을 때 할 일을 추가하는 키보드 이벤트 함수 구현
  const handleKeyPress = (e) => {
    // 누른 키가 Enter 키라면 입력
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // 엔터키를 눌렀을 때 수정한 할 일을 저장하는 키보드 이벤트 함수 구현
  const handleKeyPressEdit = (e) => {
    // 누른 키가 Enter 키라면 수정 내용 저장
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  // 전체 할 일의 상태를 완료로 설정하는 이벤트 함수 구현
  const handleSelectAll = () => {
    setTodoList(
      todoList.map((todo) => ({
        ...todo,
        state: "완료",
      }))
    );
  };

  // 전체 할 일의 상태를 미완료로 설정하는 이벤트 함수 구현
  const handleDeselectAll = () => {
    setTodoList(
      todoList.map((todo) => ({
        ...todo,
        state: "미완료",
      }))
    );
  };

  // 할 일 리스트에서 상태가 완료인 할 일을 제거하는 이벤트 함수 구현
  const handleDeleteCompleted = () => {
    setTodoList((todoList) => todoList.filter((todo) => todo.state !== "완료"));
  };

  // 전체 할 일의 상태가 완료인지 확인한 결과 저장 변수
  const allTodosSelected = todoList.every((todo) => todo.state === "완료");

  // 필터링된 할 일 목록 리스트
  const filteredTodoList = todoList.filter((todo) => {
    if (filter === "전체") return true;
    else if (filter === "완료") return todo.state === "완료";
    else if (filter === "미완료") return todo.state === "미완료";
    else return true;
  });

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* TODO: 9. 입력 필드와 사용자 입력값을 연결 */}
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            placeholder="새로운 할 일을 입력하세요..."
            value={newTodo} // 현재 입력된 텍스트 표시
            onChange={(e) => {
              setNewTodo(e.target.value);
            }} // 입력값이 변경될 때마다 상태 업데이트
            onKeyDown={handleKeyPress}
          />
          <button className="add-button" onClick={addTodo}>
            추가
          </button>
        </div>
        {/* TODO: 10. 필터링 기능을 위한 TodoFilter 컴포넌트 import*/}
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

        {/* TODO: 11. 전체 선택/삭제 기능을 위한 TodoActions 컴포넌트 import */}
        <TodoActions
          todoList={todoList}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onDeleteCompleted={handleDeleteCompleted}
          allSelected={allTodosSelected}
        />

        {/* TODO: 12. 필터링된 할 일 목록을 화면에 표시 */}
        <div className="todo-list">
          <div className="todo-items">
            {/* 필터링된 할 일 목록을 map으로 순회하여 각 할 일을 렌더링하도록 수정 */}
            {filteredTodoList.map((todo) => (
              <div key={todo.id} className="advanced-todo-item">
                {/* TODO: 13. 할 일 완료 상태를 체크박스에 연결 */}
                <input
                  className="todo-checkbox"
                  type="checkbox"
                  checked={todo.state === "완료"} // 할 일의 완료 상태 확인
                  onChange={() => toggleTodoState(todo.id)}
                />

                <div className="todo-content">
                  {/* 수정할 할 일의 id와 같은지 확인하고 수정 중일 때는 input 태그를, 일반 상태일 때는 텍스트로 표시 */}
                  {editingId === todo.id ? (
                    <input
                      className="edit-input"
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={handleKeyPressEdit}
                    />
                  ) : (
                    <p
                      className={`todo-text ${
                        todo.state === "완료" ? "completed" : ""
                      }`}
                      /* 14. 할 일 내용을 표시하고 더블클릭으로 수정 모드 전환 */
                      onDoubleClick={() => startEdit(todo.id, todo.job)}
                      style={{ cursor: "pointer" }}
                    >
                      {todo.job}
                    </p>
                  )}
                </div>

                {/* TODO: 15. 할 일의 상태 표시와 수정/삭제 버튼 구현 */}
                <div className="todo-actions">
                  <span
                    className={`todo-badge ${
                      todo.state === "완료" ? "completed" : ""
                    }`}
                  >
                    {todo.state === "완료" ? "완료" : "진행중"}
                  </span>

                  {/* 수정할 할 일의 id와 같은지 확인하고 수정 모드일 때는 저장/취소 버튼을, 일반 모드일 때는 수정/삭제 버튼을 표시 */}
                  {editingId === todo.id ? (
                    <div className="edit-actions">
                      <button className="edit-button" onClick={saveEdit}>
                        ✓
                      </button>
                      <button className="edit-button" onClick={cancelEdit}>
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="edit-actions">
                      <button
                        className="edit-button"
                        onClick={() => startEdit(todo.id, todo.job)}
                      >
                        ✎
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        ×
                      </button>
                    </div>
                  )}
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
