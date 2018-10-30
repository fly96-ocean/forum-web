import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  return Promise.reject(error);
});

// 封装axios的get请求
export function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      headers: {
        Accept: "application/json; charset=utf-8",
        userToken: sessionStorage.getItem("token")
      },
      params: params,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 封装axios的post请求
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
          headers: {
            Accept: "application/json; charset=utf-8",
            userToken: sessionStorage.getItem("token")
          }
    })
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
  });
};


export default {
  get(url, params) {
    return fetchGet(url, params);
  },
  post(url, params){
    return fetchPost(url, params);
  }
};