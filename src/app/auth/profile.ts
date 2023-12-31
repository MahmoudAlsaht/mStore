import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import {
	fetchProfile,
	updateUserEmailAndUsername,
	updateProfileImage,
	destroyUser,
} from '../../controllers/profile';

export type TProfile = {
	id: string;
	user: string;
	contacts: string[];
	photoURL: string;
};

const initialState: TProfile = {
	id: '',
	user: '',
	contacts: [],
	photoURL: '',
};

export const ProfileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			fetchProfile.fulfilled,
			(state, action) => {
				if (action.payload !== null)
					state = action.payload;
				return state;
			},
		);
		builder.addCase(
			updateUserEmailAndUsername.fulfilled,
			(state, action) => {
				if (action.payload !== null)
					state = action.payload;
				return state;
			},
		);

		builder.addCase(
			updateProfileImage.fulfilled,
			(state, action) => {
				if (action.payload !== null)
					state = action.payload;
				return state;
			},
		);
		builder.addCase(
			destroyUser.fulfilled,
			(state, action) => {
				if (action.payload !== null)
					state = action.payload;
				return state;
			},
		);
	},
});

export const selectProfile = (state: RootState) => state;

export default ProfileSlice.reducer;
