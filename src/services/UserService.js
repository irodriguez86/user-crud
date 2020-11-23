import axios from 'axios';
import {API_BASE_URL} from "../constants/api";

export default class UserService {

    static login(payload) {
        return axios.post(API_BASE_URL + '/login', payload);
    }

    static register(payload) {
        return axios.post(API_BASE_URL + '/register', payload);
    }

    static getUserList(page = 1) {
        return axios.get(
            API_BASE_URL + '/users/',
            {
                headers: { 'token': localStorage.getItem('reqres_token') },
                params: { page: page }
            }
        );
    }

    static addNewUser(payload) {
        return axios.post(API_BASE_URL + '/users', payload);
    }

    static removeUser(id) {
        return axios.delete(API_BASE_URL + `/users/${id}`);
    }

    static getUser(id) {
        return axios.get(API_BASE_URL + `/users/${id}`);
    }
}