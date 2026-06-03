import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

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
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Badge,
    Popover,
    Divider,
    Chip, // 1. Thêm Chip vào đây
} from "@mui/material";

import {
    FaBell,
    FaBook,
    FaUsers,
    FaExchangeAlt,
    FaCog,
    FaUserShield,
    FaUser,
} from "react-icons/fa";

import { MdMenuBook } from "react-icons/md";

function Interface() {
    const [anchorEl, setAnchorEl] = useState(null);

    // Lấy và kiểm tra dữ liệu login an toàn
    const loginData = React.useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem("libzone_login"));
        } catch (e) {
            return null;
        }
    }, []);

    const role = loginData?.role;

    // SAMPLE DATA
    const books = [
        {
            id: "PM0452",
            reader: "Trần Thị B",
            book: "Đắc Nhân Tâm",
            date: "24/05/2024",
            status: "Đang mượn",
        },
    ];

    // NOTIFY HANDLERS
    const handleNotifyClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

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
                        {/* DASHBOARD */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/home"
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    py: 1.1,
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                                }}
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

                        {/* BOOK */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/book"
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    py: 1.1,
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                                }}
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
                                        py: 1.1,
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

                        {/* BORROW */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/borrow"
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    py: 1.1,
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                                    <FaExchangeAlt />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Mượn / Trả sách"
                                    primaryTypographyProps={{ fontWeight: "bold" }}
                                />
                            </ListItemButton>
                        </ListItem>

                        {/* PERSON */}
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/person"
                                sx={{
                                    borderRadius: 2,
                                    mb: 1,
                                    py: 1.1,
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                                }}
                            >
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
                            <ListItemButton
                                component={Link}
                                to="/settings"
                                sx={{
                                    borderRadius: 2,
                                    py: 1.1,
                                    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                                }}
                            >
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
            <Box sx={{ flex: 1, p: 4 }}>
                {/* HEADER */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <Typography variant="h3" fontWeight="bold">
                        Bảng điều khiển
                    </Typography>

                    <TextField
                        placeholder="Tìm nhanh ..."
                        variant="outlined"
                        size="small"
                        sx={{ width: 300, bgcolor: "white", borderRadius: 2 }}
                    />

                    {/* KHU VỰC THÔNG BÁO & ROLE */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, md: { gap: 3 } }}>
                        {/* NOTIFICATION */}
                        <Box>
                            <IconButton onClick={handleNotifyClick}>
                                <Badge badgeContent={3} color="error">
                                    <FaBell />
                                </Badge>
                            </IconButton>

                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                            >
                                <Box sx={{ p: 2, width: 250 }}>
                                    <Typography variant="h6" mb={2}>
                                        Thông báo
                                    </Typography>
                                    <Typography mb={1}>Nguyễn Văn A vừa mượn sách</Typography>
                                    <Typography mb={1}>Có 2 sách sắp hết hạn</Typography>
                                    <Typography>Thêm thành công sách mới</Typography>
                                </Box>
                            </Popover>
                        </Box>

                        {/* 2. PHẦN HIỂN THỊ ROLE Ở ĐÂY */}
                        <Chip
                            icon={role === "admin" ? <FaUserShield /> : <FaUser />}
                            label={role === "admin" ? "Quản trị viên" : "Nhân viên"}
                            color={role === "admin" ? "primary" : "primary"}
                            variant="combined"
                            sx={{ 
                                display: "flex", 
                                alignItems: "center",
                                marginTop: -1,
                                fontWeight: "bold", 
                                textTransform: "uppercase",
                                px: 1,
                                height: 36,
                                borderRadius: 2
        
                            }}
                        />
                    </Box>
                </Box>

                {/* BANNER */}
                <Box
                    sx={{
                        background: "linear-gradient(135deg, #4f46e5, #a855f7)",
                        color: "white",
                        p: 5,
                        borderRadius: 5,
                        mb: 4,
                    }}
                >
                    <Typography variant="h3" fontWeight="bold" mb={2}>
                        Chào mừng đến với LibZone
                    </Typography>

                    <Typography variant="h6" mb={3}>
                        Hệ thống quản lý thư viện hiện đại, giúp bạn dễ dàng theo dõi sách và độc giả.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            component={Link}
                            to="/book"
                            variant="contained"
                            color="warning"
                        >
                            Thêm sách mới
                        </Button>

                        {/* Độc giả chỉ dành cho Admin */}
                        {role === "admin" && (
                            <>
                                <Button
                                    component={Link}
                                    to="/reader"
                                    variant="contained"
                                    color="primary"
                                >
                                    Thêm độc giả
                                </Button>
                                <Button
                                    component={Link}
                                    to="/reader"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Tra cứu độc giả
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>

                {/* CARDS METRICS */}
                <Grid container spacing={3} mb={4}>
                    {[
                        ["Tổng số sách", "12,500"],
                        ["Độc giả tích cực", "3,120"],
                        ["Đang mượn", "452"],
                        ["Sách quá hạn", "19"],
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography color="text.secondary" mb={2}>
                                        {item[0]}
                                    </Typography>
                                    <Typography variant="h4" fontWeight="bold">
                                        {item[1]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* DATA TABLE */}
                <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight="bold" mb={3}>
                            Phiếu mượn mới nhất
                        </Typography>

                        <TableContainer component={Paper} elevation={0}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Mã phiếu</TableCell>
                                        <TableCell>Độc giả</TableCell>
                                        <TableCell>Sách</TableCell>
                                        <TableCell>Ngày mượn</TableCell>
                                        <TableCell>Trạng thái</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {books.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.reader}</TableCell>
                                            <TableCell>{item.book}</TableCell>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>

                <Outlet />
            </Box>
        </Box>
    );
}

export default Interface;