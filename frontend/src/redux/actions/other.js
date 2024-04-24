import { server } from '../reducers/store';
import axios from 'axios';

export const contactUs = (name,email,message) => async dispatch => {
    try {
      dispatch({ type: 'contactRequest' });
      const { data } = await axios.post(
        `${server}/contact`,
        { name, email,message },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch({ type: 'contactSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'contactFailure', payload: error.response.data.message });
    }
  };
export const courseRequest = (name,email,course) => async dispatch => {
    try {
      dispatch({ type: 'courseRequestRequest' });
      const { data } = await axios.post(
        `${server}/request`,
        { name, email,course },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch({ type: 'courseRequestSuccess', payload: data.message });
    } catch (error) {
      dispatch({ type: 'courseRequestFailure', payload: error.response.data.message });
    }
  };