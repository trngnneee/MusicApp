import Cookies from "js-cookie";

export async function adminAccountRegister(finalData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Đăng ký thất bại");
  }

  return data;
}

export async function adminAccountLogin(finalData){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Đăng nhập thất bại");
  }

  return data;
}

export async function adminAccountForgotPassword(finalData){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Gửi OTP thất bại");
  }

  return data;
}

export async function adminAccountOTPPassword(finalData){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/otp-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Xác thực OTP thất bại");
  }

  return data;
}

export async function adminAccountResetPassword(finalData){
  const token = Cookies.get("adminToken");
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/account/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(finalData),
    credentials: "include"
  });

  const data = await res.json();

  if (!res.ok || data.code !== "success") {
    throw new Error(data.message || "Đặt lại mật khẩu thất bại");
  }

  return data;
}