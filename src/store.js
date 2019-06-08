import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    addCart(state, item) {
      const good = state.cart.find(v => v.id === item.id);
      if (good) {
        good.cartCount += 1;
      } else {
        state.cart.push({
          ...item,
          cartCount: 1
        });
      }
    },
    countAdd(state, index) {
      state.cart[index].cartCount += 1;
    },
    countMinus(state, index) {
      if ((state.cart[index].cartCount = 1)) {
        state.cart.splice(index, 1);
      } else {
        state.cart[index].cartCount -= 1;
      }
    }
  },
  actions: {},
  getters: {
    isLogin: state => {
      return !!state.token;
    },
    cartTotal: state => {
      let num = 0;
      state.cart.forEach(v => {
        num += v.cartCount;
      });
      return num;
    },
    total: state => {
      return state.cart.reduce((number, v) => (number += v.cartCount * v.price), 0);
    }
  }
});

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case 'addCart':
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
    case 'setToken':
      localStorage.setItem('token', JSON.stringify(state.token));

      break;

    default:
      break;
  }
});
export default store;
