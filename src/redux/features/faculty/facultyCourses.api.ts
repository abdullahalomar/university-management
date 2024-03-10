import { TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all offered course
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item?.name, item?.value as string);
          });
        }

        return {
          url: "/enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (response: TResponseRedux<any>) => {
        console.log(response);

        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // add enroll course
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useEnrollCourseMutation } =
  facultyCourseApi;
