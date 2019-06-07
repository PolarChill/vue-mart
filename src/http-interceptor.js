import axios from 'axios';
import store from './store';
import router from './router';
//拦截所有http请求, 预先放入token
axios.interceptors.request.use(config => {
  if (store.state.token) {
    //若存在令牌, 则放入请求头中
    config.headers.token = store.state.token;
  }
  return config;
});

// 响应拦截器 预处理响应
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const { code } = response.data;
      if (code === -1) {
        logoutHandler();
      }
    }
    return response;
  },
  err => {
    if (err.response.status === 401) {
      //用户未授权
      console.log('用户未授权');
      logoutHandler();
    }
  }
);

function logoutHandler() {
  //清除缓存
  localStorage.removeItem('token');
  store.commit('setToken', '');

  // 重新登录
  router.push({
    path: '/login',
    query: { redirect: router.currentRoute.path }
  });
}
