const BASE_URL = "http://localhost:8080";

const getAuthToken = () => {
  try {
    const loginData = JSON.parse(localStorage.getItem("libzone_login"));
    return loginData ? loginData.token : null;
  } catch (e) {
    return null;
  }
};

async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("libzone_login");
    localStorage.removeItem("role");
    // Only redirect to login if we are not already on the login or register page
    if (window.location.pathname !== "/" && window.location.pathname !== "/register") {
      window.location.href = "/";
    }
    throw new Error("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
  }

  const contentType = response.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || `Lỗi hệ thống (Mã lỗi: ${response.status})`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  // Authentication
  auth: {
    login: async (username, password) => {
      const data = await apiRequest("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      return data; // Returns token, id, username, role
    },
    register: async (username, password, role) => {
      return apiRequest("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password, role }),
      });
    },
  },

  // Books
  books: {
    search: async (keyword = "", categoryId = "", page = 0, size = 10) => {
      let query = `/api/v1/book/search?page=${page}&size=${size}`;
      if (keyword) {
        query += `&keyword=${encodeURIComponent(keyword)}`;
      }
      if (categoryId && categoryId !== "Tất cả") {
        query += `&categoryId=${categoryId}`;
      }
      const res = await apiRequest(query);
      return res.data; // Res is BaseResponse, returns PageResponseDTO
    },
    create: async (bookDTO) => {
      const res = await apiRequest("/api/v1/book", {
        method: "POST",
        body: JSON.stringify(bookDTO),
      });
      return res.data;
    },
    update: async (id, bookDTO) => {
      const res = await apiRequest(`/api/v1/book/${id}`, {
        method: "PUT",
        body: JSON.stringify(bookDTO),
      });
      return res.data;
    },
    delete: async (id) => {
      const res = await apiRequest(`/api/v1/book/${id}`, {
        method: "DELETE",
      });
      return res.data;
    },
  },

  // Categories
  categories: {
    getAll: async () => {
      const res = await apiRequest("/api/v1/category/all");
      return res.data; // List of categories
    },
  },

  // Readers
  readers: {
    search: async (keyword = "", page = 0, size = 10) => {
      let query = `/api/v1/reader/search?page=${page}&size=${size}`;
      if (keyword) {
        query += `&keyword=${encodeURIComponent(keyword)}`;
      }
      const res = await apiRequest(query);
      return res.data; // PageResponseDTO
    },
    create: async (readerDTO) => {
      const res = await apiRequest("/api/v1/reader", {
        method: "POST",
        body: JSON.stringify(readerDTO),
      });
      return res.data;
    },
    update: async (id, readerDTO) => {
      const res = await apiRequest(`/api/v1/reader/${id}`, {
        method: "PUT",
        body: JSON.stringify(readerDTO),
      });
      return res.data;
    },
    delete: async (id) => {
      const res = await apiRequest(`/api/v1/reader/${id}`, {
        method: "DELETE",
      });
      return res.data;
    },
  },

  // Borrows (Mượn/Trả sách)
  borrows: {
    search: async (keyword = "", status = "", page = 0, size = 10) => {
      let query = `/api/v1/borrow/search?page=${page}&size=${size}`;
      if (keyword) {
        query += `&keyword=${encodeURIComponent(keyword)}`;
      }
      if (status && status !== "Tất cả") {
        query += `&status=${encodeURIComponent(status)}`;
      }
      const res = await apiRequest(query);
      return res.data; // PageResponseDTO
    },
    create: async (borrowDTO) => {
      const res = await apiRequest("/api/v1/borrow", {
        method: "POST",
        body: JSON.stringify(borrowDTO),
      });
      return res.data;
    },
    returnBook: async (id) => {
      const res = await apiRequest(`/api/v1/borrow/${id}/return`, {
        method: "PUT",
      });
      return res.data;
    },
    delete: async (id) => {
      const res = await apiRequest(`/api/v1/borrow/${id}`, {
        method: "DELETE",
      });
      return res.data;
    },
  },

  // Dashboard Statistics
  dashboard: {
    getStats: async () => {
      const res = await apiRequest("/api/v1/dashboard/stats");
      return res.data; // DashboardStatsDTO
    },
    getRecentActivities: async () => {
      const res = await apiRequest("/api/v1/dashboard/recent-activities");
      return res.data; // List of RecentActivityDTO
    },
  },

  // Employees (Nhân sự)
  employees: {
    search: async (keyword = "", page = 0, size = 10) => {
      let query = `/api/v1/employee/search?page=${page}&size=${size}`;
      if (keyword) {
        query += `&keyword=${encodeURIComponent(keyword)}`;
      }
      const res = await apiRequest(query);
      return res.data; // PageResponseDTO
    },
    create: async (employeeDTO) => {
      const res = await apiRequest("/api/v1/employee", {
        method: "POST",
        body: JSON.stringify(employeeDTO),
      });
      return res.data;
    },
    update: async (id, employeeDTO) => {
      const res = await apiRequest(`/api/v1/employee/${id}`, {
        method: "PUT",
        body: JSON.stringify(employeeDTO),
      });
      return res.data;
    },
    delete: async (id) => {
      const res = await apiRequest(`/api/v1/employee/${id}`, {
        method: "DELETE",
      });
      return res.data;
    },
  },
};
