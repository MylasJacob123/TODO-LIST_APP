import React from "react";
import "./Profile.css";

function UserProfile() {
  const user = {
    email: "johndoe@example.com",
    username: "John Doe",
  };

  const tasks = [
    { id: 1, title: "Complete project report", priority: "High" },
    { id: 2, title: "Read new articles on React", priority: "Medium" },
    { id: 3, title: "Plan weekend getaway", priority: "Low" },
    { id: 4, title: "Finish module exercises", priority: "High" },
  ];

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="profile-container">
      <div className="profile-card-wrapper">
        <div className="profile-card">
          <h2 className="profile-username">{user.username}</h2>
          <p className="profile-email">
            <strong>Email:</strong> {user.email}
          </p>

          <h3 className="task-title">Tasks by Priority</h3>
          <ul className="task-list">
            {sortedTasks.map((task) => (
              <li
                key={task.id}
                className={`task-item priority-${task.priority.toLowerCase()}`}
              >
                <span className="task-title">{task.title}</span>
                <span className="task-priority">{task.priority}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
