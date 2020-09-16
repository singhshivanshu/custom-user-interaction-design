import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./modal";

function Home() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [newUsers, setNewUsers] = useState([]);
  let users = [];

  const getUserList = () => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`)
      .then((response) => {
        setData(response.data.data);
        users = response.data.data.slice(0, 4);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserList();
  }, []);

  const onPageChange = (event) => {
    if (data.length < 12) {
      axios
        .get(`https://reqres.in/api/users?page=2`)
        .then((response) => {
          setData(data.concat(response.data.data));
        })
        .catch((error) => console.log(error));
    }
    setPage(Number(event.target.innerHTML));
    setSearch("");
    setNewUsers()
  };

  if (Number(page) === 1) {
    users = data.slice(0, 4);
  } else if (Number(page) === 2) {
    users = data.slice(4, 8);
  } else {
    users = data.slice(8, 12);
  }

  const onSearchFilter = (e) => {
    setSearch(e.target.value);
    if (search.length !== 0) {
      setNewUsers(
        users &&
          users.filter((user) =>
            user.first_name.toLowerCase().includes(e.target.value.toLowerCase())
          )
      );
    }
  };

  let btnOne = Number(page) === 1 ? "active-page" : ''
  let btnTwo = Number(page) === 2 ? "active-page" : ''
  let btnThree = Number(page) === 3 ? "active-page" : ''


  return (
    <div style={{ marginTop: "5%", overflowX: 'auto'}}>
      <div className="input-container">
        <input
          className="search-input"
          value={search}
          onChange={onSearchFilter}
          placeholder="Search user"
        />
        <button className="search-button"><i class="fas fa-search"></i></button>
      </div>
      <div style={{marginTop: "100px"}}>
        <table id="table-container">
          <tbody>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {newUsers && newUsers.length !== 0
              ? newUsers.map((user, index) => {
                console.log(user)
                  return (
                    <React.Fragment key={index}>
                      <tr onClick={() => setShow({ [index]: true })}>
                        <td>
                          <img
                            src={user.avatar}
                            alt={user.first_name}
                            style={{ width: "65px" }}
                          />
                        </td>
                        <td>
                          <p>{`${user.first_name} ${user.last_name}`}</p>
                        </td>
                        <td>
                          <p>{user.email}</p>
                        </td>
                      </tr>
                      <Modal
                        show={show[index]}
                        setShow={setShow}
                        user={user}
                        id={user.id}
                      />
                    </React.Fragment>
                  );
                })
              : users.map((user, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr onClick={() => setShow({ [index]: true })}>
                        <td>
                          <img
                            key= {Date.now()}
                            src={user.avatar}
                            alt={user.first_name}
                            style={{ width: "65px" }}
                          />
                        </td>
                        <td>
                          <p>{`${user.first_name} ${user.last_name}`}</p>
                        </td>
                        <td>
                          <p>{user.email}</p>
                        </td>
                      </tr>
                      <Modal
                        show={show[index]}
                        setShow={setShow}
                        user={user}
                        id={user.id}
                        key = {user.id}
                      />
                    </React.Fragment>
                  );
                })}
          </tbody>
        </table>
      </div>
      <div className="page" onClick={onPageChange}>
        <div className={`page-button ${btnOne}`} id="btn-1">1</div>
        <div className={`page-button ${btnTwo}`} id="btn-2">2</div>
        <div className={`page-button ${btnThree}`} id="btn-3">3</div>
      </div>
    </div>
  );
}

export default Home;
