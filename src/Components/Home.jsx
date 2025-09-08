import {useNavigate } from "react-router-dom"
import "./Css/Home.css"
import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
  let [details, setDetails]=useState(null)
  let navigate=useNavigate()
  let fetchData=async ()=>{
    let {data}=await axios.get("http://localhost:3000/employee")
    setDetails(data)
  }
  let handleDelete=(id)=>{
    axios.delete(`http://localhost:3000/employee/${id}`)
    location.reload()
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
    <nav>
      <h1>Employee Registry</h1>
      <button onClick={()=>navigate("/createEmp")}>Create Employee</button>
    </nav>
    <main>
      {details == null ? "loading..." : details.map((emp)=>{
        return <article key={emp.id}>
          <div>
          <div><img src={emp.photo} alt={emp.name} height="200px" width="200px" className="img-div"/></div>
          <h1>{emp.name}</h1>
          <p>{emp.email}</p>
          <p>{emp.phone}</p>
          <p>{emp.dob}</p>
          <h3>{emp.designation}</h3>
          </div>
          <div>
          <button onClick={()=>{navigate(`/viewEmp/${emp.id}`)}}>View</button>
          <button onClick={()=>{navigate(`/updateEmp/${emp.id}`)}}>Update</button>
          <button onClick={()=>{handleDelete(emp.id)}}>Delete</button>
          </div>
        </article>
      })}
    </main>
    </>
  )
}
export default Home