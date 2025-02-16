import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        // console.log("Login userInfo:", userInfo);
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    register: builder.mutation({
      query: (userInfo) => {
        // console.log("Register userInfo:", userInfo);
        return {
          url: "/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),

    forgetPassword: builder.mutation({
      query: (email) => {
        console.log("Forget Password email:", email);
        return {
          url: "/auth/forgot-password",
          method: "POST",
          body: email,
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => {
        // console.log("Change Password data:", data);
        return {
          url: "/auth/change-password",
          method: "POST",
          body: data,
        };
      },
    }),
    changeProfile: builder.mutation({
      query: (data) => {
        // console.log("Change Profile data:", data);
        return {
          url: "/auth/profile",
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useChangePasswordMutation,
  useChangeProfileMutation,
} = authApi;
