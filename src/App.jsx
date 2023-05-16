import { useEffect, useState } from 'react'

function App() {
  const [students, setStudents] = useState([{ 'aspek_penilaian_1': null, 'aspek_penilaian_2': null, 'aspek_penilaian_3': null, 'aspek_penilaian_4': null }])
  const score = ['-',1,2,3,4,5,6,7,8,9,10]
  const [save, setSave] = useState(false)

  useEffect(()=>{
    let isComplete = true
    for (let i = 0; i < students.length; i++) {
      const student = students[i]
      for (const key in student) {
        if (student[key] === null) {
          isComplete = false
        }
      }
    }
    setSave(!isComplete)
  },[students])

  const handleAddStudents = () => {
    setStudents([ ...students, { 'aspek_penilaian_1': null, 'aspek_penilaian_2': null, 'aspek_penilaian_3': null, 'aspek_penilaian_4': null }])
  }

  const handleScoreChanges = (e) => {
    const { name, value } = e.target
    const studentIndex = +name.split('&')[1]
    const scoreIndex = name.split('&')[0]

    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      updatedStudents[studentIndex] = {
        ...updatedStudents[studentIndex],
        [scoreIndex]: +value,
      };
      console.log(updatedStudents)
      return updatedStudents;
    })
  }

  const handleDownload = () => {
    const transformedObject = students.reduce((result, student, index) => {
      for (const key in student) {
        if (!result[key]) {
          result[key] = {};
        }
        const mahasiswaKey = `mahasiswa_${index + 1}`;
        result[key][mahasiswaKey] = student[key];
      }
      return result;
    }, {});

    const json = JSON.stringify(transformedObject, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.target = '_blank'
    link.download = `penilaian_mahasiswa.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='flex p-12 items-center justify-center'>
      <div className='w-[900px]'>
        <h1 className='flex items-center justify-center text-3xl font-semibold w-full'>Aplikasi Penilaian Mahasiswa</h1>
          {/* Table Header */}
          <div className='mt-12 grid grid-cols-5 border-b font-semibold'>          
            <div></div>
            <div className='w-full px-6'>
              <p className='text-center'>Aspek Penilaian 1</p>
            </div>
            <div className='w-full px-6'>
              <p className='text-center'>Aspek Penilaian 2</p>
            </div>
            <div className='w-full px-6'>
              <p className='text-center'>Aspek Penilaian 3</p>
            </div>
            <div className='w-full px-6'>
              <p className='text-center'>Aspek Penilaian 4</p>
            </div>
          </div>

          {/* Table Data */}
          {
            students.map((student, studentId)=>(
              <div className={`grid grid-cols-5 py-1 px-2 relative w-full ${studentId%2==1?'bg-gray-200':''}`} key={`mahasiswa${studentId+1}`}>          
                <div className='w-full flex gap-2 items-center px-1'>
                  <img src="https://cdn-icons-png.flaticon.com/512/9706/9706583.png" alt="user" className='w-6 h-6'/>
                  Mahasiswa {studentId+1}
                </div>
                <div className='w-full px-1'>
                  <select id="aspek_penilaian_1" name={`aspek_penilaian_1&${studentId}`} className='w-full border' onChange={handleScoreChanges} value={students[studentId]['aspek_penilaian_1']===null?'-':students[studentId]['aspek_penilaian_1']}>
                    {
                      score.map((val, index)=>(
                        <option value={val==='-'?null:val} key={index} disabled={val==='-'}>{val}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='w-full px-1'>
                  <select id="aspek_penilaian_2" name={`aspek_penilaian_2&${studentId}`} className='w-full border' onChange={handleScoreChanges} value={students[studentId]['aspek_penilaian_2']===null?'-':students[studentId]['aspek_penilaian_2']}>
                    {
                      score.map((val, index)=>(
                        <option value={val==='-'?null:val} key={index} disabled={val==='-'}>{val}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='w-full px-1'>
                  <select id="aspek_penilaian_3" name={`aspek_penilaian_3&${studentId}`} className='w-full border' onChange={handleScoreChanges} value={students[studentId]['aspek_penilaian_3']===null?'-':students[studentId]['aspek_penilaian_3']}>
                    {
                      score.map((val, index)=>(
                        <option value={val==='-'?null:val} key={index} disabled={val==='-'}>{val}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='w-full px-1'>
                  <select id="aspek_penilaian_4" name={`aspek_penilaian_4&${studentId}`} className='w-full border' onChange={handleScoreChanges} value={students[studentId]['aspek_penilaian_4']===null?'-':students[studentId]['aspek_penilaian_4']}>
                    {
                      score.map((val, index)=>(
                        <option value={val==='-'?null:val} key={index} disabled={val==='-'}>{val}</option>
                      ))
                    }
                  </select>
                </div>
                {
                  (studentId+1 == students.length && studentId+1!==10) &&
                  <button className='absolute -right-6 top-2' onClick={()=>handleAddStudents()}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3394/3394625.png" alt="add" className='w-4 h-4'/>
                  </button>
                }
              </div>
            ))
          }

        <div className='mt-4 w-full flex justify-end'>
          <button className='bg-black text-white px-4 py-1 disabled:bg-gray-300' disabled={save} onClick={handleDownload}>Simpan</button>
        </div>

      </div>

    </div>
  )
}

export default App
