import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

function Modal(props) {
  const { show: incomingShow, user, id } = props;
  const [show, setShow] = useState(null);
  const [data, setData] = useState("");
  const [img, setImg] = useState('')

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setShow(incomingShow);
    setImg(data && data.data.avatar)
  }, [incomingShow]);

  const onCloseHandler = () => {
    setShow(false);
    props.setShow(false);
    setImg('')
  };

  window.onclick = function () {
    if (show) {
      setShow(false);
      props.setShow(false);
      setImg('')
    }
  };

  console.log(img)

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
              key={data && data.data.id}
              class="round"
              src={img}
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
