import '../components/shared/styles.css';

function TodoFilter({ currentFilter, onFilterChange, todoList = [] }) {
  // TODO: 1. 필터 옵션들 정의
  const filters = [
    { key: "all", label: "전체", color: "#007bff" },
    { key: "completed", label: "완료", color: "#28a745" },
    { key: "incomplete", label: "미완료", color: "#ffc107" },
  ];

  // 각 필터별 개수 계산 함수
  const getCount = (key) => {
    if (!Array.isArray(todoList)) return 0;
    if (key === "all") return todoList.length;
    if (key === "completed")
      return todoList.filter((todo) => todo.state === "완료").length;
    if (key === "incomplete")
      return todoList.filter((todo) => todo.state === "미완료").length;
    return 0;
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        // marginBottom: "16px",
      }}
    >
      {/* TODO: 2. filters 배열을 map으로 렌더링 */}
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`filter-button ${
            currentFilter === filter.key ? "active" : ""
          }`}
        >
          {filter.label}({getCount(filter.key)})
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
