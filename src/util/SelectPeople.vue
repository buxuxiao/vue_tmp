<template>
  <mu-paper :z-depth="1" class="demo-loadmore-wrap">
    <mu-appbar style="width: 100%;" color="primary" textColor="white">
      <mu-button flat slot="left" @click="navBack">
        <mu-icon value="arrow_back" left size="24"></mu-icon>
      </mu-button>
      <div style="font-size:18px">选择人员</div>
      <mu-button flat slot="right" style="font-size:16px"></mu-button>
    </mu-appbar>

    <mu-container ref="container" class="demo-loadmore-content">
      <mu-list>
        <mu-list-item
          button
          :ripple="false"
          @click="onItemClick(item)"
          v-for="item in users"
          :key="item.name"
        >
          <mu-list-item-action>
            <mu-checkbox v-model="item.check" readonly></mu-checkbox>
          </mu-list-item-action>
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-container>
  </mu-paper>
</template>

<script>
export default {
  data() {
    let arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push({
        check: false,
        name: "胡礼飞" + i,
        value: "hulifei" + i
      });
    }
    return {
      users: arr
    };
  },
  methods: {
    navBack: function() {
      this.$router.go(-1);
    },
    onItemClick: function(item) {
      this.$route.params.callback(item);
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.demo-loadmore-wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.demo-loadmore-content {
  padding: 0px;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>