import { Outlet } from "react-router-dom";

const TaskDashboard = () => {
  return (
    <div>
      this is taskDashboard
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default TaskDashboard;
