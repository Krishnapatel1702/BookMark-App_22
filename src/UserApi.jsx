import React, { useState } from 'react'
import { useEffect } from 'react'

function UserApi() {
  const [data, setData] = useState([]);
  const [userids, setUserIds] = useState([]);
  const [searchVal, setsearchVal] = useState();

  const myfetch = () => {
    fetch("https://api.github.com/users")
      .then(y => y.json())
      .then((res) => {
        if (searchVal) {
          const bookdata = res.filter(val => val.login.includes(searchVal));
          setData(bookdata)
        } else {
          const bookdata = res.map((res) => {
            return (
              {
                isBookmarked: false,
                ...res
              })
          })
          setData(bookdata);
        }
      }
      )
  }
  useEffect(() => {
    myfetch()
  }, [])

  useEffect(() => {
    myfetch()
  }, [searchVal])

  const bookmarkbtn = (index) => {
    let bookid = data.find(val => val.id === index);
    bookid.isBookmarked = true;
    setUserIds([...userids, bookid])
  }

  const bookmarkremove = (index) => {
    let removedata = userids.filter(val => val.id !== index);
    let newbookmarkid = data.find(val => val.id === index);
    newbookmarkid.isBookmarked = false;
    setUserIds(removedata)
  }

  return (
    <>
      <div className='container'>
        <div className='row mt-2 pl-3'>
          <div className="col-12">
            <input type="text" onChange={(e) => setsearchVal(e.target.value)} placeholder='search by username' />
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

                  let markbtn = "";
                  if (user.isBookmarked) {
                    markbtn = <button className='btn-danger p-1' onClick={e => bookmarkremove(user.id)}> <i class="bi bi-bookmark-x-fill"></i></button>
                  } else {
                    markbtn = <button className='btn-success p-1' onClick={e => bookmarkbtn(user.id)}>  <i class="bi bi-bookmarks-fill"></i></button>
                  }

                  return (
                    <tr>
                      <td className='p-4' key={user.id}>{user.id}</td>
                      <td className='p-2'>{user.login}</td>
                      <td className='p-3'><img src={user.avatar_url} alt="images" style={{ height: "50px", width: "50px" }} className='rounded-circle' /></td>
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
                return (
                  <tr>
                    <td className='p-4'>{user.id}</td>
                    <td className='p-3'>{user.login}</td>
                    <td className='p-4'><img src={user.avatar_url} alt="images" style={{ height: "50px", width: "50px" }} className='rounded-circle' /></td>
                    <td className='p-3'><button className='btn btn-danger' onClick={e => bookmarkremove(user.id)}><i class="bi bi-bookmark-x-fill"></i></button></td>
                  </tr>
                )
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserApi