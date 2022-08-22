import React, { useState } from 'react'
import { useEffect } from 'react'

function UserApi() {
const [data,setData] = useState([]);

useEffect(()=>{
    fetch("https://api.github.com/users")
    .then(y => y.json())
    .then(response => {setData(response)})
    console.log(setData);
},[])

  return (
    <>
    <div className='d-flex w-50 p-5'>
 <table>
   

    {data.map((user,index)=>{
        return (
            <tr>
                <td className='p-3'>{user.id}</td>
                <td className='p-3'>{user.login}</td>
                <td className='p-3'><img src={user.avatar_url} alt="images" style={{height:"50px",width:"50px"}} /></td>

                <td className='p-3'><button className='btn btn-success'>BookMark</button></td>
                <td className='p-3'><button className='btn btn-danger' >UnBookmark</button></td>
               
            </tr>
        )
    })}
 </table>
    </div>
    </>
  )
}

export default UserApi