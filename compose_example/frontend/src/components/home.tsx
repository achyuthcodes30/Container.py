import "../styles/Home.css";
import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
  deadline?: Date;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

function Home() {
  const pageRef = useRef(null);
  const [allTasks, setAllTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedOption, setSelectedOption] = useState("pending");
  const [completeTrigger, setCompleteTrigger] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [animateTasks] = useAutoAnimate<HTMLDivElement>();
  const navigate = useNavigate();

  const fetchData = async (option: string) => {
    try {
      if (option == "pending") {
        const response = await axios.get(`/pending`, {
          baseURL: `/backend`,
        });
        setPendingTasks(response.data);
      } else if (option == "all") {
        const response = await axios.get(`/`, {
          baseURL: `/backend`,
        });
        setAllTasks(response.data);
      } else {
        console.log(option);
        const response = await axios.get(`/completed`, {
          baseURL: `/backend`,
        });
        setCompletedTasks(response.data);
      }
    } catch (e) {
      console.error("Error fetching data");
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  function updateTime(deadline: Date) {
    const currentTime = new Date();
    if (!deadline) {
      return "No deadline provided";
    }
    const timeDifference = deadline.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
      // Deadline has passed
      return "Overdue";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    const formattedTime = `${days}d ${hours}h ${minutes}m`;

    return formattedTime;
  }

  const completeTask = async (id: string) => {
    try {
      await axios.put(`/backend/${id}`);
      setCompleteTrigger(true);
    } catch (e) {
      console.error("Error");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`/backend/${id}/delete`);
      setDeleteTrigger(true);
    } catch (e) {
      console.error("Error");
    }
  };

  useEffect(() => {
    if (completeTrigger) {
      if (selectedOption == "pending") fetchData("pending");
      else fetchData("all");

      setCompleteTrigger(false);
    }
  }, [completeTrigger]);

  useEffect(() => {
    if (deleteTrigger) {
      if (selectedOption == "pending") fetchData("pending");
      else if (selectedOption == "all") fetchData("all");
      else fetchData("completed");

      setDeleteTrigger(false);
    }
  }, [deleteTrigger]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    fetchData(selectedOption);
  }, [selectedOption]);
  return (
    <>
      <div ref={pageRef} className="layout">
        <h1
          data-aos="fade-down"
          data-aos-duration="1200"
          data-aos-easing="ease-sine"
          data-aos-delay="400"
          className="title"
        >
          My Task Manager
        </h1>
        <div className="box">
          <span className="menu">
            <button
              data-aos="fade-right"
              data-aos-duration="1400"
              data-aos-easing="ease-sine"
              data-aos-delay="1400"
              className="new-button-text"
              onClick={() => navigate("/new")}
            >
              New Task
            </button>

            <form
              className="selectform"
              data-aos="fade-left"
              data-aos-duration="1400"
              data-aos-easing="ease-sine"
              data-aos-delay="1400"
            >
              <select
                name="Options"
                className="select"
                onChange={handleSelectChange}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending" selected>
                  Pending
                </option>
              </select>
            </form>
          </span>
          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-easing="ease-sine"
            data-aos-delay="2800"
            className="tasks"
            ref={animateTasks}
          >
            {selectedOption === "all" &&
              allTasks.map((task: Task) => (
                <span key={task._id} className="task">
                  <span className="task-title-span">
                    <h1 className="tasktitle">{task.title}</h1>
                  </span>
                  {task.completed ? (
                    <span className="details-span">
                      <span className="completed-span">
                        <h1 className="taskdue">Completed</h1>
                      </span>
                      <span className="delete">
                        <h1 onClick={() => deleteTask(task._id)}> &#128465;</h1>
                      </span>
                    </span>
                  ) : (
                    task.deadline && (
                      <span className="details-span">
                        <span className="completed-span">
                          <h1
                            onClick={() => completeTask(task._id)}
                            className="taskcomplete"
                          >
                            Mark as completed
                          </h1>
                        </span>
                        <span className="task-due-span">
                          <h1 className="taskdue">Due in:</h1>
                          <h1 className="taskdue">
                            {updateTime(new Date(task.deadline))}
                          </h1>
                        </span>
                        <span className="delete">
                          <h1 onClick={() => deleteTask(task._id)}>
                            &#128465;
                          </h1>
                        </span>
                      </span>
                    )
                  )}
                </span>
              ))}

            {selectedOption === "pending" &&
              pendingTasks.map((task: Task) => (
                <span key={task._id} className="task">
                  <span className="task-title-span">
                    <h1 className="tasktitle">{task.title}</h1>
                  </span>
                  <span className="details-span">
                    <span className="completed-span">
                      <h1
                        onClick={() => completeTask(task._id)}
                        className="taskcomplete"
                      >
                        Mark as completed
                      </h1>
                    </span>
                    {task.deadline && (
                      <>
                        <span className="task-due-span">
                          <h1 className="taskdue">Due in:</h1>
                          <h1 className="taskdue">
                            {updateTime(new Date(task.deadline))}
                          </h1>
                        </span>
                        <span className="delete">
                          <h1 onClick={() => deleteTask(task._id)}>
                            &#128465;
                          </h1>
                        </span>
                      </>
                    )}
                  </span>
                </span>
              ))}

            {selectedOption === "completed" &&
              completedTasks.map((task: Task) => (
                <span key={task._id} className="task">
                  <span className="task-title-span">
                    <h1 className="tasktitle">{task.title}</h1>
                  </span>
                  <span className="details-span">
                    <span className="completed-span">
                      <h1 className="taskdue">Completed</h1>
                    </span>
                    <span className="delete">
                      <h1 onClick={() => deleteTask(task._id)}> &#128465;</h1>
                    </span>
                  </span>
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
