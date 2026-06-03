import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Avatar, TextField, InputAdornment, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Grid, Paper, Tabs, Tab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer
} from '@mui/material';
import {
  People, Search, Add, Work, BeachAccess, MoreVert, Edit, Delete
} from '@mui/icons-material';
import { FaBook, FaUsers, FaExchangeAlt, FaCog, FaUser } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';

const STORAGE_KEY = 'libzone_employees';

// Dữ liệu mẫu khởi tạo ban đầu để hiển thị lên bảng
const initialData = [
  { id: 1, name: 'Nguyễn Văn A', code: 'NV001', email: 'a@libzone.vn', phone: '0901234567', address: '12 Lê Lợi, Q.1, TP.HCM', status: 'Đang làm việc', role: 'Quản lý' },
  { id: 2, name: 'Trần Thị B', code: 'NV002', email: 'b@libzone.vn', phone: '0902345678', address: '45 Nguyễn Huệ, Q.1, TP.HCM', status: 'Nghỉ phép', role: 'Nhân viên' },
  { id: 3, name: 'Lê Văn C', code: 'NV003', email: 'c@libzone.vn', phone: '0903456789', address: '78 Trần Hưng Đạo, Q.5, TP.HCM', status: 'Đang làm việc', role: 'Nhân viên' },
];

