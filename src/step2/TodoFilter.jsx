import "../components/shared/styles.css";

function TodoFilter({ currentFilter, onFilterChange }) {
  // TODO: 1. 필터 옵션들 정의
  const filters = [
    { key: "all", label: "전체", color: "#007bff" },
    { key: "completed", label: "완료", color: "#28a745" },
    { key: "incomplete", label: "미완료", color: "#ffc107" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        marginBottom: "16px",
      }}
    >
      {/* TODO: 2. filters 배열을 map으로 렌더링 */}
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.label)}
          style={{
            backgroundColor:
              currentFilter === filter.label ? filter.color : "#71717a",
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
