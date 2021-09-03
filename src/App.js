import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //initial state of class
  const [classGrade, setClassGrade] = useState("");
  //initial state of list is empty i.e. null then you set it on mount
  const [students, setStudents] = useState([]);

  //on mount fetch data
  useEffect(() => {
    //pass the input as string parameter to the fetch call
    const getResultsOfClass = async () => {
      try {
        const callToApi = await fetch("data.json");
        const data = await callToApi.json();
        setStudents(data);
      } catch (e) {
        console.log(e, "There has been some kind of error");
      }
    };
    getResultsOfClass();
  }, []);

  //Find the Best 3 students using
  // 1. To know who is best, add the marks for students.
  // 2. Only the marks that are more than 33% of maximum marks can be added
  // 3. Maximum marks for this evaluation are to be set to 50

  //looping over each student
  const studentsTotalMarks = students.map(({ name, marks }) => {
    //condition
    const percentage = 33;
    const maxEval = 50;
    const totalMaxMarks =(marks.length * maxEval)  // 200
    const minimumTotal = (percentage * totalMaxMarks / 100) // 66

    //data
    const arrayOfMarks = marks.map(({ marks }) => marks);
    const totalMarks = arrayOfMarks.reduce((total, current) => total + current)
    return { name, totalMarks };
  });

  console.log(studentsTotalMarks, "arr");
  

  return (
    <div className="App">
      <h3>Filter students using their class</h3>
      <div>
        <input onChange={(e) => setClassGrade(e.target.value)} />
      </div>
      <h3>List of all students from all class</h3>
      <div>
        {students
          .filter((student) => {
            return student.class.includes(classGrade);
          })
          .map((item, idx) => {
            return (
              <li key={idx}>{`${item.name.first} is from ${item.class}`}</li>
            );
          })}
      </div>
      <h2>Total Marks</h2>
      {studentsTotalMarks.map((item, index) => {
        return (
          <li
            key={index}
          >{`${item.name.first} obtained a total of ${item.totalMarks} marks [English(), Maths(), Physics, Chemistry()]`}</li>
        );
      })}
      <div>
        <div>
          <h3>Best 3 Students / sorted descending order</h3>
          {studentsTotalMarks.sort((a , b) => b.totalMarks - a.totalMarks).slice(0, 3).map((item, index) => {
            return (
              <li
                key={index}
              >{`${item.name.first} obtained a total of ${item.totalMarks} marks [English(), Maths(), Physics, Chemistry()] & got ${index + 1} poisition`}</li>
            );
          })}
        </div>
        <div>
        <h3>Students that pass required 33% of total 200 marks</h3>
          {
            studentsTotalMarks.filter((item) => item.totalMarks >= 66).map((item) => {
              return <li
              key={item.name.first}
            >{`${item.name.first} obtained a total of ${item.totalMarks} marks [English(), Maths(), Physics, Chemistry()]`}</li>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
