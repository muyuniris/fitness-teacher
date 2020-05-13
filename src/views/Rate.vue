<template>
  <div>
    <van-nav-bar
      title="评价列表"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="main"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :label="item.msg" center label-class="custom-label">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div  class="rate clearfix">
              <div class="left">
                <div class="avtor">
                  <img :src="item.img" alt="">
                </div>
              </div>
              <div class="right">
                <div class="name">
                  <span>{{item.name}}:</span>
                  <van-rate
                    class="custom-rate"
                    v-model="item.rate"
                    :size="14"
                    readonly
                  /> 
                </div>
                <div  class="time">{{item.time}}</div>
              </div>
            </div>
          </template>
          
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
export default {
  data(){
    return{
      loading:false,
      finished:false,
      refreshing:false,
      list:[],
      size:9
    }
  },
  methods:{
    switchTimeFormat(date) {
      var dateTime = new Date(date);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      month = month>9?month:'0'+month;
      day = day>9?day:'0'+day;
      var time  = year+'-'+month+"-"+day
      return time;
    },
    formateData(item){
      var data = {};
      data.img = this.$store.state.ip+item.v_img;
      data.id = item.r_id;
      data.name = item.v_name;
      data.msg = item.r_msg?item.r_msg:'暂无';
      data.time = this.switchTimeFormat(item.r_time);
      data.rate = item.r_rate;
      return data;
    },
    onRefresh(){
      console.log("刷新")
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    onLoad(){
      console.log('加载');
      if(this.refreshing){
        this.refreshing = false;
        this.list=[];
      }
      var id=sessionStorage.getItem("tid");
      this.axios.post('/teacher/getRate',{
        id:id,
        start:this.list.length,
        size:this.size
      })
      .then((res) => {
        console.log(res);
        if(res.data.code=='200'){
          var list = res.data.data.list;
          for(var i=0;i<list.length;i++){
            this.list.push(this.formateData(list[i]));
          }
          console.log(list,this.list)
          this.loading=false;
          if(this.list.length>=res.data.data.count){
            this.finished = true;
          }
        }
      })
      .catch(err=> {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.rate{
  .left{
    float: left;
    padding: 4px 0;
  }
  .avtor{
    width: 36px;
    height: 36px;
    
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .right{
    float: left;
    margin-left: 15px
  }
  .name{
    font-size: 18px;
    color:@buttonColor;
  }
  .time{
    font-size: 12px;
    color:gray;
  }
}
.custom-label{
  font-size: 18px;
  padding: 10px 0;
  color:black;
}
</style>