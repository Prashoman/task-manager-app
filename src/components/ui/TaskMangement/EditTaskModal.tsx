/* eslint-disable @typescript-eslint/no-explicit-any */

import Modal from "../../shared/Modal/Modal";
import { useEffect, useRef, useState } from "react";
import {

  useUpdateTaskMutation,
} from "../../../redux/features/task/taskManagement";

import { toast } from "sonner";
import { TError } from "../../../utils/type/error";
import { modelClose } from "../../../helpers";
import { TTask } from "../../../utils/type/TaskType";

interface EditTaskProps {
  modalRef: any;
  task: TTask | null;
}

const EditTask = ({ modalRef, task }: EditTaskProps) => {
  console.log("Task:", task);

  // const navigate = useNavigate();
  const [updateTaskApi, { isLoading }] = useUpdateTaskMutation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  useEffect(() => {
    if (task) {
      setFormValues({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
      });
    }
  }, [task]);

  const handleUpdateTaskSubmit = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Task Updated in...");
    const updateInfo = {
      title: formValues.title,
      description: formValues.description,
      dueDate: formValues.dueDate,
      status: formValues.status,
    };
    try {
      const resTaskUpdate = await updateTaskApi({
        id: task?._id,
        taskInfo: updateInfo,
      }).unwrap();
      console.log("Task Update Response:", resTaskUpdate);
      if (resTaskUpdate.success) {
        // navigate('/');
        toast.success("Task Updated Successfully", { id: toastId });
        modelClose(modalRef);
      } else {
        toast.error("Task Not Updated", { id: toastId });
      }
    } catch (error) {
      const errorMes = error as TError;
      toast.error(errorMes?.data?.message, { id: toastId });
    }
  };

  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg ">
          <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

          <form
            ref={formRef}
            onSubmit={handleUpdateTaskSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="title" className="mb-2 font-serif">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({ ...formValues, title: e.target.value })
                }
                placeholder="Enter Task Title"
                className="input input-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
              />
            </div>
            <div className="py-1">
              <label htmlFor="description" className="mb-2 font-serif">
                Description
              </label>
              <textarea
                id="description"
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
                rows={3}
                placeholder="Enter Task Description"
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
              ></textarea>
            </div>
            <div className="py-1">
              <label htmlFor="dueDate" className="mb-2 font-serif">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={
                  formValues.dueDate ? formValues.dueDate.split("T")[0] : ""
                }
                onChange={(e) =>
                  setFormValues({ ...formValues, dueDate: e.target.value })
                }
                className="input input-bordered w-full focus:ring-2 focus:ring-gray-500 mt-2 font-serif"
              />
            </div>
            <div className="py-1">
              <label htmlFor="status" className="mb-2 font-serif">
                Status
              </label>
              <select
                id="status"
                value={formValues.status}
                onChange={(e) =>
                  setFormValues({ ...formValues, status: e.target.value })
                }
                className="p-2 border border-gray-300 rounded ml-2"
              >
                <option
                  value="pending"
                  selected={formValues.status === "pending"}
                >
                  Pending
                </option>
                <option
                  value="completed"
                  selected={formValues.status === "completed"}
                >
                  Completed
                </option>
              </select>
            </div>
            <div className="flex justify-end mt-4">
              <button
                disabled={isLoading}
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-md"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditTask;
