import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = commentsAdapter.getInitialState()

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getcomments: builder.query({
            query: () => ({
                url: '/comments',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedcomments = responseData.map(Comment => {
                    Comment.id = Comment._id
                    return Comment
                });
                return commentsAdapter.setAll(initialState, loadedcomments)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Comment', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Comment', id }))
                    ]
                } else return [{ type: 'Comment', id: 'LIST' }]
            }
        }),
        addNewComment: builder.mutation({
            query: initialComment => ({
                url: '/comments',
                method: 'POST',
                body: {
                    ...initialComment,
                }
            }),
            invalidatesTags: [
                { type: 'Comment', id: "LIST" }
            ]
        }),
        updateComment: builder.mutation({
            query: initialComment => ({
                url: '/comments',
                method: 'PATCH',
                body: {
                    ...initialComment,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comment', id: arg.id }
            ]
        }),
        deleteComment: builder.mutation({
            query: ({ id }) => ({
                url: `/comments`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Comment', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetcommentsQuery,
    useAddNewCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentsApiSlice

// returns the query result object
export const selectcommentsResult = commentsApiSlice.endpoints.getcomments.select()

// creates memoized selector
const selectcommentsData = createSelector(
    selectcommentsResult,
    commentsResult => commentsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllcomments,
    selectById: selectCommentById,
    selectIds: selectCommentIds
    // Pass in a selector that returns the comments slice of state
} = commentsAdapter.getSelectors(state => selectcommentsData(state) ?? initialState)