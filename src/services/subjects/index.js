import axios from "axios";
import baseURL from "../axios/base";
import store from "store";

export async function getSubjects(params) {
  const accessToken = store.get("accessToken");
  let res = await axios.get(`${baseURL()}/subject`, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
    params: { ...params, deleted: false },
  });

  return res;
}
export async function createSubject(body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/subject`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
export async function deleteSubject(id) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(
    `${baseURL()}/delete-subject/${id}`,
    {},
    {
      headers: {
        authorization: accessToken && `Bearer ${accessToken}`,
      },
    }
  );
  return res;
}
export async function editSubject(id, body) {
  console.log("id", id, "body", body);
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/edit-subject/${id}`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
