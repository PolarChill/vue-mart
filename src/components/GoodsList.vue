<template>
  <div>
    <div class="item" v-for="item in goods" :key="item.id">
      <router-link :to="`/detail/${item.id}`">
        <div class="left">
          <img :src="item.img" @click.stop.prevent="imgPreview(item.img)">
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <!-- 避免冒泡和默认行为 -->
            <i class="cubeic-add" @click.stop.prevent="addCart(item)"></i>
            <span>{{item.count}}人购买</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  props: ["goods"],
  methods: {
    addCart(item) {
      this.$store.commit("addCart", item);
    },
    imgPreview(img) {
      // 调用cube-ui全局api动态添加图片预览组件
      this.$createImagePreview({
        imgs: [img]
      }).show();
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  padding: 10px;
  overflow: hidden;
  .left {
    width: 100px;
    float: left;
    img {
      width: 100%;
    }
  }
  .right {
    margin-left: 120px;
    text-align: left;
    .title {
      line-height: 30px;
    }
    .cubeic-add {
      font-size: 22px;
      cursor:  pointer;
    }
  }
}
</style>