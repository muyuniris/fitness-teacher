<template>
  <div>
    <van-tabs v-model="active" sticky color="#5e8bb3" @change="change">
      <van-tab title="未完成">
        <van-pull-refresh v-model="refreshing" @refresh="refresh"  class="teacher-list">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="load()"
          >
            <div class="teacher-item clearfix" v-for="(item,index) in list" :key="index">
              <div>
                <div class="avtor">
                  <img :src="item.img" alt />
                </div>
              </div>
              <div class="teacher-info">
                <div class="teacher-name">
                  <van-icon name="contact" /> {{item.name}}
                </div>
                <div class="teacher-tel">
                  <van-icon name="phone-o" /> {{item.tel}} 
                </div>
                <div class="teacher-time">
                  <van-icon name="underway-o" /> {{item.time}}
                </div>

              </div>
            </div>
          </van-list>
          
        </van-pull-refresh>
      </van-tab>
      <van-tab title="已完成">
        <van-pull-refresh v-model="refreshing" @refresh="refresh"  class="teacher-list">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="load()"
          >
            <div class="teacher-item clearfix" v-for="(item,index) in list" :key="index">
              <div>
                <div class="avtor">
                  <img :src="item.img" alt />
                </div>
              </div>
              <div class="teacher-info">
                <div class="teacher-name">
                  <van-icon name="contact" /> {{item.name}}
                </div>
                <div class="teacher-tel">
                  <van-icon name="phone-o" /> {{item.tel}} 
                </div>
                <div class="teacher-time">
                  <van-icon name="underway-o" /> {{item.time}}
                </div>

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
    refresh(){
      this.finished = false;
      this.loading = true;
      this.load();
    },
    back(){
      this.$router.go(-1);
    },
    change(){
      console.log("change");
      this.list=[];
      this.load();
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
    formatDate(data){
      console.log(data);
      var item={};
      item.oid = data.ot_id;
      item.tel = data.u_tel;
      item.name = data.v_name;
      item.img = this.$store.state.ip+data.v_img;
      var time = data.ot_time;
      item.time = this.switchTimeFormat(time);
      console.log(time);

      return item;
    },
    load(){
      if(this.refreshing){
        this.refreshing = false;
        this.list=[];
      }
      var tid = sessionStorage.getItem("tid");
      var state = this.active==0?true:false
      this.axios.post('/order/teacherData',{
        id:tid,
        state:state,
        start:this.list.length,
        size:this.size
      })
      .then(res=>{
        console.log(res.data)
        if(res.data.code=='200'){
          var list = res.data.data.list;
          for(var i=0;i<list.length;i++){
            this.list.push(this.formatDate(list[i]));
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
.van-nav-bar__text,.van-nav-bar .van-icon{
  color: @buttonColor;
}
.teacher-item{
  padding:10px;
  border-top: 1px solid @lineColor; 
}
.teacher-item>div{
  float: left;
}
.avtor{
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  img{
    width: 100%;
  }
}

.teacher-info{
  padding-left:5px;
  width: 185px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  i{
    vertical-align: middle;
  }
}
.teacher-name{
  font-size: 18px;
  color:@buttonColor;
}
.teacher-time{
  font-size: 14px;
  vertical-align: middle;
}
</style>