<template>
  <mu-flex
    class="head_container"
    direction="row"
    align-items="center"
    justify-content="between"
    color="primary"
    style="color:primary"
  >
    <div class="button" @click="leftListener">{{leftText}}</div>
    <div class="button">{{title}}</div>
    <div class="button" @click="rightListener">{{rightText}}</div>
  </mu-flex>
</template>

<script>
export default {
  props: {
    title: String,
    leftText: String,
    leftListener: Function,
    rightText: String,
    rightListener: Function
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.head_container {
  width: 100%;
  height: 45px;
  background: primary;
}

.button {
  padding: 10px;
  font-size: 16px;
}
</style>