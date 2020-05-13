<template>
<div>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  <van-tabbar route active-color="#5e8bb3" inactive-color="#9D9D9D">
    <van-tabbar-item icon="label" replace to="/home/course">课程</van-tabbar-item>
    <van-tabbar-item icon="clock" replace to="/home/order">预约</van-tabbar-item>
    <van-tabbar-item icon="chat" replace to="/home/rate">评价</van-tabbar-item>
    <van-tabbar-item icon="manager" replace to="/home">我的</van-tabbar-item>
  </van-tabbar>
</div>
 
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {

  }
}
</script>
<style lang="less" scoped>
</style>
