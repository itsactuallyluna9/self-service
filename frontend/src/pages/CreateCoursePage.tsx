import Navbar from "../components/Navbar"
import '../cssFiles/CreateCourse.css'
import { useState }from 'react'

interface CourseData {
  department: string
  coursecode: number
  professor: string
  session: number
  coursetypes: string
  credits: number
  description: string
  fee: number
  prereqs: string
  seats: number
  title: string
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
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (department == '' || courseCode == '' || professor == '' || block == '' || credits == '' || seats == '' || description == '' || title == '') {
      setError("Please enter all required fields")
      return
    }

    const course: CourseData = {
      department: department,
      coursecode: Number(courseCode),
      professor: professor,
      session: Number(block),
      coursetypes: attributes,
      credits: Number(credits),
      description: description,
      fee: Number(fee),
      prereqs: prereqs,
      seats: Number(seats),
      title: title,
    }
    console.log(JSON.stringify(course))
    console.log(course)
    try {
      const response = await fetch('https://10.101.128.72:6001/api/courses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
            mode: 'cors',
            redirect: 'error'
            })
      console.log("Response:" + response.ok)
      if (!response.ok){
        throw new Error('Failed to create a course')
      }
      return await response.json()
    } catch(err) {
      console.log('An Error Has Occurred' + err)
      setError('An Error Has Occurred, Please Try Again Later')
    }
  }

  return (
    <>
    <Navbar/>
    <div className='create-course'>
      <form onSubmit={handleSubmit}>
        <h1>Create Course</h1>
        <div className="title">
          <label htmlFor="title">Title:</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            placeholder='Required'
            onChange = {(e) => setTitle(e.target.value)}/>
        </div>
        <div className="row">
          <div className="department">
          <label htmlFor="department">Department:</label>
          <input
            type='text'
            name='department'
            id='department'
            value={department}
            placeholder='Required'
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
            placeholder='Required'
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
              placeholder='Required'
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
              placeholder='Required'
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
              placeholder="Enter each attribute with a comma in between"
              value={attributes}
              onChange = {(e) => setAttributes(e.target.value)}
            />
          </div>
          <div className='prereqs'>
            <label htmlFor="prereqs">Prerequisites:</label>
              <input
                type='text'
                name='prereqs'
                id='prereqs'
                placeholder="Enter each prerequisite with a comma in between and a space in between department and course code"
                value={prereqs}
                onChange = {(e) => setPrereqs(e.target.value)}
              />
            </div>
        </div>
        <div className="row">
          <div className="credits">
            <label htmlFor="credits">Credits:</label>
            <input
              type='text'
              name='credits'
              id='credits'
              value={credits}
              placeholder='Required'
              onChange = {(e) => setCredits(e.target.value)}
            />
          </div>
          <div className="fees">
            <label htmlFor="fee">Fees:</label>
            <input
              type='text'
              name='fee'
              id='fee'
              value={fee}
              onChange = {(e) => setFee(e.target.value)}
            />
          </div>
          <div className="seats">
            <label htmlFor="seats">Seats:</label>
            <input
              type='text'
              name='seats'
              id='seats'
              value={seats}
              placeholder='Required'
              onChange = {(e) => setSeats(e.target.value)}
            />
          </div>
        </div>
        <div className="description">
          <label htmlFor="description">Description:</label>
          <textarea
            name='description'
            id='description'
            value={description}
            placeholder='Required'
            onChange = {(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  )
}
export default CreateCoursePage