import { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward, IoMdTime } from "react-icons/io";
import { IoHandLeftOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";

const Ongoing = () => {
  const axiosSecure = useAxiosSecure();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { user } = useContext(AuthContext);

  const { data: ongoingNum, refetch: refetchOngoingNum } = useQuery({
    queryKey: ["ongoingNum", totalPages, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ongoing-num?email=${user?.email}`);
      setTotalPages(Math.ceil(res?.data.total / 4));
      return res?.data;
    },
  });

  const {
    data: ongoingTasks = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["ongoingTasks", totalPages, currentPage],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/ongoingTasks?email=${user?.email}&skip=${currentPage * 4}`
      );
      return result.data;
    },
  });

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

  const handleChange = (e, taskId) => {
    e.preventDefault();
    const updatedStatus = {
      status: e.target.value,
    };

    axiosSecure.put(`updateStatus/${taskId}`, updatedStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`Status updated to ${e.target.value}`);
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteTask/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (isFetching) {
    return (
      <div className="h-[200px] md:h-[500px] flex justify-center items-center">
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold px-3">Ongoing Tasks</h1>
      </div>

      <div className="mt-[15px]">
        {ongoingTasks.length > 0 ? (
          <div>
            {ongoingTasks?.map((task) => (
              <div
                className="bg-base-100 mb-2 max-w-[500px] p-3 rounded-lg shadow-2xl mx-auto"
                key={task?._id}
                task={task}>
                <h1 className="text-xl font-semibold">{task?.title}</h1>
                <p className="mt-2">{task?.description}</p>
                <div className="mt-2 flex justify-between">
                  <p>
                    <span className="font-bold bg-red-400 px-2 rounded-lg">
                      Deadline :
                    </span>
                    {task?.deadline}
                  </p>

                  <div className="flex gap-4 items-center">
                    <Link to={`/taskDashboard/editTask/${task?._id}`}>
                      <button>
                        <FaRegEdit></FaRegEdit>
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(task?._id)}>
                      <MdDeleteOutline></MdDeleteOutline>
                    </button>{" "}
                    <select
                      onChange={(e) => handleChange(e, task?._id)}
                      defaultValue="ongoing"
                      className=" w-full max-w-xs hover:cursor-pointer bg-amber-300 px-2 rounded-lg">
                      <option disabled value="ongoing">
                        Ongoing
                      </option>

                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[200px] md:h-[500px] flex justify-center items-center">
            <h1 className="text-xl font-bold">No ongoing tasks!</h1>
          </div>
        )}

        <div className={`mt-10 ${ongoingNum?.total > 4 ? "block" : "hidden"}`}>
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

export default Ongoing;
