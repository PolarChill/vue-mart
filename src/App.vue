<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
|
      <a v-if="isLogin" @click="logout">Logout</a>
    </div>-->
    <!-- 动画效果 -->
    <transition name="route-move">
      <!-- 动态添加样式雷 -->
      <router-view class="child-view"/>
    </transition>

    <cube-tab-bar show-slider v-model="selectedLabel" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" :key="index" :icon="item.icon" :label="item.value" >
        <span>{{item.label}}</span>
        <span v-if="showTotal(item.label)" class="badge">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  watch: {
    $route(route) {
      this.selectedLabel = route.path;
    }
  },
  created() {
    // 页面初始化时  path的值为/
    // this.selectedLabel = this.$route.path;
  },
  data() {
    return {
      selectedLabel: "/", // 默认页签
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home"
        },
        {
          label: "Cart",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "Me",
          value: "/login",
          icon: "cubeic-person"
        }
      ]
    };
  },

  computed: {
    ...mapGetters(["isLogin", "cartTotal"])
  },
  methods: {
    changeHandler(val) {
      // if you clicked different tab, this methods can be emitted
      console.log(val);
      this.$router.push(val);
    },
    logout() {
      this.$http.get("/api/logout");
    },
    showTotal(label) {
      return label === "Cart" && this.cartTotal > 0;
    }
  }
};
</script>

<style lang="less">
.child-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(~"100% - 46px");
  text-align: center;
  // padding-bottom: 46px;
}
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: antiquewhite;
  height: 46px;
  .cube-tab-bar-slider {
    top: 0;
  }
  .badge {
    border-radius: 44%;
    /* background: green; */
    border: 1px solid #e64340;
    width: 2rem;
    height: 1rem;
    display: inline-block;
    transform: scale(0.7);
    position: absolute;
    top: 10px;
  }
}
// 页面滑动动画
// 入场前
.route-move-enter {
  transform: translate3d(-100%, 0, 0);
}
// 出厂后
.route-move-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-move-enter-active,
.route-move-leave-active {
  transition: transform 0.3s;
}
</style>
