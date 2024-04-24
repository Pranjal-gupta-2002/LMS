import { server } from '../reducers/store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest' });
    const { data } = await axios.post(`${server}/createcourse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: 'createCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'createCourseFailure',
      payload: error.response.data.message,
    });
  }
};
export const deleteCourse = id => async dispatch => {
  try {
    dispatch({ type: 'deleteCourseRequest' });
    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: 'deleteCourseSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFailure',
      payload: error.response.data.message,
    });
  }
};
export const addLecture = (id, formData) => async dispatch => {
  try {
    dispatch({ type: 'addLectureRequest' });
    const { data } = await axios.post(
      `${server}/course/${id}`,

      formData,

      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'addLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addLectureFailure',
      payload: error.response.data.message,
    });
  }
};
export const deleteLecture = (courseId, lectureId) => async dispatch => {
  try {
    dispatch({ type: 'deleteLectureRequest' });
    const { data } = await axios.delete(
      `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'deleteLectureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteLectureFailure',
      payload: error.response.data.message,
    });
  }
};
export const getAllUsers = () => async dispatch => {
  try {
    dispatch({ type: 'getAllUsersRequest' });
    const { data } = await axios.get(`${server}/admin/users`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: 'getAllUsersSuccess', payload: data.users });
  } catch (error) {
    dispatch({
      type: 'getAllUsersFailure',
      payload: error.response.data.message,
    });
  }
};
export const updateTheRole = id => async dispatch => {
  try {
    dispatch({ type: 'updateUserRequest' });
    const { data } = await axios.put(
      `${server}/admin/user/${id}`,
      {},

      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'updateUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateUserFailure',
      payload: error.response.data.message,
    });
  }
};
export const deleteTheUser = id => async dispatch => {
  try {
    dispatch({ type: 'deleteUserRequest' });
    const { data } = await axios.delete(
      `${server}/admin/user/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'deleteUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'deleteUserFailure',
      payload: error.response.data.message,
    });
  }
};
export const getDashboardStats = id => async dispatch => {
  try {
    dispatch({ type: 'getAdminStatsRequest' });
    const { data } = await axios.get(
      `${server}/admin/stats`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: 'getAdminStatsSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminStatsFailure',
      payload: error.response.data.message,
    });
  }
};
