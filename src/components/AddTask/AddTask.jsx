import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddTask = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newTask = {
      title: data?.title,
      description: data?.description,
      deadline: data?.deadline,
      email: user?.email,
    };
    axiosSecure.post("/add-tasks", newTask).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">Title</span>
            </label>
            <input
              type="text"
              placeholder="Type Here"
              className="input input-bordered"
              name="text"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-red-500 mt-2 text-center">
                Title is required
              </span>
            )}
          </div>

          {/* Deadline */}

          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">Deadline</span>
            </label>
            <input
              type="date"
              className="input input-bordered mt-0"
              {...register("deadline", { required: true })}
            />
            {errors.deadline && (
              <span className=" text-red-500 mt-2 text-center">
                Deadline is required
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="text-lg font-semibold">Description</span>
          </label>
          <textarea
            type="text"
            rows={3}
            placeholder="Type Here"
            className="textarea textarea-bordered"
            name="text"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500 mt-2 text-center">
              Description is required
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn mt-4 bg-blue-600 hover:bg-blue-700 border-0 text-white text-semibold md:w-1/4">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
