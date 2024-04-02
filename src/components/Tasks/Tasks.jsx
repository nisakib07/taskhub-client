import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { IoIosArrowBack, IoIosArrowForward, IoMdTime } from "react-icons/io";
import { IoHandLeftOutline } from "react-icons/io5";

const Tasks = () => {
  const axiosSecure = useAxiosSecure();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { user } = useContext(AuthContext);

  const { data: tasksNum, refetch: refetchTasksNum } = useQuery({
    queryKey: ["tasksNum", totalPages, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks-num?email=${user?.email}`);
      setTotalPages(Math.ceil(res?.data.total / 4));
      return res?.data;
    },
  });

  console.log(tasksNum);

  const {
    data: pendingTasks = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["pendingTasks", totalPages, currentPage],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/pendingTasks?email=${user?.email}&skip=${currentPage * 4}`
      );
      return result.data;
    },
  });

  console.log(pendingTasks);

  const handleRightPagination = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleBackPagination = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pagesArray = Array.from({ length: totalPages }, (_, index) => index);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pending Tasks</h1>
        </div>
        <div className="">
          <Link
            to="/taskDashboard/add-task"
            className="bg-blue-600 text-white p-2 rounded-lg font-semibold">
            Add new
          </Link>
        </div>
      </div>

      <div className="mt-[15px]">
        {pendingTasks.length > 0 ? (
          <div>
            {pendingTasks?.map((task) => (
              <div
                className="bg-base-100 mb-2 max-w-[500px] p-3 rounded-lg shadow-2xl mx-auto"
                key={task?._id}
                task={task}>
                <h1 className="text-xl font-semibold">{task?.title}</h1>
                <p className="mt-2">{task?.description}</p>
                <p className="mt-2">
                  <span className="font-bold bg-warning px-2 rounded-lg">
                    Deadline :
                  </span>{" "}
                  {task?.deadline}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
        )}

        <div className={`mt-10 ${tasksNum?.total > 4 ? "block" : "hidden"}`}>
          <div className={`flex justify-center`}>
            <div className={`join flex space-x-3`}>
              <button
                onClick={handleBackPagination}
                className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${
                  currentPage === 0
                    ? "text-[#ffffff] bg-[#d9d9db]"
                    : "bg-[#d0ceee] text-[#433EBE]"
                }`}>
                <IoIosArrowBack></IoIosArrowBack>
              </button>
              {pagesArray?.map((page, index) => {
                return (
                  <button
                    onClick={() => setCurrentPage(page)}
                    key={index}
                    style={{
                      background: `${
                        currentPage == page ? "#433EBE" : "#d0ceee"
                      }`,
                      color: `${currentPage == page ? "#FFFFFF" : "#433EBE"}`,
                      borderRadius: "5px",
                      fontSize: "18px",
                    }}
                    className="join-item px-3 h-8 md:px-4 md:h-10 font-semibold">
                    {page + 1}
                  </button>
                );
              })}
              <button
                onClick={handleRightPagination}
                className={`join-item text-lg px-2 h-8 md:px-3 md:h-10 ${
                  totalPages === currentPage + 1
                    ? "text-[#ffffff] bg-[#d9d9db]"
                    : "bg-[#d0ceee] text-[#433EBE]"
                }`}>
                <IoIosArrowForward></IoIosArrowForward>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
