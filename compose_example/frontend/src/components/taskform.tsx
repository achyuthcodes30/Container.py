import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const page2ref = useRef(null);
  const inputref = useRef(null);
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    deadline: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const isoDeadline = new Date(task.deadline).toISOString();
      await axios.post(`/backend/`, {
        title: task.title,
        deadline: isoDeadline,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating task" + error);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="layout" ref={page2ref}>
      <h1
        data-aos="fade-down"
        data-aos-duration="1200"
        data-aos-easing="ease-sine"
        data-aos-delay="400"
        className="new-task"
      >
        New Task
      </h1>
      <div className="task-box">
        <form onSubmit={handleSubmit} ref={inputref} className="form">
          <div
            data-aos="fade-right"
            data-aos-duration="1800"
            data-aos-easing="ease-sine"
            data-aos-delay="2800"
            className="entry"
          >
            <h1 className="entry-title">Title:</h1>
            <input
              type="text"
              name="title"
              className="input"
              required
              placeholder="Enter task title"
              onChange={handleInputChange}
            />
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="1800"
            data-aos-easing="ease-sine"
            data-aos-delay="2800"
            className="entry"
          >
            <h1 className="entry-title">Deadline (if any):</h1>
            <input
              name="deadline"
              type="datetime-local"
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div
            data-aos="flip-up"
            data-aos-duration="1800"
            data-aos-easing="ease-sine"
            data-aos-delay="2800"
            className="submit-div"
          >
            <button type="submit" className="submit">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
