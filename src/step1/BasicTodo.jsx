import { useState } from "react";
import TodoItem from "./TodoItem";
import "./BasicTodo.css";
import "../components/shared/styles.css";

const BasicTodo = () => {
  const [todoList, setTodoList] = useState([
    { job: "장보기", state: "완료" },
    { job: "산책하기", state: "미완료" },
  ]);
  // TODO: 1. 할 일 입력을 위한 state 생성 => useState( // 초기값 )
  const [newTodo, setNewTodo] = useState(""); // state, setState
  const [isComposing, setIsComposing] = useState(false);
  // TODO: 2. 할 일 추가 함수 구현
  // 불변성 지키기 => 원본 배열을 그대로 수정하지 않기
  const addTodo = () => { 
      // if(newTodo === "") return; // 공백 입력 방지
      // if(!newTodo) return; falsy 값 => 빈문자열 처리 주로 이렇게 사용
     if (newTodo.trim() === "") return; // early return
     const updatedTodoList = [
       ...todoList,
       {
         job: newTodo,
         state: "미완료",
       },
     ];
     setTodoList(updatedTodoList);
     setNewTodo("")
     //setTodoList([...todoList, { job: newTodo, state: "미완료" }]);
  };

  // TODO: 3. 완료/미완료 토글 함수 구현
  const toggleTodoState = (index) => { 
    // const toggledTodoList = [...todoList]; 
    // 해당 index를 가진 배열의 객체 요소의 staste 값을 반대로 토글링!
    // toggledTodoList[index].state = toggledTodoList[index].state === "완료" ? "미완료" : "완료";
    const toggledTodoList = todoList.map((todo, i) =>
      i === index
        ? { ...todo, state: todo.state === "완료" ? "미완료" : "완료" }
        : todo
    );
    //map => 새로운 배열 반환 좀 더 깔끔 할 수 있다.
    setTodoList(toggledTodoList);
  };

  // TODO: 4. 할 일 삭제 함수 구현
  const deleteTodo = (index) => {
    const deletedTodoList = todoList.filter((_, i) => i !== index); 
    // item, index => _ , i => _ 언더바는 사용하지 않는다는 의미
    // map, fileter => map((item, index) => {}) 객체와 인덱스
    setTodoList(deletedTodoList);
  };

  // TODO: 5. Enter 키 처리 함수 (한국어 입력 고려)
  const handleKeyDown = (e) => { // event를 받음. keyboradEvent
    //console.log(e.key,e.nativeEvent.isComposing);
    //if (e.nativeEvent.isComposing) return; // 조합 중이면 무시
    if (e.key === "Enter" && !isComposing) {
      addTodo();
    }
    // if(e.key !== "Enter") return;
    // addTodo();
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
              //지금 내가 발생시키고 있는 요소의 값을 가져와 변경
            }} // 1번의 setState 적용
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
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
