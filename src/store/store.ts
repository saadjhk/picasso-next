import { configureStore } from '@reduxjs/toolkit'
import extrinsicsSlice from './extrinsics/slice'

export const store = configureStore({
  reducer: {
    extrinsics: extrinsicsSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch