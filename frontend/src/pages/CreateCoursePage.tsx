import Navbar from "../components/Navbar"
import '../cssFiles/CreateCourse.css'
import { useState }from 'react'

interface CourseData {
  department: string
  courseCode: number
  professor: string
  block: number
  attributes: string | null
  credits: number
  description: string
  fee: number | null
  prereqs: string | null
  seats: number
}

function CreateCoursePage() {
  const [department, setDepartment] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [professor, setProfessor] = useState('')
  const [block, setBlock] = useState('')
  const [attributes, setAttributes] = useState('')
  const [credits, setCredits] = useState('')
  const [description, setDescription] = useState('')
  const [fee, setFee] = useState('')
  const [prereqs, setPrereqs] = useState('')
  const [seats, setSeats] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const course: CourseData = {
      department: department,
      courseCode: Number(courseCode),
      professor: professor,
      block: Number(block),
      attributes: attributes,
      credits: Number(credits),
      description: description,
      fee: Number(fee),
      prereqs: prereqs,
      seats: Number(seats)
    }

    console.log(course)
    try {
      const response = await fetch('https://10.101.128.56:6001/api/create-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
            })
      return response.ok
    } catch(err) {
      console.log('An Error Has Occurred' + err)
    }

  }

  return (
    <>
    <Navbar/>
    <div className='create-course'>
      <form>
        <h1>Create Course</h1>
        <div className="row">
          <div className="department">
          <label htmlFor="department">Department:</label>
          <input
            type='text'
            name='department'
            id='department'
            value={department}
            onChange = {(e) => setDepartment(e.target.value)}
          />
          </div>
          <div className="course-code">
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type='text'
            name='courseCode'
            id='courseCode'
            value={courseCode}
            onChange = {(e) => setCourseCode(e.target.value)}
          />
          </div>
          <div className="professor">
            <label htmlFor="professor">Professor:</label>
            <input
              type='text'
              name='professor'
              id='professor'
              value={professor}
              onChange = {(e) => setProfessor(e.target.value)}
            />
          </div>
          <div className="block">
            <label htmlFor="block">Block:</label>
            <input
              type='text'
              name='block'
              id='block'
              value={block}
              onChange = {(e) => setBlock(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="attributes">
            <label htmlFor="attributes">Attributes:</label>
            <input
              type='text'
              name='attributes'
              id='attributes'
              value={attributes}
              onChange = {(e) => setAttributes(e.target.value)}
            />
          </div>
        </div>
        <label htmlFor="credits">Credits:</label>
        <input
          type='text'
          name='credits'
          id='credits'
          value={credits}
          onChange = {(e) => setCredits(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          type='text'
          name='description'
          id='description'
          value={description}
          onChange = {(e) => setDescription(e.target.value)}
        />
        <label htmlFor="fee">Fees:</label>
        <input
          type='text'
          name='fee'
          id='fee'
          value={fee}
          onChange = {(e) => setFee(e.target.value)}
        />
        <label htmlFor="prereqs">Prerequisites:</label>
        <input
          type='text'
          name='prereqs'
          id='prereqs'
          value={prereqs}
          onChange = {(e) => setPrereqs(e.target.value)}
        />
        <label htmlFor="seats">Seats:</label>
        <input
          type='text'
          name='seats'
          id='seats'
          value={seats}
          onChange = {(e) => setSeats(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
    </>
  )
}
export default CreateCoursePage