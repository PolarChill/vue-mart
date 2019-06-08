<template>
  <div>
    <cube-slide class="home-slider" ref="slide" :data="slider" :interval="3000">
      <cube-slide-item v-for="(item, index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="slider-img">
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <!-- 筛选按钮 -->
    <cube-button class="filter-button" @click="showCatg">选择分类</cube-button>
    <goods-list :goods="filterGoods" class="goods-list"></goods-list>
    <cube-drawer ref="goods-drawer" title="请选择分类" :data="[drawerList]" @select="selectHandle"></cube-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodsList from "@/components/GoodsList.vue";
const labels = {
  fe: "前端",
  python: "Python",
  java: "Java",
  bigdata: "大数据",
  ai: "人工智能"
};
export default {
  name: "home",
  components: {
    GoodsList
  },

  async created() {
    const {
      data: { data: goods, slider, keys }
    } = await this.$http.get("/api/goods");
    this.slider = slider;
    this.keys = keys;
    this.selectedKeys = keys;
    this.goods = goods;
    console.log(slider);
  },
  data() {
    return {
      slider: [],
      keys: [],
      selectedKeys: [], // 分类过滤时使用,
      goods: []
    };
  },
  methods: {
    showCatg() {
      this.$refs["goods-drawer"].show();
    },
    selectHandle(val) {
      this.selectedKeys = [...val];
    }
  },
  computed: {
    // 整理数据
    filterGoods() {
      let ret = [];
      this.selectedKeys.forEach(key => {
        ret = ret.concat(this.goods[key]);
      });
      return ret;
    },
    drawerList() {
      return this.keys.map(v => {
        return {
          text: labels[v],
          value: v
        };
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home-slider {
  height: auto;
}
.filter-button{
  background: antiquewhite;
  border-radius: 4px;
}
.goods-list{
  padding-top: 15px;
  padding-bottom: 46px;
}
.slider-img {
  width: 100%;
  height: auto;
}
</style>

