import axios from 'axios';
import Swal from 'sweetalert2';

const baseURL = import.meta.env.VITE_API_URL;

export const http = axios.create({ baseURL });

http.interceptors.response.use(
  response => response,
  error => {
    // console.log('error', error.response.data)
    Swal.fire({
      title: 'Error!',
      text: error.response.data.errors.join(', '),
      icon: 'error',
      confirmButtonText: 'OK',
    });

    return Promise.reject(error);
  }
);
