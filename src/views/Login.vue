<template>
  <div>
    <cube-form :model="model" :schema="schema" @validate="validateHandler" @submit="submitHandler"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true
            },
            messages: {
              required: "用户名不能为空"
            },
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: { open: false }
            },
            rules: {
              required: true
            },
            messages: {
              required: "密码不能为空"
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault();
      console.log("submit", e);
      // post请求
      const res = await this.$http.post("/api/login", {
        // ...this.model
        username: this.model.username,
        password:this.model.password
      });
      // get 请求
      //   const res = await this.$http.get("/api/login", {
      //     params: {...this.model}
      //   });
      console.log(res);
      const { code, token, message } = res.data;
      if (code === 0) {
        localStorage.setItem("token", token);
        this.$store.commit("setToken", token);
        const redirect = this.$route.query.redirect || "/";
        this.$router.push(redirect);
      } else {
        // 登录失败
        const toast = this.$createToast({
          time: 2000,
          txt: message || "登录失败",
          type: "error"
        });
        toast.show();
      }
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log(
        "validity",
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex
      );
    }
  }
};
</script>

<style lang="less" scoped>
.cube-btn {
  background: burlywood;
}
</style>