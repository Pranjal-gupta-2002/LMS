import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  {
    courses: [],
    lectures:[],
  },
  {
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload.courses;
    },
    allCoursesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCourseRequest: state => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    },
    getCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
    addToPlatlistRequest:(state)=>{
      state.loading = true;
    },
    addToPlaylistSuccess:(state,action)=>{
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFailure:(state, action)=>{
      state.loading = false;
      state.error = action.payload;
    },
  }
);
