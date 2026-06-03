import React, { useState } from "react";
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
  const [members, setMembers] = useState([
    {
      id: "DG001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
      borrow: 3,
    },
    {
      id: "DG002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0902345678",
      borrow: 1,
    },
    {
      id: "DG003",
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0903456789",
      borrow: 0,
    },
    {
      id: "DG004",
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0904567890",
      borrow: 2,
    },
  ]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    borrow: 0,
  });

  const perPage = 6;

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredMembers.length / perPage
  );

  const startIndex = (currentPage - 1) * perPage;

  const currentMembers = filteredMembers.slice(
    startIndex,
    startIndex + perPage
  );

  const openModal = (member = null) => {
    if (member) {
      setEditId(member.id);
      setForm(member);
    } else {
      setEditId(null);

      setForm({
        name: "",
        email: "",
        phone: "",
        borrow: 0,
      });
    }

    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const saveMember = () => {
    if (!form.name) {
      alert("Nhập tên độc giả!");
      return;
    }

    if (editId) {
      setMembers(
        members.map((m) =>
          m.id === editId ? { ...m, ...form } : m
        )
      );
    } else {
      const maxId =
        members.length > 0
          ? Math.max(
              ...members.map((m) =>
                parseInt(m.id.replace("DG", ""))
              )
            )
          : 0;

      setMembers([
        ...members,
        {
          id:
            "DG" +
            (maxId + 1)
              .toString()
              .padStart(3, "0"),
          ...form,
        },
      ]);
    }

    closeModal();
  };

  const deleteMember = (id) => {
    if (
      window.confirm(
        "Bạn có chắc muốn xóa độc giả này?"
      )
    ) {
      setMembers(
        members.filter((m) => m.id !== id)
      );
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
          {currentMembers.map((m) => (
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
                      {m.name.charAt(0)}
                    </Box>

                    <Box>
                      <Typography
                        fontWeight="bold"
                        fontSize={20}
                      >
                        {m.name}
                      </Typography>

                      <Typography
                        color="gray"
                        fontSize={13}
                      >
                        {m.id}
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
                        {m.borrow}
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

            <TextField
              fullWidth
              type="number"
              label="Số sách đang mượn"
              margin="normal"
              value={form.borrow}
              onChange={(e) =>
                setForm({
                  ...form,
                  borrow: Number(
                    e.target.value
                  ),
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