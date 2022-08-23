import React, { useState } from 'react'
import { useEffect } from 'react'


function UserApi() {
  const [data, setData] = useState([]);
  const [userids, setUserIds] = useState([]);
  const [btn, setBtn] = useState([]);
  const [Val, setVal] = useState()  

 const myfetch = () => {
    fetch("https://api.github.com/users")
      .then(y => y.json())
      .then((res) => {
        if (Val) {
          const bookdata = res.filter((res)=>res.login.includes(Val)) 
          setData(bookdata)
        }
        else {
          const bookdata = res.map((res) => {
            return (
              {
                isBookmarked: false,
                ...res
              })
          })

          setData(bookdata)
        
        }
      })
  }

  useEffect(() => {
    myfetch()
  }, [])

  useEffect(() => {
    myfetch()
  }, [Val])



  const bookmarkbtn = (index) => {
    setBtn("unbookmark")
    let bookid = data.find(val => val.id === index);
    bookid.isBookmarked = true;
    setUserIds([...userids, bookid])
  
  }

  const bookmarkremove = (index) => {
    //////console.log(index);
    let removedata = userids.filter(val => val.id !== index);
    let newbookmarkid = data.find(val => val.id === index);

    newbookmarkid.isBookmarked = false;
    setUserIds(removedata)

    // //////console.log("unbookmark", newbookmarkid);
  }
  return (
    <>
      <div className='container'>
        <div className='row mt-2 pl-3'>
          <div className='col-12'>
            <input type="text" placeholder='search by username...' onChange={(e) => setVal(e.target.value)} />
          </div>
        </div>
        <div className='d-flex '>
          {/*userlist*/}
          <div className="w-50 p-3">
            <h1 className='text-center'>UserList</h1>
            <table >
              <thead>
                <th>UserID</th>
                <th>UserNAME</th>
                <th>UserIMAGE</th>
              </thead>

              <tbody>
                {data.map((user) => {
                  //  //////console.log(data);
                  //  //////console.log(user.id);
                  let markbtn = "";
                  ////console.log(user.isBookmarked);
                  if (user.isBookmarked) {

                    // ////console.log("unbookmark");
                    markbtn = <button className='btn-danger p-1' onClick={e => bookmarkremove(user.id)}> <i class="bi bi-bookmark-x-fill"></i></button>
                  } else {
                    // ////console.log("bookmark");
                    markbtn = <button className='btn-success p-1' onClick={e => bookmarkbtn(user.id)}>  <i class="bi bi-bookmarks-fill"></i></button>
                  }

                  return (
                    <tr>
                      <td className='p-4' key={user.id}>{user.id}</td>
                      <td className='p-2'>{user.login}</td>
                      <td className='p-3'><img src={user.avatar_url} alt="images" style={{ height: "50px", width: "50px" }} className='rounded-circle' /></td>

                      {/* <td className='p-3'><button className='btn btn-success' onClick={e => bookmarkbtn(user.id)}>BookMark</button></td> */}
                      {/* <td className='p-3'><button className='btn btn-danger' onClick={e => bookmarkremove(user.id)} >UnBookmark</button></td> */}
                      <td>{markbtn}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* bookmark list */}
          <div className="w-50 p-3 border-left">
            <h1 className='text-center'>BookMark-List</h1>
            <table className='justify-content-between'>
              <th>UserID</th>
              <th>UserNAME</th>
              <th>UserIMAGE</th>


              {userids.map((user) => {
                // ////console.log(userids);


                return (
                  <tr>
                    <td className='p-4'>{user.id}</td>
                    <td className='p-3'>{user.login}</td>
                    <td className='p-4'><img src={user.avatar_url} alt="images" style={{ height: "50px", width: "50px" }} className='rounded-circle' /></td>

                    <td className='p-3'><button className='btn btn-danger' onClick={e => bookmarkremove(user.id)}><i class="bi bi-bookmark-x-fill"></i></button></td>

                  </tr>
                )
                ////console.log(userids);
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserApi