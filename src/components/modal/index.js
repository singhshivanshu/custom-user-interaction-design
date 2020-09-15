import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

function Modal(props) {
  const { show: incomingShow, user } = props;
  const [show, setShow] = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${user.id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setShow(incomingShow);
  }, [incomingShow]);

  const onCloseHandler = () => {
    setShow(false);
    props.setShow(false);
  };

  window.onclick = function () {
    if (show) {
      setShow(false);
      props.setShow(false);
    }
  };

  console.log(data);

  return (
    <div id="modal" style={{ display: show ? "block" : "none" }}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={onCloseHandler}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div class="card-container">
            <img
              class="round"
              src={data && data.data.avatar}
              alt="user"
            />
            <h2>
              {data && data.data.first_name}&nbsp;{data && data.data.last_name}
            </h2>
            <h4>
              <span>Email: &nbsp;</span>
              {data && data.data.email}
            </h4>
            <h5>
              <span>Company: &nbsp;</span>
              {data && data.ad.company}
            </h5>
            <p>{`"${data && data.ad.text}"`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Modal;
