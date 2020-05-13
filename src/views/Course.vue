<template>
  <div> 
    <van-tabs v-model="active" sticky color="#5e8bb3" @change="change">
      <van-tab title="未完成" >
        <van-pull-refresh v-model="refreshing" @refresh="refreshCourse"  class="course-list">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadCourse()"
          offset="500"
          >
          
            <div class="course-item clearfix" v-for="(item,index) in list" :key="index">
              <div>
                <div class="avtor">
                  <img :src="item.img" alt />
                </div>
              </div>
              <div class="course-info">
                <div class="course-name">
                  {{item.name}}
                </div>
                <div class="course-other">
                  <van-icon name="location-o" />{{item.location}}
                </div>
                <div class="course-time">
                  <van-icon name="clock-o" />{{item.time}}
                </div>
                
              </div>
              <div class="course-btn">
                <van-button type="default" size="small" @click="show(item.cid)" color="rgb(245, 176, 29)" plain>查看详情</van-button>
              </div>
            </div>
          </van-list>
          
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已完成" >
        <van-pull-refresh v-model="refreshing" @refresh="refreshCourse"  class="course-list">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadCourse()"
          offset="500"
          >
          
            <div class="course-item clearfix" v-for="(item,index) in list" :key="index">
              <div>
                <div class="avtor">
                  <img :src="item.img" alt />
                </div>
              </div>
              <div class="course-info">
                <div class="course-name">
                  {{item.name}}
                </div>
                <div class="course-other">
                  <van-icon name="location-o" />{{item.location}}
                </div>
                <div class="course-time">
                  <van-icon name="clock-o" />{{item.time}}
                </div>
                
              </div>
              <div class="course-btn">
                <van-button type="default" size="small" @click="show(item.cid)" color="rgb(245, 176, 29)" plain>查看详情</van-button>
              </div>
            </div>
          </van-list>
          
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
// import { Toast } from 'vant';
// import { Dialog } from 'vant';
export default {
  data(){
    return{
      active:0,
      loading:false,
      finished:false,
      refreshing:false,
      list:[],
      size:5
    }
  },

  methods:{
    change(){
      this.list=[];
      this.loadCourse();
    },
    show(id){
       this.$router.push({path:'/home/courseDetail/'+id});
    },
    refreshCourse() {
      console.log("刷新")
      this.finished = false;
      this.loading = true;
      this.loadCourse();
    },
       // 格式化时间
    switchTimeFormat(date) {
      const dateTime = new Date(date);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth()+1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      month = month>9?month:'0'+month;
      day = day>9?day:'0'+day;
      hour = hour>9?hour:'0'+hour;
      return year+'-'+month+'-'+day+' '+hour+":00-"+hour+":50";
    },
    formatCourse(data){
      var item={};
      item.oid = data.oc_id;
      item.cid = data.cp_id;
      item.name = data.c_name;
      item.img = this.$store.state.ip+data.c_img;
      item.location = data.p_name;
      var time = data.cp_time;
      item.time = this.switchTimeFormat(time);
      return item;
    },
    loadCourse(){
      if(this.refreshing){
        this.refreshing = false;
        this.list=[];
      }
      var id = sessionStorage.getItem("uid");
      var state = this.active==0?true:false
      this.axios.post('/teacher/getCourse',{
        id:id,
        state:state,
        start:this.list.length,
        size:this.size
      })
      .then(res=>{
        console.log(res.data)
        if(res.data.code=='200'){
          var list = res.data.data.list;
          for(var i=0;i<list.length;i++){
            this.list.push(this.formatCourse(list[i]));
          }
          this.loading = false;
          if(this.list.length>=res.data.data.count){
            this.finished = true;
          }
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
  }
}
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.course-item{
  padding:10px 0;
  border-top: 1px solid @lineColor; 
}
.course-item>div{
  float: left;
}
.avtor{
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  img{
    height: 100%;
    width: 100%;
  }
}

.course-info{
  padding-left:5px;
  width: 195px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  i{
    vertical-align: middle;
  }
}
.course-time{
  font-size: 14px;
  vertical-align: middle;
  i{
    font-size: 16px;
  }
}
.course-other{
  font-size: 12px;
  vertical-align: middle;
  i{
    font-size: 14px;
  }
}
.course-btn{
  display: flex;
  flex-wrap: wrap;
  width: 70px;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>