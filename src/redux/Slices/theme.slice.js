import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export  const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state) => {
			state.mode = state.mode === 'dark' ? 'light' : 'dark';

		}
	},
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer