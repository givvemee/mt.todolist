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

  const [newDo,setNewDo] = useState(""); // newDo는 상태를 담는 변수, 할 일 들이 변수에 저장, setNewDo로 값 업데이트

  // TODO: 2. 할 일 추가 함수 구현
  const addTodo = () => { 
    const  newTodoList = [...todoList, {job : newDo, state: "미완료"}]; // 스프레드 연산자로 원래 todoList 복사하여 추가한값을 넣어줌
    setTodoList(newTodoList); // 목록 업데이트
    setNewDo(""); // 업데이트 입력칸 비우기
    };

  // TODO: 3. 완료/미완료 토글 함수 구현
  const toggleTodoState = (index) => {
    const newTodoList = [...todoList] // 기존배열 복사
    newTodoList[index].state = newTodoList[index].state === "완료" ? "미완료" : "완료" ; // index 항목을 찾아 state 값을 새로운 값으로 변경 (완료면 미완료 else 완료)
    setTodoList(newTodoList) // 목록 업데이트
   };

  // TODO: 4. 할 일 삭제 함수 구현
  const deleteTodo = (index) => {
    const newTodoList = todoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
    };

  // TODO: 5. Enter 키 처리 함수 (한국어 입력 고려)
  const handleKeyDown = (e) => { 
    if(e.key === 'Enter') {
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
            // value={} // 1번의 state 적용
            onChange={(e) => { }} // 1번의 setState 적용
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
                  toggleTodoState={toggleTodoState}
                  deleteTodo={deleteTodo}
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
