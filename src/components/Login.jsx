import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { MdMenuBook } from "react-icons/md";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // CHECK LOGIN
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("libzone_login")
    );

    if (data?.isLogin) {
      navigate("/home");
    }

    // REMEMBER EMAIL
    const rememberEmail =
      localStorage.getItem("remember_email");

    if (rememberEmail) {
      setForm((prev) => ({
        ...prev,
        email: rememberEmail,
        remember: true,
      }));
    }
  }, [navigate]);

  // LOGIN
  const handleLogin = async () => {
    setError("");

    // CHECK EMPTY
    if (!form.email || !form.password) {
      setError(
        "Vui lòng nhập đầy đủ thông tin"
      );
      return;
    }

    try {
      const data = await api.auth.login(form.email.trim(), form.password);

      localStorage.setItem(
        "libzone_login",
        JSON.stringify({
          isLogin: true,
          id: data.id,
          name: data.username,
          email: data.username,
          role: data.role,
          token: data.token,
        })
      );
      localStorage.setItem("role", data.role);

      // REMEMBER EMAIL
      if (form.remember) {
        localStorage.setItem(
          "remember_email",
          form.email
        );
      } else {
        localStorage.removeItem(
          "remember_email"
        );
      }

      navigate("/home");
    } catch (err) {
      setError(err.message || "Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 450,
          p: 5,
          borderRadius: "30px",
          border: "1px solid #eee",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* LOGO */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "24px",
              bgcolor: "#171654",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <MdMenuBook
              size={50}
              color="#facc15"
            />
          </Box>

          <Typography
            variant="h3"
            fontWeight="bold"
          >
            LibZone
          </Typography>

          <Typography color="gray">
            Hệ thống quản lý thư viện
          </Typography>
        </Box>

        {/* ERROR */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: "12px",
            }}
          >
            {error}
          </Alert>
        )}

        {/* EMAIL */}
        <Box mb={3}>
          <Typography
            fontWeight="bold"
            mb={1}
          >
            Email
          </Typography>

          <TextField
            fullWidth
            placeholder="Nhập email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser color="gray" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root":
                {
                  borderRadius: "16px",
                },
            }}
          />
        </Box>

        {/* PASSWORD */}
        <Box mb={2}>
          <Typography
            fontWeight="bold"
            mb={1}
          >
            Mật khẩu
          </Typography>

          <TextField
            fullWidth
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Nhập mật khẩu"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock color="gray" />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root":
                {
                  borderRadius: "16px",
                },
            }}
          />
        </Box>

        {/* REMEMBER */}
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  form.remember
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    remember:
                      e.target.checked,
                  })
                }
              />
            }
            label="Nhớ tài khoản"
          />

          <Typography
            sx={{
              color: "#4f46e5",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Quên mật khẩu?
          </Typography>
        </Box>

        {/* REGISTER */}
        <Typography
          textAlign="center"
          mt={3}
          mb={3}
        >
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Đăng ký
          </Link>
        </Typography>

        {/* LOGIN BUTTON */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
          sx={{
            py: 1.5,
            borderRadius: "16px",
            fontSize: 18,
            textTransform: "none",
            bgcolor: "#171654",

            "&:hover": {
              bgcolor: "#0f0f3d",
            },
          }}
        >
          Đăng nhập
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;