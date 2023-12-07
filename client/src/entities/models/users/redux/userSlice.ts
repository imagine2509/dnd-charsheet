import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type UserState = {
  id: number | null
  email: string | null
  password: string | null
}

export const initialUserState: UserState = {
  id: null,
  email: null,
  password: null,
}
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    checkUser: (state: UserState, action: PayloadAction<UserState>) => {
      state = action.payload
    },
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      state = action.payload
    },
    LogoutUser: (state: UserState, action: PayloadAction<UserState>) => {
      state = action.payload
    },
    editUser: (
      state: UserState,
      action: PayloadAction<Pick<UserState, 'email' | 'password'>>
    ) => {
      state.email = action.payload.email
      state.password = action.payload.password
    },
  },
})

export const { checkUser, setUser, LogoutUser, editUser } = userSlice.actions

export default userSlice.reducer
