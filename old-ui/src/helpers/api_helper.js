import axios from "axios"
import accessToken from "./jwt-token-access/auth-token-header"
import { Link, Redirect } from "react-router-dom"
//pass new generated access token here
//const token = accessToken();

//apply base url for axios
const API_URL = process.env.REACT_APP_API_URL
let axiosApi = axios.create({
  baseURL: API_URL,
  method: "get",
  headers: {},
})

axiosApi.interceptors.response.use(
  // response => response,
  // error => Promise.reject(error)

  function (response) {
    // console.log("🚀🚀🚀🚀🚀 ~ response", response)

    if (response.headers["x-access-token"]) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      if (obj) {
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            accessToken: response.headers["x-access-token"],
            refreshToken: response.headers["x-refresh-token"],
          })
        )
        //  localStorage.setItem("authUser",JSON.stringify({"accessToken":response.headers['x-access-token'],"refreshToken":obj.refreshToken}))
      }
    }

    return response
  },
  function (error) {
    console.log("error.response", error)
    if (!error.response) {
      return Promise.reject("Network Error")
    }
    if (error.response.headers["x-access-token"]) {
      const obj = JSON.parse(localStorage.getItem("authUser"))

      if (obj) {
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            accessToken: error.response.headers["x-access-token"],
            refreshToken: error.response.headers["x-refresh-token"],
          })
        )
        //  localStorage.setItem("authUser",JSON.stringify({"accessToken":response.headers['x-access-token'],"refreshToken":obj.refreshToken}))
      }
    }
    if (error.response.status === 401) {
      window.location = "/login"
    }
    //debugger; // <-- this should now trigger correctly
    // response error
    let message = "Problem"
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 404:
          message = `خطا! ${error.response.data}`
          break
        case 500:
          message = `خطا! ${error.response.data}`
          break
        case 401:
          message = "Invalid credentials"
          break
          case 403:
            message = "عدم دسترسی"
            break
        case 400:
          message = `خطا! ${error.response.data}`
          break
        case 402:
          message = `خطا! ${error.response.data}`
          break
        case 415:
          message = `خطا! ${Object.values(error.response.data).flat()}`

          break
        default:
          message = error.response.data[0].message
          break
      }
    }
    return Promise.reject(message) // transform response.response -> response
  }
)

axiosApi.interceptors.request.use(function (config) {
  const obj = JSON.parse(localStorage.getItem("authUser"))

  if (obj && obj.accessToken) {
    // console.log("obj.accessToken2",obj.accessToken,"obj.refreshToken",obj.refreshToken);
    config.headers.common["Authorization"] = "Bearer " + obj.accessToken
    //config.headers.common["x-refresh"] = obj.refreshToken;
  }

  return config
})

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}
export async function getImageFile(url, config = {}) {
  const obj = JSON.parse(localStorage.getItem("authUser"))
  let token = ""
  if (obj && obj.accessToken) {
    token = obj.accessToken
  }
  let urlPath = process.env.REACT_APP_API_URL + "/" + url
  return await fetch(urlPath, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  })
    .then(function (response) {
      return response.json()
    })
    .then(res => {
      return "data:image/png;base64," + res
    })
}
export async function postAttach(url, data) {
  return axiosApi.post(url, data).then(response => response.data)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
export const filterItems = (arr, field, value) => {
  if (field !== null) {
    return arr.filter(item => {
      return item[field] === value
    })
  }
}
export const filterItemsNested = (arr, field1, field2, value) => {
  if (field1 !== null) {
    return arr.filter(item => {
      return item[field1][field2] === value
    })
  }
}
export const sortAsc = (arr, field) => {
  return arr.sort((a, b) => {
    if (a[field] > b[field]) {
      return 1
    }
    if (b[field] > a[field]) {
      return -1
    }
    return 0
  })
}
export const sortDesc = (arr, field) => {
  return arr.sort((a, b) => {
    if (a[field] > b[field]) {
      return -1
    }
    if (b[field] > a[field]) {
      return 1
    }
    return 0
  })
}
