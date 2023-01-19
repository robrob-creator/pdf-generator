import store from "store";

export async function authChecker(params) {
  const accessToken = store.get("accessToken");
  if (accessToken) {
    return true;
  }

  return false;
}
