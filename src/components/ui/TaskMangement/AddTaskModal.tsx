/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import SFForm from "../../shared/Form/SFForm";
import Input from "../../shared/InputFields/Input";
import Modal from "../../shared/Modal/Modal";
import { useRef } from "react";
import { useCreateTaskMutation } from "../../../redux/features/task/taskManagement";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TError } from "../../../utils/type/error";
import { modelClose } from "../../../helpers";

interface AddTaskModalProps {
  modalRef: any;
}

const AddTaskModal = ({ modalRef }: AddTaskModalProps) => {
  const navigate = useNavigate();
  const [addTask] = useCreateTaskMutation();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAddTaskSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Task Create in...");
    try {
      const taskInfo = {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
      };
      const taskResponse = await addTask(taskInfo).unwrap();
      console.log("Task Response:", taskResponse);

      if (taskResponse.success) {
        navigate(`/`);
        toast.success("Task created Successfully", { id: toastId });
        modelClose(modalRef);
      } else {
        toast.error("Task Not Created", { id: toastId });
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
          <h2 className="text-xl font-semibold mb-4">Add Task</h2>

          <SFForm onSubmit={handleAddTaskSubmit} formRef={formRef}>
            <Input
              label="Task Title"
              name="title"
              placeholder="Enter Your Task Title"
              type="text"
              required={true}
            />
            <Input
              label="Task Description"
              name="description"
              placeholder="Enter your password"
              type="textarea"
              required={true}
            />
            <Input
              label="Due Date"
              name="dueDate"
              placeholder="Enter Due Date"
              type="date"
              required={true}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-full text-white font-serif border rounded py-2 mt-4 text-lg transition-colors"
            >
              Log in
            </button>
          </SFForm>
        </div>
      </Modal>
    </>
  );
};

export default AddTaskModal;
