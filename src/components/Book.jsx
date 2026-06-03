import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  InputAdornment,
} from "@mui/material";

import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaCog,
  FaUser,
} from "react-icons/fa";

import { MdMenuBook } from "react-icons/md";

function Book() {
  const rawRole = localStorage.getItem("role") || ""; 
  const role = rawRole.trim().toLowerCase();

  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "Đắc Nhân Tâm",
            author: "Dale Carnegie",
            category: "Kỹ năng sống",
            quantity: 5,
          },
          {
            id: 2,
            name: "Nhà Giả Kim",
            author: "Paulo Coelho",
            category: "Văn học",
            quantity: 0,
          },
        ];
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Trạng thái kiểm tra lỗi khi bấm Save
  const [isSubmitted, setIsSubmitted] = useState(false);

  const booksPerPage = 5;

  const [form, setForm] = useState({
    name: "",
    author: "",
    category: "Kỹ năng sống",
    quantity: 0,
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, statusFilter]);

  const saveBook = () => {
    setIsSubmitted(true);
    
    // Ngăn chặn lưu nếu thông tin trống
    if (!form.name.trim() || !form.author.trim()) {
      return;
    }

    const newBook = {
      ...form,
      name: form.name.trim(),
      author: form.author.trim(),
      quantity: Math.max(0, Number(form.quantity)),
    };

    if (editId !== null) {
      setBooks(books.map((b) => (b.id === editId ? { ...b, ...newBook } : b)));
    } else {
      setBooks([
        ...books,
        {
          id: Date.now(),
          ...newBook,
        },
      ]);
    }

    closeModal();
  };

  const deleteBook = () => {
    setBooks(books.filter((b) => b.id !== deleteId));
    setDeleteId(null);
  };

  const editBook = (book) => {
    setEditId(book.id);
    setForm(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setIsSubmitted(false);
    setForm({
      name: "",
      author: "",
      category: "Kỹ năng sống",
      quantity: 0,
    });
  };

  // Lọc danh sách sách kết hợp tính toán trạng thái động
  const filteredBooks = books.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "Tất cả" || b.category === categoryFilter;
    
    // Tính toán trạng thái thực tế dựa trên số lượng
    const actualStatus = b.quantity > 0 ? "Còn" : "Hết";
    const matchStatus = statusFilter === "Tất cả" || actualStatus === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            bgcolor: "#171654",
            color: "white",
            p: 2,
            boxSizing: "border-box",
          },
        }}
      >
        <Box>
          {/* LOGO */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
            <MdMenuBook size={46} color="#facc15" />
            <Typography sx={{ fontSize: 40, fontWeight: "bold" }}>
              LibZone
            </Typography>
          </Box>

          {/* MENU */}
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/home" sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaBook />
                </ListItemIcon>
                <ListItemText primary="Tổng quan" primaryTypographyProps={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/book" sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaBook />
                </ListItemIcon>
                <ListItemText primary="Quản lý sách" primaryTypographyProps={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>

            {role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/reader"
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    py: 1.1,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                    <FaUsers />
                  </ListItemIcon>
                  <ListItemText primary="Quản lý độc giả" primaryTypographyProps={{ fontWeight: "bold" }} />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/borrow" sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaExchangeAlt />
                </ListItemIcon>
                <ListItemText primary="Mượn / Trả sách" primaryTypographyProps={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/person" sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary="Quản lý nhân sự" primaryTypographyProps={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* BOTTOM */}
        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/settings" sx={{ borderRadius: 2, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaCog />
                </ListItemIcon>
                <ListItemText primary="Cài đặt" primaryTypographyProps={{ fontWeight: "bold" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h3" fontWeight="bold">Quản lý sách</Typography>
        <Typography sx={{ mt: 1, color: "gray" }}>Danh sách tất cả đầu sách</Typography>

        {/* SEARCH + FILTER */}
        <Box sx={{ mt: 3, mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="Tìm sách..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 250, bgcolor: "white", borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ minWidth: 180, bgcolor: "white" }}
          >
            <MenuItem value="Tất cả">Tất cả thể loại</MenuItem>
            <MenuItem value="Kỹ năng sống">Kỹ năng sống</MenuItem>
            <MenuItem value="Văn học">Văn học</MenuItem>
            <MenuItem value="Khoa học">Khoa học</MenuItem>
            <MenuItem value="Kinh tế">Kinh tế</MenuItem>
          </TextField>

          <TextField
            select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 170, bgcolor: "white" }}
          >
            <MenuItem value="Tất cả">Tất cả trạng thái</MenuItem>
            <MenuItem value="Còn">Còn</MenuItem>
            <MenuItem value="Hết">Hết</MenuItem>
          </TextField>

          <Button
            variant="outlined"
            onClick={() => {
              setSearch("");
              setCategoryFilter("Tất cả");
              setStatusFilter("Tất cả");
            }}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            sx={{ px: 3, fontWeight: "bold", textTransform: "none" }}
            onClick={() => setShowModal(true)}
          >
            Thêm sách
          </Button>
        </Box>

        {/* TABLE */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "#171654" }}>
              <TableRow>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Mã</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Tên</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Tác giả</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Thể loại</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Trạng thái</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Số lượng</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Không có sách</TableCell>
                </TableRow>
              ) : (
                currentBooks.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell align="center">{b.id}</TableCell>
                    <TableCell align="center">{b.name}</TableCell>
                    <TableCell align="center">{b.author}</TableCell>
                    <TableCell align="center">{b.category}</TableCell>
                    <TableCell align="center">
                      {/* Trạng thái hiển thị linh hoạt theo số lượng thực tế */}
                      {b.quantity > 0 ? "Còn" : "Hết"}
                    </TableCell>
                    <TableCell align="center">{b.quantity}</TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined" onClick={() => editBook(b)}>
                        <FaEdit />
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ ml: 1 }}
                        onClick={() => setDeleteId(b.id)}
                      >
                        <FaTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
          />
        </Box>

        {/* MODAL THÊM/SỬA */}
        <Dialog open={showModal} onClose={closeModal} fullWidth>
          <DialogTitle>
            {editId !== null ? "Sửa sách" : "Thêm sách"}
          </DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              label="Tên sách"
              margin="normal"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={isSubmitted && !form.name.trim()}
              helperText={isSubmitted && !form.name.trim() ? "Vui lòng nhập tên sách" : ""}
            />

            <TextField
              fullWidth
              label="Tác giả"
              margin="normal"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              error={isSubmitted && !form.author.trim()}
              helperText={isSubmitted && !form.author.trim() ? "Vui lòng nhập tên tác giả" : ""}
            />

            <TextField
              select
              fullWidth
              label="Thể loại"
              margin="normal"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <MenuItem value="Kỹ năng sống">Kỹ năng sống</MenuItem>
              <MenuItem value="Văn học">Văn học</MenuItem>
              <MenuItem value="Khoa học">Khoa học</MenuItem>
              <MenuItem value="Kinh tế">Kinh tế</MenuItem>
            </TextField>

            <TextField
              fullWidth
              type="number"
              label="Số lượng"
              margin="normal"
              inputProps={{ min: 0 }}
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: Math.max(0, Number(e.target.value)) })}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal}>Hủy</Button>
            <Button variant="contained" onClick={saveBook}>
              {editId !== null ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* MODAL XÓA */}
        <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            Bạn có chắc muốn xóa sách này không?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Hủy</Button>
            <Button color="error" variant="contained" onClick={deleteBook}>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Book;