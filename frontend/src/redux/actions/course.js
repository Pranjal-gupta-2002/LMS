import { server } from '../reducers/store';
import axios from 'axios';

export const getAllCourses =
  (category = '', keyword = '') =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });
      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`
      );
      console.log(data);
      dispatch({ type: 'allCoursesSuccess', payload: data });
    } catch (error) {
      dispatch({
        type: 'allCoursesFailure',
        payload: error.response.data.message,
      });
    }
  };
export const getCourseLectures = id => async dispatch => {
  try {
    dispatch({ type: 'getCourseRequest' });
    const { data } = await axios.get(`${server}/course/${id}`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: 'getCourseSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCourseFailure',
      payload: error.response.data.message,
    });
  }
};
