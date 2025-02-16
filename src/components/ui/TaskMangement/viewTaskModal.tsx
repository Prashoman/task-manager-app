/* eslint-disable @typescript-eslint/no-explicit-any */

import Modal from "../../shared/Modal/Modal";
import { useEffect, useRef, useState } from "react";


interface ViewTaskModalProps {
  modalRef: any;
  task: any | null;
}

const ViewTaskModal = ({ modalRef, task }: ViewTaskModalProps) => {
  console.log("Task:", task);

  // const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const [formValues, setFormValues] = useState({
    title: "",
    user: "",
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
        user: task.user.email,
      });
    }
  }, [task]);

  return (
    <>
      <Modal modalRef={modalRef} formRef={formRef}>
        <div className="max-w-md mx-auto bg-white p-2 lg:p-6 rounded-lg ">

          <div className="border rounded-lg shadow-md p-4 bg-white">
            <h2 className="text-xl font-bold mb-2">{formValues.title}</h2>
            <p className="text-gray-700 mb-1">
              <strong>Description:</strong> {formValues.description}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Due Date:</strong> {new Date(formValues.dueDate).toDateString()}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>User:</strong> {formValues.user}
            </p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                formValues.status === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {formValues.status}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
