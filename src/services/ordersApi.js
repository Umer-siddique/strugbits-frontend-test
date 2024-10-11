import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8000/api/v1";

const customBaseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { body }) => {
    const preparedHeaders = new Headers(headers);
    if (body instanceof FormData) {
      preparedHeaders.set("Content-Type", "multipart/form-data");
    } else if (
      typeof body === "object" &&
      !preparedHeaders.has("Content-Type")
    ) {
      preparedHeaders.set("Content-Type", "application/json");
    }
    // Return the modified headers
    return preparedHeaders;
  },
});

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // Get All Orders with specific fields
    orders: builder.query({
      query: (week = "All Meals") => {
        let queryString = "/recipes";
        // Append the query parameter if a specific week is selected
        if (week !== "All Meals") {
          queryString += `?isWeek${week.split(" ")[1]}=true`;
        }
        return queryString;
      },
      providesTags: ["Order"],
      transformResponse: (response) => {
        return response?.data?.map(
          ({ _id, name, image, instructions, cuisine, rating, mealType }) => ({
            _id,
            name,
            image,
            instructions,
            cuisine,
            rating,
            mealType,
          })
        );
      },
    }),

    // Update the selected week for orders
    updateSelectedWeek: builder.mutation({
      query: ({ selectedCards, week }) => ({
        url: `/recipes/update-week`,
        method: "PATCH",
        body: {
          selectedCards,
          week,
        },
      }),
      invalidatesTags: ["Order"],
    }),

    // Delete the orders for the week
    deleteSelectedWeek: builder.mutation({
      query: ({ id, week }) => ({
        url: `/recipes/${id}`,
        method: "Delete",
        body: { week },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useOrdersQuery,
  useUpdateSelectedWeekMutation,
  useDeleteSelectedWeekMutation,
} = ordersApi;
