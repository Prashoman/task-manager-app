/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { TTableHeader } from "../../../utils/type/Table";
import Table from "../../shared/Table/Table";
import AddTaskModal from "./AddTaskModal";
import { dateFormate, modelOpen } from "../../../helpers";
import {
  useDeleteTaskMutation,
  useGetAllTaskQuery,
} from "../../../redux/features/task/taskManagement";
import TableSkeleton from "../../shared/TableSkeleton/TableSkeleton";
import { TTask } from "../../../utils/type/TaskType";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { handleDelete } from "../../../utils/HandleDelete";
import Pagination from "../../shared/Pagination/Pagination";
import useDebounce from "../../hooks";
import EditTask from "./EditTaskModal";
import ViewTaskModal from "./viewTaskModal";

const TaskManagement = () => {
  const addTaskModelRef = useRef<HTMLDivElement>(null);
  const editTaskModelRef = useRef<HTMLDivElement>(null);
  const viewTaskModelRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [status, setStatus] = useState("all");
  const [showPage, setShowPage] = useState(1);
  const [searchTask, setSearchTask] = useState("");
  const searchTerm = useDebounce(searchTask);
  const [viewTask, setViewTask] = useState<TTask | null>(null);
  const [editTask, setEditTask] = useState<TTask | null>(null);
  // console.log(showPage);
  
  const { data: allTask, isLoading } = useGetAllTaskQuery({
    page,
    limit,
    searchTerm,
    status
  });
  const [deleteItem] = useDeleteTaskMutation();
 
  const tableHeadings: TTableHeader[] = [
    { title: "SI", key: "si" },
    { title: "TaskName", key: "name" },
    { title: "TaskDate", key: "taskDate" },
    { title: "Task Description", key: "des" },
    { title: "Status", key: "status" },

    { title: "Options", key: "options" },
  ];

  const taskDelete = (taskId: string) => {
    if (taskId) {
      handleDelete(taskId, deleteItem);
    }
  };

  useEffect(() => {
    setShowPage(allTask?.data?.meta?.totalPage);
  }, [allTask]);

  const handleEdit = (id: string) => {
    if(id){
      const task = allTask?.data?.result.find((item: TTask) => item._id === id);
      if(task){
        setEditTask(task);
        modelOpen(editTaskModelRef);
      }
    }
  }

  const viewTaskHandle = (id: string) => {
    if(id){
      const task = allTask?.data?.result.find((item: TTask) => item._id === id);
      if(task){
        setViewTask(task);
        modelOpen(viewTaskModelRef);
      }
    }
  }
  return (
    <>
      <div className="px-4 py-10 lg:px-20 lg:py-8">
        <div className="w-full flex justify-between items-center pb-4">
          <h1>Task List</h1>
          <button
            onClick={() => {
              modelOpen(addTaskModelRef);
            }}
            className="btn btn-sm btn-success text-white"
          >
            Create Task
          </button>
        </div>
        <div className="w-full flex justify-between items-center pb-4">
          <input
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
            type="text"
            placeholder="Search Task"
            className=" p-2 border border-gray-300 rounded w-1/3"
          />

          <div className="flex justify-between items-center mt-4">
            <div>
              <span>Filter By:</span>
              <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
               className="p-2 border border-gray-300 rounded ml-2">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        <Table data={tableHeadings}>
          {isLoading ? (
            // Skeleton Loader for Table Rows
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td colSpan={tableHeadings?.length} className="text-center">
                  <TableSkeleton />
                </td>
              </tr>
            ))
          ) : allTask?.data?.result?.length > 0 ? (
            allTask?.data?.result?.map((item: TTask, index: number) => (
              <tr key={index}>
                <td>{
                  (page - 1) * limit + index + 1
                  }</td>
                <td>{item.title}</td>
                <td>{dateFormate(item.dueDate)}</td>
                <td>{item.description}</td>

                <td>
                  <button
                    className={`text-white text-xs rounded px-2 py-1 ${
                      item.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td>
                  <div className="flex justify-center items-center space-x-2">
                    <button className=" bg-green-500 text-white rounded-lg px-1 py-1">
                      <GrView 
                      onClick={() => {
                        viewTaskHandle(item._id);
                      }}
                      className="w-6 h-6  text-white" />
                    </button>
                    <button 
                      onClick={() => {
                        handleEdit(item._id);
                      }}
                    className=" bg-blue-600 text-white rounded-lg px-1 py-1">
                      <FiEdit className="w-6 h-6  text-white" />
                    </button>
                    <button
                      onClick={() => {
                        taskDelete(item._id);
                      }}
                      className=" bg-red-600 text-white rounded-lg px-1 py-1"
                    >
                      <MdDeleteOutline className="w-6 h-6  text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </Table>
        <Pagination page={page} setPage={setPage} showPage={showPage} />
      </div>

      <AddTaskModal modalRef={addTaskModelRef} />
      <EditTask modalRef={editTaskModelRef} task={editTask} />
      <ViewTaskModal modalRef={viewTaskModelRef} task={viewTask} />
    </>
  );
};

export default TaskManagement;
