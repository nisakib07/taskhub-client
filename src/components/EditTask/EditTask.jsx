import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();

  const { data: singleTask, refetch } = useQuery({
    queryKey: ["singleTask"],
    queryFn: async () => {
      const res = await axiosSecure(`/singleTask/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const updatedTask = {
      title: data?.title || singleTask?.title,
      deadline: data?.deadline || singleTask?.deadline,
      description: data?.description || singleTask?.description,
    };

    axiosSecure.put(`editTask/${id}`, updatedTask).then((res) => {
      refetch();
      if (res.data.modifiedCount > 0) {
        toast.success("Task updated successfully");
      }
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
              defaultValue={singleTask?.title}
              className="input input-bordered"
              name="text"
              {...register("title")}
            />
          </div>

          {/* Deadline */}

          <div className="form-control">
            <label className="label">
              <span className="text-lg font-semibold">Deadline</span>
            </label>
            <input
              type="date"
              defaultValue={singleTask?.deadline}
              className="input input-bordered mt-0"
              {...register("deadline")}
            />
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
            defaultValue={singleTask?.description}
            placeholder="Type Here"
            className="textarea textarea-bordered"
            name="text"
            {...register("description")}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn mt-4 bg-blue-600 hover:bg-blue-700 border-0 text-white text-semibold md:w-1/4">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
