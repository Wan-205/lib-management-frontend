import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

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
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Divider,
  InputAdornment,
} from "@mui/material";

import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaCog,
  FaUser,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

import { MdMenuBook } from "react-icons/md";

function Reader() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
    code: "",
    name: "",
    email: "",
    phone: "",
    status: "ACTIVE",
  });

  const perPage = 6;

  const loadReaders = async () => {
    try {
      const data = await api.readers.search(search, currentPage - 1, perPage);
      setMembers(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Lỗi khi tải danh sách độc giả:", err);
    }
  };

  useEffect(() => {
    loadReaders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage]);

  const openModal = (member = null) => {
    if (member) {
      setEditId(member.id);
      setForm({
        code: member.code,
        name: member.fullName,
        email: member.email,
        phone: member.phone,
        status: member.status || "ACTIVE",
      });
    } else {
      setEditId(null);
      setForm({
        code: "DG" + Date.now().toString().slice(-5),
        name: "",
        email: "",
        phone: "",
        status: "ACTIVE",
      });
    }

    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const saveMember = async () => {
    if (!form.name.trim()) {
      alert("Nhập tên độc giả!");
      return;
    }

    const readerDTO = {
      code: form.code,
      fullName: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: form.status,
    };

    try {
      if (editId) {
        await api.readers.update(editId, readerDTO);
      } else {
        await api.readers.create(readerDTO);
      }
      loadReaders();
      closeModal();
    } catch (err) {
      alert(err.message || "Lỗi khi lưu thông tin độc giả");
    }
  };

  const deleteMember = async (id) => {
    if (
      window.confirm(
        "Bạn có chắc muốn xóa độc giả này?"
      )
    ) {
      try {
        await api.readers.delete(id);
        loadReaders();
      } catch (err) {
        alert(err.message || "Không thể xóa độc giả này");
      }
    }
  };

  return (
<Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 4,
            }}
          >
            <MdMenuBook
              size={46}
              color="#facc15"
            />

            <Typography
              sx={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              LibZone
            </Typography>
          </Box>

          {/* MENU */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/home"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                  }}
                >
                  <FaBook />
                </ListItemIcon>

                <ListItemText
                  primary="Tổng quan"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/book"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                  }}
                >
                  <FaBook />
                </ListItemIcon>

                <ListItemText
                  primary="Quản lý sách"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/reader"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                  }}
                >
                  <FaUsers />
                </ListItemIcon>

                <ListItemText
                  primary="Quản lý độc giả"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/borrow"
                sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                  }}
                >
                  <FaExchangeAlt />
                </ListItemIcon>

                <ListItemText
                  primary="Mượn / Trả sách"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/person"
                sx={{ borderRadius: 2, mb: 1, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                  }}
                >
                  <FaUser />
                </ListItemIcon>

                <ListItemText
                  primary="Quản lý nhân sự"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* BOTTOM */}
        <Box sx={{ mt: "auto" }}>
          <Divider
            sx={{
              bgcolor:
                "rgba(255,255,255,0.2)",
              mb: 2,
            }}
          />

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/settings" sx={{ borderRadius: 2, py: 1.1, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                  }}
                >
                  <FaCog />
                </ListItemIcon>

                <ListItemText
                  primary="Cài đặt"
                  primaryTypographyProps={{
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>


      {/* MAIN */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Quản lý độc giả
            </Typography>

            <Typography color="gray">
              Danh sách tất cả độc giả trong
              thư viện
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={() => openModal()}
          >
            Thêm độc giả
          </Button>
        </Box>

        {/* SEARCH */}
        <TextField
          fullWidth
          placeholder="Tìm kiếm độc giả..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />

        {/* CARD LIST */}
        <Grid container spacing={3}>
          {members.map((m) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={m.id}
            >
              <Card
                sx={{
                  borderRadius: 4,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "#eef2ff",
                        color: "#4338ca",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: 24,
                      }}
                    >
                      {m.fullName ? m.fullName.charAt(0) : ""}
                    </Box>

                    <Box>
                      <Typography
                        fontWeight="bold"
                        fontSize={20}
                      >
                        {m.fullName}
                      </Typography>

                      <Typography
                        color="gray"
                        fontSize={13}
                      >
                        {m.code} (ID: {m.id})
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                        color: "gray",
                      }}
                    >
                      <FaEnvelope />
                      {m.email}
                    </Typography>

                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "gray",
                      }}
                    >
                      <FaPhone />
                      {m.phone}
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        fontSize={12}
                        color="gray"
                      >
                        Đang mượn
                      </Typography>

                      <Typography
                        fontWeight="bold"
                        fontSize={28}
                      >
                        {m.currentlyBorrowingCount}
                      </Typography>
                    </Box>

                    <Box>
                      <Button
                        onClick={() =>
                          openModal(m)
                        }
                      >
                        <FaEdit />
                      </Button>

                      <Button
                        color="error"
                        onClick={() =>
                          deleteMember(m.id)
                        }
                      >
                        <FaTrash />
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* PAGINATION */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) =>
              setCurrentPage(page)
            }
            color="primary"
          />
        </Box>

        {/* MODAL */}
        <Dialog
          open={open}
          onClose={closeModal}
          fullWidth
        >
          <DialogTitle>
            {editId
              ? "Sửa độc giả"
              : "Thêm độc giả"}
          </DialogTitle>

          <DialogContent>
            <TextField
              fullWidth
              label="Mã độc giả"
              margin="normal"
              disabled
              value={form.code}
            />

            <TextField
              fullWidth
              label="Họ tên"
              margin="normal"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <TextField
              fullWidth
              label="Số điện thoại"
              margin="normal"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal}>
              Hủy
            </Button>

            <Button
              variant="contained"
              onClick={saveMember}
            >
              {editId ? "Cập nhật" : "Thêm"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Reader;