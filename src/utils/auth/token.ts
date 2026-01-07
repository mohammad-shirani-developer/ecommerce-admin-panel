const TOKEN_KEY = "auth_token";

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function setAuthCookie(token: string) {
  document.cookie = `auth_token=${token}; path=/`;
}

export function removeAuthCookie() {
  document.cookie = "auth_token=; path=/; max-age=0";
}
