import './FilterUI.css'

export interface CourseFilter {
    PROFESSOR: string;
    BLOCKNUM: string;
    SEMESTER: string;
    DEPARTMENT: string;
    FEES: string;
    AVAILABLE: string;
    ATTRIBUTES: string;
}

interface FilterUIProps {
  filters: CourseFilter;
  setFilters: React.Dispatch<React.SetStateAction<CourseFilter>>;
}

function FilterUI({ filters, setFilters }: FilterUIProps) {
  const update = (key: keyof CourseFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filter-ui">
      <label>Professor</label>
      <select
        value={filters.PROFESSOR}
        onChange={(e) => update("PROFESSOR", e.target.value)}
      >
        <option value="">Select</option>
      </select>

      <label>Block</label>
      <select
        value={filters.BLOCKNUM}
        onChange={(e) => update("BLOCKNUM", e.target.value)}
      >
        <option value="">Select</option>
        {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
      <option key={num} value={num.toString()}>
        Block {num}
      </option>
    ))}
      </select>

      <label>Semester</label>
      <select
        value={filters.SEMESTER}
        onChange={(e) => update("SEMESTER", e.target.value)}
      >
        <option value="">Select</option>
        <option value="Fall">Fall</option>
        <option value="Spring">Spring</option>
        <option value="Summer">Summer</option>
      </select>

      <label>Department</label>
      <select
        value={filters.DEPARTMENT}
        onChange={(e) => update("DEPARTMENT", e.target.value)}
      >
        <option value="">Select</option>
      </select>

       <label>Attributes</label>
      <select
        value={filters.ATTRIBUTES}
        onChange={(e) => update("ATTRIBUTES", e.target.value)}
      >
        <option value="">Select</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={filters.FEES === 'true'}
          onChange={(e) => update("FEES", e.target.checked ? 'true' : '')}
        />
        Fees Present
      </label>

      <label>
        <input
          type="checkbox"
          checked={filters.AVAILABLE === 'true'}
          onChange={(e) => update("AVAILABLE", e.target.checked ? 'true' : '')}
        />
        Seets Available
      </label>


    </div>
  );
}

export default FilterUI;
