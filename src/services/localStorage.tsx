export default class LocalStorage {
  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("pass");
  }

  saveEmail(email: string | null) {
    localStorage.setItem("email", String(email));
  }

  savePass(password: string | null) {
    localStorage.setItem("pass", String(password));
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  getPassword() {
    return localStorage.getItem("pass");
  }
}
