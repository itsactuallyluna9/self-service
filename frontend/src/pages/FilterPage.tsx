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
    professor: "",
    block: "",
    semester: "",
    department: "",
    fee: "false",
    available: "false",
    attributes: "",
  });

    // State for dropdown options
    const [professors, setProfessors] = useState<string[]>([]);
    const [departments, setDepartments] = useState<string[]>([]);
    const [attributes, setAttributes] = useState<string[]>([]);
    const [blocks, setBlocks] = useState<string[]>([]);

    // Fetch options when page loads
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const deptResponse = await fetch("https://10.101.128.56:6001/api/filter/options/departments");
                setDepartments(await deptResponse.json() || []);
                const profResponse = await fetch("https://10.101.128.56:6001/api/filter/options/professors");
                setProfessors(await profResponse.json() || []);
                const attrResponse = await fetch("https://10.101.128.56:6001/api/filter/options/attributes");
                setAttributes(await attrResponse.json() || []);
                const blockResponse = await fetch("https://10.101.128.56:6001/api/filter/options/blocks");
                setBlocks(await blockResponse.json() || []);
            } catch (err) {
            console.error("Failed to fetch filter options", err);
            }
        };

        fetchDropdowns();
    }, []);


  const handleApply = async () => {
    const params: filterParams = { 
      professor: filters.professor,
      block: filters.block,
      semester: filters.semester,
      department: filters.department,
      fees: filters.fee,
      available: filters.available,
      attributes: filters.attributes,
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
        professor: "",
        block: "",
        semester: "",
        department: "",
        fee: "false",
        available: "false",
        attributes: "",
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
      blocks={blocks}
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
