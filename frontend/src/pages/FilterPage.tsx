import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FilterUI, { type CourseFilter } from "../components/FilterUI";
import '../cssFiles/FilterPage.css'
import Navbar from '../components/Navbar'

interface filterParams {
  professor: string | null
  block: string
  semester: string
  department: string | null
  fees: string
  available: string
  attributes: string | null
}

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
    const params: filterParams = { 
      professor: filters.PROFESSOR,
      block: filters.BLOCKNUM,
      semester: filters.SEMESTER,
      department: filters.DEPARTMENT,
      fees: filters.FEES,
      available: filters.AVAILABLE,
      attributes: filters.ATTRIBUTES,
    };

    const res = await fetch(`https://10.101.128.56:6001/api/courses?`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)});
    const data = await res.json();
    console.log(data)
    navigate("/CourseInformationPage", { state: { classes: data } });
  };

  const handleClear = () => {
      setFilters({
        PROFESSOR: "",
        BLOCKNUM: "",
        SEMESTER: "",
        DEPARTMENT: "",
        FEES: "false",
        AVAILABLE: "false",
        ATTRIBUTES: ""
      });
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
            <div className="button-right">
              <button className="clear-button" onClick={handleClear}>Clear</button>
              <button onClick={handleApply}>Apply</button>
            </div>
        </div>
    </div>
    </>
  );
}

export default FilterPage;
