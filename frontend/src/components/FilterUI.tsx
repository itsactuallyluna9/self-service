import '../cssFiles/FilterUI.css'

export interface CourseFilter {
    professor: string;
    block: string;
    semester: string;
    department: string;
    fee: string;
    available: string;
    attributes: string;
}

interface FilterUIProps {
  filters: CourseFilter;
  setFilters: React.Dispatch<React.SetStateAction<CourseFilter>>;
  professors: string[];
  departments: string[];
  attributes: string[];
  blocks: string[];
}

function FilterUI({ filters, setFilters, professors, departments, attributes, blocks }: FilterUIProps) {
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
          value={filters.block}
          onChange={(e) => update("block", e.target.value)}
        >
          <option value="">Select</option>
          {blocks.map((block) => (
            <option key={block} value={block}>{block}</option>
          ))}
        </select>

        <label>Semester</label>
        <select
          value={filters.semester}
          onChange={(e) => update("semester", e.target.value)}
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
          value={filters.professor}
          onChange={(e) => update("professor", e.target.value)}
        >
          <option value="">Select</option>
          {professors.map((prof) => (
            <option key={prof} value={prof}>{prof}</option>
          ))}

        </select>
        <label>Department</label>
        <select
          value={filters.department}
          onChange={(e) => update("department", e.target.value)}
        >
          <option value="">Select</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>
      <div className='filter-column'>
        <label>Attributes</label>
        <select
          value={filters.attributes}
          onChange={(e) => update("attributes", e.target.value)}
        >
          <option value="">Select</option>
          {attributes.map((attr) => (
            <option key={attr} value={attr}>{attr}</option>
          ))}

        </select>
      </div>
      
      <div className='checkbox-column'>
        <label>
          <input
            type="checkbox"
            checked={filters.fee === 'true'}
            onChange={(e) => update("fee", e.target.checked ? 'true' : '')}
          />
          Fees Present
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.available === 'true'}
            onChange={(e) => update("available", e.target.checked ? 'true' : '')}
          />
          Seats Available
        </label>
      </div>


    </div>
  );
}

export default FilterUI;
