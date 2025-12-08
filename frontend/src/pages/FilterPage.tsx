import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FilterUI, { type CourseFilter } from "../components/FilterUI";
import './FilterPage.css'
import Navbar from '../components/Navbar'

function FilterPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<CourseFilter>({
    PROFESSOR: "",
    BLOCKNUM: "",
    SEMESTER: "",
    DEPARTMENT: "",
    FEES: "false",
    AVAILABLE: "false",
    ATTRIBUTES: "",
  });

    // State for dropdown options
    const [professors, setProfessors] = useState<string[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);
    const [attributes, setAttributes] = useState<string[]>([]);

    // Fetch options when page loads
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const response = await fetch("/api/filter-options"); // change this
                const data = await response.json();

                setProfessors(data.professors || []);
                setDepartments(data.departments || []);
                setAttributes(data.attributes || []);
            } catch (err) {
            console.error("Failed to fetch filter options", err);
            }
        };

        fetchDropdowns();
    }, []);


  const handleApply = async () => {
    const params = new URLSearchParams({
      professor: filters.PROFESSOR,
      block: filters.BLOCKNUM,
      semester: filters.SEMESTER,
      department: filters.DEPARTMENT,
      fees: filters.FEES,
      available: filters.AVAILABLE,
      attributes: filters.ATTRIBUTES,
    });

    const res = await fetch(`/api/classes?${params.toString()}`);
    const data = await res.json();

    navigate("/classes", { state: { classes: data } });
  };

  return (
    <>
    <Navbar />
    <div className="filter-page">
      <FilterUI 
      filters={filters} 
      setFilters={setFilters}
      professors={professors}
      departments={departments}
      attributes={attributes} 
      />

        <div className="button-container">
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={handleApply}>Apply</button>
        </div>
    </div>
    </>
  );
}

export default FilterPage;