const Person = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', code: '', email: '', phone: '', address: '', status: 'Đang làm việc', role: '' });

  // Đọc dữ liệu nhân sự từ localStorage
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setEmployees(JSON.parse(data));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      setEmployees(initialData);
    }
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    }
  }, [employees]);

  // Tính toán nhanh số liệu thống kê cho các Card chỉ số
  const total = employees.length;
  const working = employees.filter(e => e.status === 'Đang làm việc').length;
  const off = employees.filter(e => e.status === 'Nghỉ phép').length;

  const filteredEmployees = employees.filter((emp) => {
    const keyword = search.toLowerCase();
    const matchesSearch =
      emp.name.toLowerCase().includes(keyword) ||
      emp.code.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword);

    if (!matchesSearch) return false;
    if (tabValue === 1) return emp.status === 'Đang làm việc';
    if (tabValue === 2) return emp.status === 'Nghỉ phép';
    return true;
  });

  const openDetailDialog = (emp) => {
    setSelectedEmp(emp);
    setOpenDetail(true);
  };

  const closeDetailDialog = () => {
    setSelectedEmp(null);
    setOpenDetail(false);
  };

  const openFormDialog = () => {
    setIsEditing(false);
    setFormValues({ name: '', code: `NV00${employees.length + 1}`, email: '', phone: '', address: '', status: 'Đang làm việc', role: '' });
    setOpenForm(true);
  };

  const openEditDialog = (emp) => {
    setIsEditing(true);
    setFormValues({ ...emp });
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setIsEditing(false);
    setFormValues({ name: '', code: '', email: '', phone: '', address: '', status: 'Đang làm việc', role: '' });
  };

  const handleFormChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveForm = () => {
    if (!formValues.name) {
      alert('Nhập tên nhân viên');
      return;
    }

    if (isEditing) {
      const updated = employees.map(e => e.id === formValues.id ? { ...formValues } : e);
      setEmployees(updated);
      setOpenForm(false);
    } else {
      const newEmp = { ...formValues, id: Date.now() };
      setEmployees(prev => [...prev, newEmp]);
      setOpenForm(false);
    }
  };

  const handleDelete = (emp) => {
    if (window.confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      setEmployees(prev => prev.filter(e => e.id !== emp.id));
    }
  };

  const handleDisable = (emp) => {
    if (!emp) return;
    if (!window.confirm('Bạn có chắc muốn vô hiệu hoá tài khoản của nhân viên này?')) return;
    setEmployees(prev => prev.map(e => e.id === emp.id ? { ...e, status: 'Đã vô hiệu hoá' } : e));
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f9' }}>
      
      {/* ================= 1. TASKBAR BÊN TRÁI (SIDEBAR) ================= */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: '#171654',
            color: 'white',
            p: 2,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <MdMenuBook size={46} color="#facc15" />
            <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>LibZone</Typography>
          </Box>

          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/home" sx={{ borderRadius: 2, mb: 1, py: 1.1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}><FaBook /></ListItemIcon>
                <ListItemText primary="Tổng quan" primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/book" sx={{ borderRadius: 2, mb: 1, py: 1.1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}><FaBook /></ListItemIcon>
                <ListItemText primary="Quản lý sách" primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/reader" sx={{ borderRadius: 2, mb: 1, py: 1.1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}><FaUsers /></ListItemIcon>
                <ListItemText primary="Quản lý độc giả" primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/borrow" sx={{ borderRadius: 2, mb: 1, py: 1.1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}><FaExchangeAlt /></ListItemIcon>
                <ListItemText primary="Mượn / Trả sách" primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/person" sx={{ borderRadius: 2, mb: 1, py: 1.1, bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.18)' } }}>
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}><FaUser /></ListItemIcon>
                <ListItemText primary="Quản lý nhân sự" primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/settings" sx={{ borderRadius: 2, py: 1.1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}><FaCog /></ListItemIcon>
                <ListItemText primary="Cài đặt" primaryTypographyProps={{ fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* ================= 2. KHỐI NỘI DUNG CHÍNH BÊN PHẢI ================= */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Vùng Content của trang quản lý nhân sự */}
        <Box sx={{ p: 4, overflowY: 'auto' }}>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                Quản lý Nhân sự
              </Typography>
              <Typography sx={{ mt: 1, color: 'gray' }}>
                Danh sách nhân viên thư viện
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={openFormDialog}
              sx={{ borderRadius: 2, textTransform: 'none', bgcolor: '#171654', '&:hover': { bgcolor: '#0f1444' } }}
            >
              Thêm nhân viên mới
            </Button>
          </Box>

          {/* 4 Khối vuông hiển thị chỉ số thống kê */}
          <Grid container spacing={3} mb={4}>
            {[
              { title: 'Tổng nhân viên', value: total, sub: '+2 tháng này', icon: <People color="primary" /> },
              { title: 'Đang làm việc', value: working, sub: '83% hoạt động', icon: <Work color="success" /> },
              { title: 'Nghỉ phép', value: off, sub: 'Hôm nay', icon: <BeachAccess color="warning" /> },
            ].map((card, idx) => (
              <Grid item xs={12} sm={3} key={idx}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography color="textSecondary" variant="body2" fontWeight={500}>{card.title}</Typography>
                    <Avatar sx={{ bgcolor: '#f5f5f5', width: 38, height: 38 }}>{card.icon}</Avatar>
                  </Box>
                  <Typography variant="h4" fontWeight="bold">{card.value}</Typography>
                  <Typography variant="caption" color="textSecondary">{card.sub}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Thanh Tabs phân loại dữ liệu và danh sách nhân viên */}
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: '1px solid #f0f0f0', pb: 1 }}>
              <TextField
                size="small"
                placeholder="Tìm theo tên, mã, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
                sx={{ width: 300 }}
              />
              <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} sx={{ '& .MuiTabs-indicator': { bgcolor: '#171654' } }}>
                <Tab label="Tất cả" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
                <Tab label="Đang làm" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
                <Tab label="Nghỉ phép" sx={{ textTransform: 'none', fontWeight: 'bold' }} />
              </Tabs>
            </Box>

            {/* Render danh sách nhân viên từ state */}
            <Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '2.3fr 1.4fr 2fr 1fr 2fr 48px', gap: 2, px: 2, py: 2, mb: 1, color: '#6b7280', fontWeight: 'bold', fontSize: 13, textTransform: 'uppercase' }}>
                <Box>Nhân viên</Box>
                <Box>Chức vụ</Box>
                <Box>Liên hệ</Box>
                <Box>Trạng thái</Box>
                <Box>Địa chỉ</Box>
                <Box />
              </Box>
              {filteredEmployees.map((emp) => (
                <Box key={emp.id} sx={{ p: 2, pr: 3, borderBottom: '1px solid #f5f5f5', display: 'grid', gridTemplateColumns: '2.3fr 1.4fr 2fr 1fr 2fr 48px', gap: 2, alignItems: 'center', '&:hover': { bgcolor: '#f9f9f9' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1e88e5', fontSize: '14px', fontWeight: 'bold', width: 48, height: 48 }}>{emp.name.substring(0,2).toUpperCase()}</Avatar>
                    <Box>
                      <Typography fontWeight="bold" color="#212121">{emp.name}</Typography>
                      <Typography variant="caption" color="textSecondary">{emp.code}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">{emp.role}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight="bold" color="#212121">{emp.email}</Typography>
                    <Typography variant="caption" color="textSecondary">{emp.phone}</Typography>
                  </Box>
                  <Box>
                    <Button size="small" disableElevation variant="contained" color={emp.status === 'Đang làm việc' ? 'success' : 'warning'} sx={{ borderRadius: 1.5, textTransform: 'none', fontSize: '12px', minWidth: 90 }}>
                      {emp.status}
                    </Button>
                  </Box>
                  <Box>
                    <Typography color="#212121">{emp.address}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <IconButton size="small" onClick={() => openEditDialog(emp)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(emp)}>
                      <Delete fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => openDetailDialog(emp)}>
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
            <Dialog 
  open={openDetail} 
  onClose={closeDetailDialog} 
  fullWidth 
  maxWidth="xs"
  PaperProps={{
    sx: {
      borderRadius: 4,
      overflow: 'hidden',
      m: 2,
    }
  }}
>
  {selectedEmp && (
    <>
      {/* Header tím gradient */}
      <Box sx={{
        background: 'linear-gradient(135deg, #6C2BD9 0%, #7C3AED 50%, #8B5CF6 100%)',
        px: 3,
        pt: 3,
        pb: 4,
        position: 'relative',
      }}>
        {/* Mã nhân viên + nút đóng */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            px: 1.5,
            py: 0.3,
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 'bold',
          }}>
            {selectedEmp.code}
          </Box>
          <IconButton size="small" onClick={closeDetailDialog} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.15)', '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } }}>
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        {/* Avatar + Tên */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <Avatar sx={{
            bgcolor: '#10B981',
            width: 64,
            height: 64,
            fontSize: 22,
            fontWeight: 'bold',
            color: '#fff',
            mb: 1,
          }}>
            {selectedEmp.name.split(' ').map(w => w[0]).slice(-2).join('')}
          </Avatar>
          <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: 22, lineHeight: 1.2 }}>
            {selectedEmp.name}
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
            {selectedEmp.role}
          </Typography>
        </Box>
      </Box>

      {/* Nội dung */}
      <DialogContent sx={{ px: 3, py: 2.5, bgcolor: '#fff' }}>
        
        {/* Trạng thái */}
        <Typography variant="overline" sx={{ color: '#9CA3AF', fontSize: 11, letterSpacing: 1 }}>TRẠNG THÁI</Typography>
        <Box sx={{ mt: 0.5, mb: 2 }}>
          <Button
            size="small"
            variant="contained"
            disableElevation
            color={selectedEmp.status === 'Đang làm việc' ? 'success' : 'warning'}
            sx={{ borderRadius: 99, textTransform: 'none', fontSize: 13, px: 2, py: 0.4 }}
          >
            {selectedEmp.status === 'Đang làm việc' ? 'Đang làm' : selectedEmp.status}
          </Button>
        </Box>

        {/* Liên hệ */}
        <Typography variant="overline" sx={{ color: '#9CA3AF', fontSize: 11, letterSpacing: 1 }}>LIÊN HỆ</Typography>
        <Box sx={{ mt: 0.5, mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#F9F9FB', borderRadius: 2, px: 2, py: 1.2 }}>
            <Typography sx={{ fontSize: 14, color: '#1F2937' }}>{selectedEmp.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#F9F9FB', borderRadius: 2, px: 2, py: 1.2 }}>
            <Typography sx={{ fontSize: 14, color: '#1F2937' }}>{selectedEmp.phone}</Typography>
          </Box>
        </Box>

        {/* Thông tin */}
        <Typography variant="overline" sx={{ color: '#9CA3AF', fontSize: 11, letterSpacing: 1 }}>THÔNG TIN</Typography>
        <Box sx={{ mt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#F9F9FB', borderRadius: 2, px: 2, py: 1.2 }}>
            <Box>
              <Typography sx={{ fontSize: 11, color: '#9CA3AF' }}>Vai trò</Typography>
              <Typography sx={{ fontSize: 14, color: '#1F2937', fontWeight: 500 }}>{selectedEmp.role}</Typography>
            </Box>
          </Box>
          {/* Phòng ban removed per request */}
        </Box>
      </DialogContent>

      {/* Actions */}
      <Box sx={{ px: 3, pb: 3, bgcolor: '#fff', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={() => { closeDetailDialog(); openEditDialog(selectedEmp); }}
          sx={{
            background: 'linear-gradient(135deg, #6C2BD9, #8B5CF6)',
            borderRadius: 99,
            textTransform: 'none',
            fontWeight: 'bold',
            py: 1.3,
            fontSize: 15,
          }}
        >
          Chỉnh sửa thông tin
        </Button>
        <Button
          fullWidth
          variant="text"
          color="error"
          onClick={() => { handleDisable(selectedEmp); closeDetailDialog(); }}
          sx={{ borderRadius: 99, textTransform: 'none', fontSize: 14, py: 0.8 }}
        >
          Vô hiệu hoá tài khoản
        </Button>
      </Box>
    </>
  )}
</Dialog>

            {/* Thêm sửa xóa */}
            <Dialog open={openForm} onClose={closeForm} fullWidth maxWidth="sm">
              <DialogTitle>{isEditing ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}</DialogTitle>
              <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField label="Họ và tên" value={formValues.name} onChange={(e) => handleFormChange('name', e.target.value)} fullWidth />
                  <TextField label="Mã NV" value={formValues.code} onChange={(e) => handleFormChange('code', e.target.value)} fullWidth />
                  <TextField label="Email" value={formValues.email} onChange={(e) => handleFormChange('email', e.target.value)} fullWidth />
                  <TextField label="Số điện thoại" value={formValues.phone} onChange={(e) => handleFormChange('phone', e.target.value)} fullWidth />
                  <TextField label="Địa chỉ" value={formValues.address} onChange={(e) => handleFormChange('address', e.target.value)} fullWidth />
                  <TextField label="Chức vụ" value={formValues.role} onChange={(e) => handleFormChange('role', e.target.value)} fullWidth />
                  <Select value={formValues.status} onChange={(e) => handleFormChange('status', e.target.value)} fullWidth>
                    <MenuItem value={'Đang làm việc'}>Đang làm việc</MenuItem>
                    <MenuItem value={'Nghỉ phép'}>Nghỉ phép</MenuItem>
                  </Select>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeForm}>Huỷ</Button>
                <Button onClick={handleSaveForm} variant="contained">Lưu</Button>
              </DialogActions>
            </Dialog>
          </Paper>

        </Box>
      </Box>

    </Box>
  );
};

export default Person;