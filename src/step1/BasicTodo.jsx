import { useState } from "react";
import TodoItem from "./TodoItem";
import "./BasicTodo.css";
import "../components/shared/styles.css";

const BasicTodo = () => {
  const [todoList, setTodoList] = useState([
    { job: "장보기", state: "완료" },
    { job: "산책하기", state: "미완료" },
  ]);
  // TODO: 1. 할 일 입력을 위한 state 생성
  const [newTodo, setNewTodo] = useState("");
  // TODO: 2. 할 일 추가 함수 구현
  const addTodo = () => { 
     if (newTodo.trim() === "") return;
     const updatedTodoList = [
       ...todoList,
       {
         job: newTodo,
         state: "미완료",
       },
     ];
     setTodoList(updatedTodoList);
     setNewTodo("")
  };

  // TODO: 3. 완료/미완료 토글 함수 구현
  const toggleTodoState = (index) => { 
    // const toggledTodoList = [...todoList]; 
    // toggledTodoList[index].state =
    // toggledTodoList[index].state === "완료" ? "미완료" : "완료";
    const toggledTodoList = todoList.map((todo, i) =>
      i === index
        ? { ...todo, state: todo.state === "완료" ? "미완료" : "완료" }
        : todo
    );
    setTodoList(toggledTodoList);
  };

  // TODO: 4. 할 일 삭제 함수 구현
  const deleteTodo = (index) => {
    const deletedTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(deletedTodoList);
  };

  // TODO: 5. Enter 키 처리 함수 (한국어 입력 고려)
  const handleKeyDown = (e) => {
    //console.log(e.key, e.nativeEvent.isComposing);
    if (e.key === "Enter" && e.nativeEvent.isComposing) {
      addTodo();
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-card">
        {/* TODO: 6. 입력 폼 구현 */}
        <div className="input-container">
          <input
            className="todo-input"
            type="text"
            placeholder="새로운 할 일을 입력하세요..."
            /* TODO: 7. input 값 채우기 */
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
            }} // 1번의 setState 적용
            onKeyDown={handleKeyDown}
          />
          <button className="add-button" onClick={addTodo}>
            추가
          </button>
        </div>

        {/* TODO: 8. 할 일 목록 렌더링 */}
        <div className="todo-list">
          {todoList.length === 0 ? (
            <div className="empty-state">
              <p className="empty-text">할 일이 없습니다</p>
              <p className="empty-subtext">새로운 할 일을 추가해보세요</p>
            </div>
          ) : (
            <div className="todo-items">
              {todoList.map((todo, index) => (
                <TodoItem
                  key={index}
                  todo={todo}
                  index={index}
                  onToggle={toggleTodoState}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicTodo;
