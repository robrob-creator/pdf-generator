import axios from "axios";
import baseURL from "../axios/base";
import store from "store";

export async function getSections(params) {
  const accessToken = store.get("accessToken");
  let res = await axios.get(`${baseURL()}/section`, {
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
export async function addSubjecttoSection(id, body) {
  console.log("id", id, "body", body);
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/section-add-subject/${id}`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
export async function addStudenttoSection(id, body) {
  console.log("id", id, "body", body);
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/section-add-student/${id}`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
export async function createSection(body) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/section`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
export async function editSection(id, body) {
  console.log("id", id, "body", body);
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/edit-section/${id}`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
export async function deleteSection(id) {
  const accessToken = store.get("accessToken");
  let res = await axios.post(
    `${baseURL()}/delete-section/${id}`,
    {},
    {
      headers: {
        authorization: accessToken && `Bearer ${accessToken}`,
      },
    }
  );
  return res;
}
export async function addOneSubjecttoSection(id, body) {
  console.log("id", id, "body", body);
  const accessToken = store.get("accessToken");
  let res = await axios.post(`${baseURL()}/one-subject/${id}`, body, {
    headers: {
      authorization: accessToken && `Bearer ${accessToken}`,
    },
  });
  return res;
}
