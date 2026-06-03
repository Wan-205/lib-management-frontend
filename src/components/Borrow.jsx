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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  Pagination,
  Divider,
  Chip,
} from "@mui/material";
import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaCog,
  FaPlus,
  FaCheck,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

function Borrow() {
 const rawRole = localStorage.getItem("role") || ""; 
  const role = rawRole.trim().toLowerCase();

  const [borrows, setBorrows] = useState(() => {
    const saved = localStorage.getItem("borrows");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "PM001",
            reader: "Nguyễn Văn A",
            book: "Đắc Nhân Tâm",
            borrowDate: "2026-05-10",
            returnDate: "2026-05-20",
            status: "Đang mượn",
          },
        ];
  });

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    reader: "",
    book: "",
    borrowDate: "",
    returnDate: "",
    status: "Đang mượn",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    localStorage.setItem("borrows", JSON.stringify(borrows));
  }, [borrows]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setForm({
      reader: "",
      book: "",
      borrowDate: "",
      returnDate: "",
      status: "Đang mượn",
    });
  };

  const saveBorrow = () => {
    if (!form.reader || !form.book || !form.borrowDate || !form.returnDate) {
      alert("Nhập đầy đủ thông tin!");
      return;
    }

    const newId =
      "PM" +
      (borrows.length + 1).toString().padStart(3, "0");

    setBorrows([
      ...borrows,
      {
        id: newId,
        ...form,
      },
    ]);

    closeModal();
  };

  const returnBook = (id) => {
    setBorrows(
      borrows.map((b) =>
        b.id === id
          ? {
              ...b,
              status: "Đã trả",
            }
          : b
      )
    );
  };

  const deleteBorrow = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phiếu mượn?")) {
      setBorrows(borrows.filter((b) => b.id !== id));
    }
  };

  const totalPages = Math.ceil(borrows.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentBorrows = borrows.slice(startIndex, startIndex + perPage);

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
              <ListItemButton
                component={Link}
                to="/home"
                sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaBook />
                </ListItemIcon>
                <ListItemText
                  primary="Tổng quan"
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/book"
                sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaBook />
                </ListItemIcon>
                <ListItemText
                  primary="Quản lý sách"
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            </ListItem>

            {/* READER - ADMIN ONLY */}
            {role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/reader"
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                    <FaUsers />
                  </ListItemIcon>
                  <ListItemText
                    primary="Quản lý độc giả"
                    primaryTypographyProps={{ fontWeight: "bold" }}
                  />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/borrow" sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaExchangeAlt />
                </ListItemIcon>
                <ListItemText
                  primary="Mượn / Trả sách"
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/person" sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                  <FaUser />
                </ListItemIcon>
                <ListItemText
                  primary="Quản lý nhân sự"
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
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
                <ListItemText
                  primary="Cài đặt"
                  primaryTypographyProps={{ fontWeight: "bold" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* MAIN */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Mượn / Trả sách
            </Typography>
            <Typography color="gray">Quản lý phiếu mượn sách</Typography>
          </Box>
          <Button variant="contained" startIcon={<FaPlus />} onClick={openModal}>
            Tạo phiếu mượn
          </Button>
        </Box>

        {/* TABLE */}
        <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Mã phiếu</TableCell>
                <TableCell align="center">Độc giả</TableCell>
                <TableCell align="center">Sách</TableCell>
                <TableCell align="center">Ngày mượn</TableCell>
                <TableCell align="center">Hạn trả</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentBorrows.map((b) => (
                <TableRow key={b.id}>
                  <TableCell align="center">{b.id}</TableCell>
                  <TableCell align="center">{b.reader}</TableCell>
                  <TableCell align="center">{b.book}</TableCell>
                  <TableCell align="center">{b.borrowDate}</TableCell>
                  <TableCell align="center">{b.returnDate}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={b.status}
                      color={b.status === "Đã trả" ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {b.status === "Đang mượn" && (
                      <Button color="success" onClick={() => returnBook(b.id)}>
                        <FaCheck />
                      </Button>
                    )}
                    <Button color="error" onClick={() => deleteBorrow(b.id)}>
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

        {/* MODAL */}
        <Dialog open={open} onClose={closeModal} fullWidth>
          <DialogTitle>Tạo phiếu mượn</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Tên độc giả"
              margin="normal"
              value={form.reader}
              onChange={(e) => setForm({ ...form, reader: e.target.value })}
            />
            <TextField
              fullWidth
              label="Tên sách"
              margin="normal"
              value={form.book}
              onChange={(e) => setForm({ ...form, book: e.target.value })}
            />
            <TextField
              fullWidth
              type="date"
              margin="normal"
              label="Ngày mượn"
              InputLabelProps={{ shrink: true }}
              value={form.borrowDate}
              onChange={(e) => setForm({ ...form, borrowDate: e.target.value })}
            />
            <TextField
              fullWidth
              type="date"
              margin="normal"
              label="Hạn trả"
              InputLabelProps={{ shrink: true }}
              value={form.returnDate}
              onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
            />
            <Select
              fullWidth
              value={form.status}
              sx={{ mt: 2 }}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <MenuItem value="Đang mượn">Đang mượn</MenuItem>
              <MenuItem value="Đã trả">Đã trả</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal}>Hủy</Button>
            <Button variant="contained" onClick={saveBorrow}>Lưu</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
export default Borrow;