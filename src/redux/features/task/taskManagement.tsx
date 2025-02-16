/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from "../../api/baseApi";



const TaskManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTask: builder.query({
      query: (query) => {
        console.log(query);
        if (query && query.status === "all") {
          const { status, ...rest } = query;
          query = rest;
        }
        return {
        url: "/tasks",
        method: "GET",
        params: query,
      }},
        providesTags: ["task"],
    }),

    updateTask: builder.mutation({
      query: ({id,taskInfo}) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: taskInfo,
      }),
        invalidatesTags: ["task"],
    }),

    createTask: builder.mutation({
      query: (adminInfo) => ({
        url: "/tasks",
        method: "POST",
        body: adminInfo,
      }),
        invalidatesTags: ["task"],
    }),
    deleteTask: builder.mutation({
      query: (taskId: string) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
        invalidatesTags: ["task"],
    }),
  }),
});

export const {useGetAllTaskQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = TaskManagement;