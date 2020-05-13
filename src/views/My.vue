<template>
  <div class="my">
    <div class="bg">
    </div>
    <div class="header">
      <div class="avtor">
        <img :src="this.$store.state.ip+teacher.img" alt="">
      </div>
      <div class="user-info">
        <div class="name">{{teacher.name}}</div>
      </div>
    </div>
    <div class="main">
      <van-cell-group>
        <van-cell title="性别" :value="teacher.sex" size='large'/>
        <van-cell title="生日" :value="teacher.birth" size='large'/>
        <van-cell title="年龄" :value="teacher.age" size='large'/>
        <van-cell title="描述" :label='teacher.info' size='large'/>
        <van-cell title="手机号" :value='teacher.tel' is-link to="/home/alterTel" size="large"/>
        <van-cell title="修改密码" is-link to="/home/alterPwd" size="large"/>
        <van-cell title="退出登录" is-link @click="quit" />
      </van-cell-group>
    </div>
    
      <van-button icon="edit" class="btn-alter" @click="alter"></van-button>
 
  </div>
</template>
<script>
import { Toast } from 'vant';
export default {
  name:"my",
  data(){
    return {
      teacher:{}
    }
  },
  methods:{
    alter(){
      this.$router.push({ path: "/home/alterInfo" });
    },
    quit(){
      sessionStorage.removeItem('token')
      this.$router.replace({ path: "/login" });
    },
    GetAge(strBirthday){       
      var returnAge,
      strBirthdayArr=strBirthday.split("-"),
      birthYear = strBirthdayArr[0],
      birthMonth = strBirthdayArr[1],
      birthDay = strBirthdayArr[2],  
      d = new Date(),
      nowYear = d.getFullYear(),
      nowMonth = d.getMonth() + 1,
      nowDay = d.getDate();   
      if(nowYear == birthYear){
        returnAge = 0;//同年 则为0周岁
      }
      else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
          if(nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            if(dayDiff < 0) {
              returnAge = ageDiff - 1;
            }else {
              returnAge = ageDiff;
            }
          }else {
            var monthDiff = nowMonth - birthMonth;//月之差
            if(monthDiff < 0) {
              returnAge = ageDiff - 1;
            }
            else {
              returnAge = ageDiff ;
            }
          }
        }else {
          returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
      } 
      return returnAge;//返回周岁年龄
    },
    formatData(item){
      var data = {};
      data.id = item.t_id;
      data.uid = item.u_id;
      data.tel = item.u_tel.substring(0,3)+"****"+item.u_tel.substring(7);
      data.img = item.t_img;
      data.name = item.t_name;
      data.birth = item.t_birth?item.t_birth:"待完善";
      data.age = data.birth?this.GetAge(data.birth):"待完善";
      data.birth = this.switchTimeFormat(data.birth);
      data.sex = item.t_sex?'女':'男';
      data.info = item.t_info?item.t_info:'暂无'
      return data;
    },
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
  },
  created(){
    var id = sessionStorage.getItem("uid");
    this.axios.post("/teacher/getTeacher",{
      id:id
    })
    .then(res=>{
      console.log(res.data);
      if(res.data.code=="200"){
        this.teacher = this.formatData(res.data.data);
        console.log(this.teacher);
        sessionStorage.setItem("tid",res.data.data.t_id);
        Toast.clear();
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
</script>
<style lang="less" scoped>
@import "../assets/less/base.less";
.btn-alter{
  position: absolute;
  top: 150px;
  right: 0;
  border: none;
  background: transparent;
  color:@buttonColor;
  font-size: 20px;
}
.bg{
  background: rgb(73, 107, 136);
  color:white;
  padding: 40px 20px;
  height: 70px;
  background: url('/img/bg2.jpg') center;
  background-size: cover;
}
.header{
  text-align: center;
  padding: 20px;
  margin-top: -50px;
}
.avtor{
  border: 1px solid #ddd;
  height: 70px;
  width: 70px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
  }
}
.user-info{
  // height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .name{
    font-size: 20px;
  }
}

</style>
<style>

</style>