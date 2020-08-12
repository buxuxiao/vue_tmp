<template>
  <mu-paper :z-depth="1" class="demo-loadmore-wrap">
    <mu-appbar style="width: 100%;" color="primary" textColor="white">
      <mu-button flat slot="left" @click="navBack">
        <mu-icon value="arrow_back" left size="24"></mu-icon>
      </mu-button>
      <div style="font-size:18px">休假申请详情</div>
      <mu-button flat slot="right" @click="navBack">
        <mu-icon value="1234" left size="24"></mu-icon>
      </mu-button>
    </mu-appbar>

    <mu-container ref="container" class="demo-loadmore-content">
      <mu-flex direction="column" style="width:100%">
        <mu-divider style="height:10px"></mu-divider>
        <mu-flex align-items="center" style="width:100%">
          <mu-button class="checkperiod" color="primary" flat>{{info.leavetype}}</mu-button>
          <div style="flex:1"></div>
          <mu-button class="checkperiod" color="primary" flat>{{info.checkperiod}}</mu-button>
        </mu-flex>
        <mu-divider></mu-divider>
      </mu-flex>

      <mu-flex style="width:100%">
        <mu-flex
          direction="column"
          align-items="center"
          style="flex:1"
          v-for="item in cirlcles"
          :key="item.label"
        >
          <div
            :class="{'circle_green':item.color==='green','circle_blue':item.color==='blue'}"
            class="circle"
          >{{item.num}}</div>
          <div class="circle_label">{{item.label}}</div>
        </mu-flex>
      </mu-flex>

      <template v-for="(item,index) in content">
        <mu-divider v-if="item.type==0" :key="index" style="height:10px"></mu-divider>
        <mu-flex v-else-if="item.type==1" :key="index" align-items="center" style="height:32px">
          <div class="type1">{{item.label}}</div>
          <div class="type1" style="flex:1;color:#333">{{item.text}}</div>
        </mu-flex>
        <div class="title" v-else-if="item.type==2" :key="index">{{item.title}}</div>
      </template>
    </mu-container>
  </mu-paper>
</template>

<script>
import Util from "../../util/Util";

export default {
  data() {
    this.getMyLeaveList();
    return {
      cirlcles: [
        {
          num: 0,
          label: "享有天数",
          color: "red"
        },
        {
          num: 0,
          label: "结余天数",
          color: "green"
        },
        {
          num: 0,
          label: "已休天数",
          color: "blue"
        }
      ],
      content: [],
      info: {
        leavetype: "年假",
        checkperiod: "2020年考勤期间"
      }
    };
  },
  methods: {
    navBack: function() {
      this.$router.go(-1);
    },

    getMyLeaveList() {
      Util.post("getLeaveInfo", {
        leaveno: this.$route.params.leaveno
      }).then(resp => {
        this.info = resp.info;

        this.cirlcles[0].num = this.info.leavetotaldays;
        this.cirlcles[1].num = this.info.leaveleft;
        this.cirlcles[2].num = this.info.leaveused;
        // 主表
        this.content.push({ type: 0 });
        this.content.push({
          type: 1,
          label: "编号：",
          text: this.info.leaveid
        });
        this.content.push({ type: 1, label: "状态：", text: this.info.status });
        this.content.push({
          type: 1,
          label: "休假单名称：",
          text: this.info.leavename
        });
        this.content.push({
          type: 1,
          label: "申请日期：",
          text: this.info.leavetime
        });

        for (let i = 0; i < this.info.leaves.length; i++) {
          let item = this.info.leaves[i];
          this.content.push({ type: 0 });
          this.content.push({ type: 2, title: "休假明细" + (i + 1) });
          this.content.push({
            type: 1,
            label: "开始时间：",
            text: item.leavestarttime
          });
          this.content.push({
            type: 1,
            label: "结束时间：",
            text: item.leaveendtime
          });
          this.content.push({
            type: 1,
            label: "休假天数：",
            text: item.leavedays
          });
          this.content.push({
            type: 1,
            label: "休假事由：",
            text: item.leavereason
          });
          this.content.push({
            type: 1,
            label: "工作交接人：",
            text: item.worktransfer
          });
          this.content.push({
            type: 1,
            label: "假期电话：",
            text: item.phonenum
          });
        }
      });
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
  font-size: 15px;
}
.checkperiod {
  padding: 10px;
  font-size: 16px;
  color: primary;
  text-align: right;
}
.circle {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border: 1px solid red;
  border-radius: 50px;
  margin-top: 10px;
  font-size: 26px;
  color: red;
}
.circle_green {
  color: green;
  border-color: green;
}
.circle_blue {
  color: blue;
  border-color: blue;
}
.circle_label {
  margin-top: 5px;
  margin-bottom: 10px;
  color: #999;
}
.type1 {
  width: 100px;
  text-align: left;
  color: #999;
  padding-left: 10px;
}
.title {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  text-align: left;
  color: #444;
  font-size: 16px;
  padding-left: 10px;
}
</style>
