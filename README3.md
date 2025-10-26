# 데이터 저장 투두리스트 (3단계)

localStorage를 활용한 데이터 영속성을 구현하는 실습 프로젝트입니다.

## 📋 실습 방법

1. `src/step3/PersistentTodo.jsx` 파일을 엽니다
2. TODO 1번부터 차례로 구현합니다
3. 각 TODO 완성 후 브라우저에서 동작을 확인합니다

## 🎯 TODO 구현 가이드

### TODO 1: localStorage에서 데이터 불러와 초기 상태 설정
useState 초기값에 함수를 전달하여 localStorage에서 저장된 데이터를 불러옵니다. try-catch로 에러 처리를 하고, 데이터가 없으면 initialTodos를 반환합니다.

### TODO 2: todoList 변경시 localStorage에 저장
useEffect로 todoList 변경을 감지하여 localStorage에 JSON.stringify로 변환해서 저장합니다.

### TODO 3: 입력값, 필터, 수정 관련 state들 생성
filter(필터 상태), editingId(수정 중인 ID), editText(수정 텍스트) state를 추가로 생성합니다.

### TODO 4: 새로운 할 일 추가 함수 구현
빈 텍스트를 검증하고, Date.now()로 고유 ID를 생성하여 새 할 일을 추가합니다. 성공하면 입력 필드를 비웁니다.

### TODO 5: 완료/미완료 토글 함수 구현
map으로 해당 ID의 할 일만 state를 토글합니다. 삼항 연산자를 사용해서 '완료'와 '미완료'를 전환합니다.

### TODO 6: 할 일 삭제 함수 구현
filter로 해당 ID를 제외한 새 배열을 생성합니다.

### TODO 7: 할 일 수정 시작 함수 구현
전달받은 id와 currentText로 editingId와 editText state를 설정합니다.

### TODO 8: 수정 내용 저장 함수 구현
빈 텍스트를 검증하고, map으로 해당 ID의 job만 수정합니다. 성공하면 수정 모드를 종료합니다.

### TODO 9: 수정 취소 함수 구현
editingId와 editText를 null과 빈 문자열로 초기화합니다.

### TODO 10: Enter 키로 할 일 추가하는 키보드 이벤트 함수 구현
e.key가 'Enter'일 때 addTodo 함수를 호출합니다.

### TODO 11: 수정 모드에서 Enter/Escape 키 처리 함수 구현
Enter 키는 저장, Escape 키는 취소 함수를 호출합니다.

### TODO 12: 필터에 따라 할 일 목록 필터링
switch문이나 조건문으로 filter 값에 따라 todoList를 필터링한 결과를 저장합니다.

### TODO 13: 할 일 입력 폼 구현
input에 value, onChange, onKeyDown을 연결하고, button에 onClick을 연결합니다.

### TODO 14: 필터 컴포넌트 연결
TodoFilter 컴포넌트에 currentFilter, onFilterChange, todoList props를 전달합니다.

### TODO 15: 할 일 목록 렌더링
filteredTodos가 비어있으면 empty-state를 표시하고, 있으면 map으로 각 할 일을 렌더링합니다.

### TODO 16: 할 일 아이템들 렌더링
filteredTodos.map으로 각 todo를 순회하며 persistent-todo-item 구조로 렌더링합니다.

### TODO 17: 체크박스로 완료 상태 토글 구현
체크박스의 checked를 todo.state와 연결하고, onChange에서 toggleTodo를 호출합니다.

### TODO 18: 수정 모드와 일반 모드 조건부 렌더링 구현
editingId === todo.id로 조건 분기하여 수정 시에는 input, 일반 시에는 p 태그를 렌더링합니다.

### TODO 19: 상태 표시 및 수정/삭제 버튼 구현
todo-badge로 상태를 표시하고, 수정 모드에 따라 다른 버튼들을 렌더링합니다.