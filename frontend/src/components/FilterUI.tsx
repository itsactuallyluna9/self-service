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
  professors: string[];
  departments: string[];
  attributes: string[];
}

function FilterUI({ filters, setFilters/*, professors, departments, attributes*/ }: FilterUIProps) {
  const update = (key: keyof CourseFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filter-ui">
      <h2>Advanced Search</h2>
      <h3>Schedule Details</h3>
      <hr />
      <div className='filter-column'>
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
      </div>

      <h3>Course Details</h3>
      <hr />
      <div className='filter-column'>
        <label>Professor</label>
        <select
          value={filters.PROFESSOR}
          onChange={(e) => update("PROFESSOR", e.target.value)}
        >
          <option value="">Select</option>
          {/* {professors.map((prof) => (
            <option key={prof} value={prof}>{prof}</option>
          ))} */}

        </select>
        <label>Department</label>
        <select
          value={filters.DEPARTMENT}
          onChange={(e) => update("DEPARTMENT", e.target.value)}
        >
          <option value="">Select</option>
          {/* {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))} */}
        </select>
      </div>
      <div className='filter-column'>
        <label>Attributes</label>
        <select
          value={filters.ATTRIBUTES}
          onChange={(e) => update("ATTRIBUTES", e.target.value)}
        >
          <option value="">Select</option>
          {/* {attributes.map((attr) => (
            <option key={attr} value={attr}>{attr}</option>
          ))} */}

        </select>
      </div>
      
      <div className='checkbox-column'>
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
          Seats Available
        </label>
      </div>


    </div>
  );
}

export default FilterUI;
