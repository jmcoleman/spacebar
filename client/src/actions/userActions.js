import {
    GET_USERS,
    DELETE_USER,
    ADD_USER,
    GET_USER,
    UPDATE_USER
  } from './types';
  import axios from 'axios';
  
  export const getUsers = () => async dispatch => {
    try {
      const res = await axios.get('/api/users');

      // if is not empty, dispatch
      if (!(Object.keys(res).length === 0 && res.constructor === Object)) {
        dispatch({
          type: GET_USERS,
          payload: res.data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const getUser = id => async dispatch => {
    try {
      const res = await axios.get(
        `/api/users/${id}`
      );

      if (!(Object.keys(res).length === 0 && res.constructor === Object)) {
        console.log("reducer get one user");
        console.log(res.data[0]);
        dispatch({
          type: GET_USER,
          payload: res.data[0]
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const deleteUser = id => async dispatch => {
    try {
      await axios.delete(`/api/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    } catch (e) {
      dispatch({
        type: DELETE_USER,
        payload: id
      });
    }
  };
  
  export const addUser = user => async dispatch => {
    try {
      const res = await axios.post(
        '/api/users',
        user
      );

      if (!(Object.keys(res).length === 0 && res.constructor === Object)) {
        dispatch({
          type: ADD_USER,
          payload: res.data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const updateUser = user => async dispatch => {
    try {
      const res = await axios.put(
        `/api/users/${user._id}`,
        user
      );

      if (!(Object.keys(res).length === 0 && res.constructor === Object)) {
        dispatch({
          type: UPDATE_USER,
          payload: res.data
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  