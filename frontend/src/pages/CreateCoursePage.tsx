import Navbar from "../components/Navbar"
import '../cssFiles/CreateCourse.css'
import { useState }from 'react'

interface CourseData {
  department: string
  coursecode: number
  coursetypes: string
  credits: number
  description: string
  fee: number
  prereqs: string
  title: string
}

function CreateCoursePage() {
  
  if (
      localStorage.getItem('UserType') != 'REGISTRAR'){
        return (
          <p>Access restricted</p>
        )
      }

  const [department, setDepartment] = useState('')
  const [courseCode, setCourseCode] = useState('')
  const [attributes, setAttributes] = useState('')
  const [credits, setCredits] = useState('')
  const [description, setDescription] = useState('')
  const [fee, setFee] = useState('')
  const [prereqs, setPrereqs] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (department == '' || courseCode == '' || credits == '' || description == '' || title == '') {
      setError("Please enter all required fields")
      return
    }
    else (
    setError("Successfully created course"))

    const course: CourseData = {
      department: department,
      coursecode: Number(courseCode),
      coursetypes: attributes,
      credits: Number(credits),
      description: description,
      fee: Number(fee),
      prereqs: prereqs,
      title: title,
    }
    console.log(JSON.stringify(course))
    console.log(course)
    try {
      const response = await fetch('https://10.101.128.72:6001/api/courses/create_new_course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
            mode: 'cors',
            redirect: 'error'
            })
      console.log("Response: " + response.ok)
      if (!response.ok){
        throw new Error('Failed to create a course')
      }
      return await response.json()
    } catch(err) {
      console.log('An Error Has Occurred ' + err)
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
            type='number'
            name='courseCode'
            id='courseCode'
            value={courseCode}
            placeholder='Required'
            onChange = {(e) => setCourseCode(e.target.value)}
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
              type='number'
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
              type='number'
              name='fee'
              id='fee'
              value={fee}
              onChange = {(e) => setFee(e.target.value)}
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