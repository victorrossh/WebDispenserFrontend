import apiClient from "@/services/axios";
import { showToast } from "@/components/showToast";

export function register(name: string, email: string, password: string) {
  apiClient
    .post("/api/register", {
      name: name,
      email: email,
      password: password,
    })
    .then((response) => {
      const signUpStatus = response.data["status"];
      const message = response.data["message"];

      if (signUpStatus === "success") {
        showToast("Cadastro bem-sucedido! " + message, "success");
      } else {
        showToast("Falha no cadastro. " + message);
      }
    })
    .catch((error) => {
      showToast("Erro ao cadastrar. " + error);
    });
}

export function logout(userToken: string): Promise<boolean> {
  return apiClient
    .post("/api/logout", {
      token: userToken,
    })
    .then((response) => {
      const status = response.data["status"];

      if (status !== "success") {
        showToast("Falha no Logout! " + status);
        return false;
      } else {
        showToast("Logout bem-sucedido!", "success");
        localStorage.removeItem("authToken");
        delete apiClient.defaults.headers.common["Authorization"];
        return true;
      }
    })
    .catch((error) => {
      showToast("Falha no logout. " + error);
      return false;
    });
}

export function login(email: string, password: string): Promise<boolean> {
  return apiClient
    .post("/api/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      const message = response.data["message"];
      const token = response.data["token"];

      if (message) {
        showToast("Falha no Login! " + message);
        return false;
      } else if (token) {
        showToast("Login bem-sucedido!", "success");
        setAuthToken(token);
        return true;
      }
      return false;
    })
    .catch((error) => {
      showToast("Falha no login. " + error);
      return false;
    });
}

export function isAuthenticated() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    showToast("Token ausente. Faça login novamente.");
    localStorage.removeItem("authToken");
    delete apiClient.defaults.headers.common["Authorization"];
    return false;
  }

  return apiClient.get(`/api/login?token=${token}`).then((response) => {
    if (response.data["status"] == "error") {
      localStorage.removeItem("authToken");
      delete apiClient.defaults.headers.common["Authorization"];
      return false;
    } else {
      return true;
    }
  });
}

function setAuthToken(token: string) {
  localStorage.setItem("authToken", token);
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
