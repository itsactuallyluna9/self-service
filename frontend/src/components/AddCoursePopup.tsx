import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../cssFiles/AddCoursePopup.css';

interface AddCourseModalProps {
  isOpen: boolean;
  onConfirm: (data: AddCourseData) => void;
  onCancel: () => void;
}

interface AddCourseData {
  professor: string;
  academicyear: number | "";
  blocknum: string;
  openseats: number | "";
  session: string;
  totalseats: number | null;
}

interface FieldsUIProps {
  professors: string[];
  years: string[];
  departments: string[];
  blocks: string[];
}

const modalRoot = document.getElementById('modal-root');

const AddCourseModal = ({ isOpen, onConfirm, onCancel }: AddCourseModalProps) => {

// States for dropdown options. CarterLampe 12/16/2025.
    const [departments, setDepartments] = useState<string[]>([]);
    const [professors, setProfessors] = useState<string[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const [blocks, setBlocks] = useState<string[]>([])

// Fetch options when page loads. CarterLampe 12/16/2025.
    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const deptResponse = await fetch("https://10.101.128.72:6001/api/filter/options/departments");
                setDepartments(await deptResponse.json() || []);
                const profResponse = await fetch("https://10.101.128.72:6001/api/filter/options/professors");
                setProfessors(await profResponse.json() || []);
                const yearResponse = await fetch("https://10.101.128.72:6001/api/filter/options/years");
                setYears(await yearResponse.json() || []);
                const blockResponse = await fetch("https://10.101.128.72:6001/api/filter/options/blocks");
                setBlocks(await blockResponse.json() || []);
            } catch (err) {
            console.error("Failed to fetch filter options", err);
            }
        };

        fetchDropdowns();
    }, []);






  const [addCourseData, setAddCourseData] = React.useState<AddCourseData>({
    academicyear: "",
    openseats: "",
    session: "",
    professor: "",
    blocknum: "",
    totalseats: null,
  });

  if (!isOpen || !modalRoot) return null;

  // Helper for numeric input
  const handleNumberChange = (field: keyof AddCourseData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddCourseData({
      ...addCourseData,
      [field]: e.target.value === "" ? "" : Number(e.target.value),
    });
  };

  return ReactDOM.createPortal(
    <div className="addcourse-modal-overlay" onClick={onCancel}>
      <div className="addcourse-modal-content" onClick={(e) => e.stopPropagation()}>

        <div className="addcourse-modal-fields">

          <div className="addcourse-session-select">
            <label>Session:</label>
            <select
              value={addCourseData.session}
              onChange={(e) => setAddCourseData({ ...addCourseData, session: e.target.value })}
            >
              <option value="">Select</option>
                {blocks.map((block) => (
            <option key={block} value={block}>{block}</option>
          ))}
              
            </select>
            <label>Professor:</label>
            <select
              value={addCourseData.professor}
              onChange={(e) => setAddCourseData({ ...addCourseData, professor: e.target.value })}
            >
                <option value="">Select Professor</option>
                {professors.map((professor) => (
                <option key={professor} value={professor}>{professor}</option>
                ))}
            </select>

            <label>Year:</label>
            <select
              value={addCourseData.academicyear}
              onChange={(e) => setAddCourseData({ ...addCourseData, academicyear: Number(e.target.value) })}
            >
                <option value="">Select Year</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
            </select>

          </div>

          <div className="addcourse-input-fields">

            <label>Total Seats:</label>
            <input
              type="number"
              placeholder="Total Seats"
              value={addCourseData.totalseats ?? ""}
              onChange={handleNumberChange("totalseats")}
            />

          </div>

        </div>

        <div className="addcourse-modal-buttons">
          <button onClick={onCancel} className="addcourse-cancel-button">Cancel</button>
          <button onClick={() => onConfirm(addCourseData)} className="addcourse-confirm-button">Add Course</button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default AddCourseModal;
