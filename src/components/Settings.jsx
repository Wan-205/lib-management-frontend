import React, { useState, useMemo } from "react";
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
  Divider,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

import {
  FaBook,
  FaUsers,
  FaExchangeAlt,
  FaCog,
  FaUser,
  FaSave,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { MdMenuBook } from "react-icons/md";

function Setting() {
  // Trạng thái lưu trữ cài đặt thư viện
  const rawRole = localStorage.getItem("role") || ""; 
  const role = rawRole.trim().toLowerCase();

  // Get logged-in user info from localStorage
  const loginData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("libzone_login"));
    } catch (e) {
      return null;
    }
  }, []);

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("libzone_settings");
    return saved
      ? JSON.parse(saved)
      : {
          libraryName: "LibZone Central Library",
          code: "LIB-Z001",
          description: "Thư viện trung tâm thành phố với hơn 50.000 đầu sách",
          email: "support@libzone.com",
          phone: "1900 1500",
          address: "123 Đường Sách, Quận Trung Tâm",
        };
  });

  // Khai báo bổ sung trạng thái đăng nhập để tránh lỗi ReferenceError
  const [isLogin, setIsLogin] = useState(true);

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("libzone_login");
    localStorage.removeItem("role");
    setIsLogin(false);
    console.log("Đã đăng xuất");
  };

  // Hàm xử lý Lưu cài đặt khi click nút (Thay vì dùng useEffect auto-save)
  const handleSaveSettings = () => {
    localStorage.setItem("libzone_settings", JSON.stringify(settings));
    alert("Đã cập nhật cấu hình hệ thống thành công!");
  };

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

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/reader"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  py: 1.1,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
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

            {role === "admin" && (
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
            )}
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

      {/* MAIN CONTENT */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* HEADER */}
        <Box mb={5}>
          <Typography variant="h3" fontWeight="bold" mb={1}>
            Cài đặt hệ thống
          </Typography>
          <Typography sx={{ color: "#6b7280", fontSize: 18 }}>
            Quản lý thông tin và cấu hình thư viện
          </Typography>
        </Box>

        {/* USER LOGIN INFO CARD */}
        {loginData && (
          <Card
            sx={{
              borderRadius: "24px",
              boxShadow: "0 9px 12px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e0e0e0",
              mb: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
                <Box sx={{ color: "white" }}>
                  <Typography sx={{ fontSize: 14, opacity: 0.9, mb: 1 }}>
                    Người đăng nhập
                  </Typography>
                  <Typography sx={{ fontSize: 28, fontWeight: "bold", mb: 2 }}>
                    {loginData.name || "Không xác định"}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 3, fontSize: 15 }}>
                    <Box>
                      <Typography sx={{ opacity: 0.8, mb: 0.5 }}>Email</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{loginData.email || "N/A"}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ opacity: 0.8, mb: 0.5 }}>Vai trò</Typography>
                      <Typography sx={{ fontWeight: 500, textTransform: "uppercase" }}>
                        {loginData.role === "admin" ? "Quản trị viên" : "Nhân viên"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "3px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <FaUser size={50} color="white" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* CONTENT */}
        <Grid container spacing={4}>
          {/* LEFT CARD */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: "24px",
                boxShadow: "0 9px 12px rgba(0, 0, 0, 0.08)",
                border: "1px solid #e0e0e0", // Sửa màu border viền đen nặng nề sang màu sáng tinh tế hơn
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* CARD HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44, // Đồng bộ lại tỉ lệ vuông
                      borderRadius: "16px",
                      bgcolor: "#f0f0ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaBook color="#4f46e5" size={22} />
                  </Box>
                  <Box>
                    <Typography fontWeight="bold" fontSize={24}>
                      Hồ sơ thư viện
                    </Typography>
                    <Typography sx={{ color: "#6b7280" }}>
                      Thông tin cơ bản hiển thị với độc giả
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* FORM */}
                <Box mb={3}>
                  <Typography fontWeight="bold" mb={1}>
                    Tên thư viện
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={settings.libraryName}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) =>
                      setSettings({ ...settings, libraryName: e.target.value })
                    }
                    sx={{
                      "& .MuiFilledInput-root": {
                        bgcolor: "#ffffff",
                        borderRadius: "14px",
                        border: "1px solid #e0e0e0",
                      },
                      "& .MuiFilledInput-input": {
                        pt: "16px",
                      },
                    }}
                  />
                </Box>

                <Box mb={3}>
                  <Typography fontWeight="bold" mb={1}>
                    Mã đơn vị
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={settings.code}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) =>
                      setSettings({ ...settings, code: e.target.value })
                    }
                    sx={{
                      "& .MuiFilledInput-root": {
                        bgcolor: "#ffffff",
                        borderRadius: "14px",
                        border: "1px solid #e0e0e0",
                      },
                      "& .MuiFilledInput-input": {
                        pt: "16px",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography fontWeight="bold" mb={1}>
                    Mô tả ngắn
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="filled"
                    value={settings.description}
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) =>
                      setSettings({ ...settings, description: e.target.value })
                    }
                    sx={{
                      "& .MuiFilledInput-root": {
                        bgcolor: "#ffffff",
                        borderRadius: "14px",
                        border: "1px solid #e0e0e0",
                      },
                      "& .MuiFilledInput-input": {
                        pt: "16px",
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT CARD */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: "24px",
                boxShadow: "0 9px 12px rgba(0, 0, 0, 0.08)",
                border: "1px solid #e0e0e0",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* CARD HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "16px",
                      bgcolor: "#dcfce7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaEnvelope color="#16a34a" size={20} />
                  </Box>
                  <Box>
                    <Typography fontWeight="bold" fontSize={24}>
                      Thông tin liên hệ
                    </Typography>
                    <Typography sx={{ color: "#6b7280" }}>
                      Sử dụng trong email và thông báo
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* EMAIL */}
                <Box mb={3}>
                  <Typography fontWeight="bold" mb={1}>
                    Email hỗ trợ
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={settings.email}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaEnvelope color="gray" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    sx={{
                      "& .MuiFilledInput-root": {
                        bgcolor: "#ffffff",
                        borderRadius: "14px",
                        border: "1px solid #e0e0e0",
                      },
                      "& .MuiFilledInput-input": {
                        pt: "16px",
                      },
                    }}
                  />
                </Box>

                {/* PHONE */}
                <Box mb={3}>
                  <Typography fontWeight="bold" mb={1}>
                    Số điện thoại
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={settings.phone}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaPhone color="gray" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    sx={{
                      "& .MuiFilledInput-root": {
                        bgcolor: "#ffffff",
                        borderRadius: "14px",
                        border: "1px solid #e0e0e0",
                      },
                      "& .MuiFilledInput-input": {
                        pt: "16px",
                      },
                    }}
                  />
                </Box>

                {/* ADDRESS */}
                <Box>
                  <Typography fontWeight="bold" mb={1}>
                    Địa chỉ
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    value={settings.address}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaMapMarkerAlt color="gray" />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      setSettings({ ...settings, address: e.target.value })
                    }
                    sx={{
                      "& .MuiFilledInput-root": {
                        bgcolor: "#ffffff",
                        borderRadius: "14px",
                        border: "1px solid #e0e0e0",
                      },
                      "& .MuiFilledInput-input": {
                        pt: "16px",
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* FLOAT SAVE & AUTH CONTROL */}
        <Box
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            bgcolor: "white",
            p: 2,
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            zIndex: 1000, // Đảm bảo luôn nổi lên trên nội dung khác
          }}
        >
          {/* LOGIN */}
          {!isLogin && (
            <Button
              component={Link}
              to="/"
              variant="contained"
              sx={{ borderRadius: "12px", textTransform: "none" }}
            >
              Đăng nhập
            </Button>
          )}

          {/* LOGOUT */}
          {isLogin && (
            <Button
            component={Link}
              to="/"
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ borderRadius: "12px", textTransform: "none" }}
            >
              Đăng xuất
            </Button>
          )}

          <Button
            variant="contained"
            startIcon={<FaSave />}
            onClick={handleSaveSettings} // Kích hoạt hàm lưu thủ công tại đây
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              px: 3,
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            Lưu cài đặt
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Setting;