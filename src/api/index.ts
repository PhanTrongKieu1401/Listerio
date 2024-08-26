import axios from "axios";
import { useAuthStore } from '../stores/authStores/authStore'; // Cập nhật đường dẫn đúng tới store
// import { useRouter } from 'vue-router';


const apiClient = axios.create({
  baseURL: "https://adapted-ox-suitably.ngrok-free.app/api/v1",
  // baseURL: "http://localhost:8080/api/v1",
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
  },
});

// Request interceptor để thêm token vào header
apiClient.interceptors.request.use(
  (request) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;

    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log("Starting Request", request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error Response:", error.response);

    if (error.response && error.response.status === 401) {
      // const router = useRouter();
      // authStore.logout();
      // router.push("/author");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
