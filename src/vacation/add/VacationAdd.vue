<template>
  <mu-paper :z-depth="1" class="demo-loadmore-wrap">
    <mu-appbar style="width: 100%;" color="primary" textColor="white">
      <mu-button flat slot="left" @click="navBack">
        <mu-icon value="arrow_back" left size="24"></mu-icon>
      </mu-button>
      <div style="font-size:18px">新建休假申请</div>
      <mu-button flat slot="right" @click="submit" style="font-size:16px">提交</mu-button>
    </mu-appbar>

    <mu-container ref="container" class="demo-loadmore-content">
      <mu-flex direction="column" style="width:100%">
        <mu-divider style="height:10px"></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">休假单名称:</div>
          <input class="item-right" v-model="info.name" placeholder="请输入休假单名称" />
        </mu-flex>

        <mu-divider></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">休假类别:</div>
          <input
            class="item-right"
            readonly
            @click="selectType"
            :value="info.typeName"
            placeholder="请选择休假类别"
          />
          <mu-icon value="navigate_next"></mu-icon>
        </mu-flex>

        <mu-divider></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">考勤期间:</div>
          <input
            class="item-right"
            readonly
            @click="selectPeriod"
            :value="info.periodName"
            placeholder="请选择考勤期间"
          />
          <mu-icon value="navigate_next"></mu-icon>
        </mu-flex>
      </mu-flex>

      <mu-divider></mu-divider>
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

      <div v-for="(item,index) in info.child" :key="index">
        <mu-divider style="height:10px"></mu-divider>
        <div class="child_label">休假明细{{index+1}}</div>

        <mu-divider></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">开始时间:</div>
          <datetime
            class="item-right"
            input-class="datetimeinput"
            format="kkkk-LL-dd HH:mm"
            type="datetime"
            v-model="item.startDtm"
          ></datetime>
          <mu-icon value="navigate_next"></mu-icon>
        </mu-flex>

        <mu-divider></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">结束时间:</div>
          <datetime
            class="item-right"
            input-class="datetimeinput"
            format="kkkk-LL-dd HH:mm"
            type="datetime"
            v-model="item.endDtm"
          ></datetime>
          <mu-icon value="navigate_next"></mu-icon>
        </mu-flex>

        <mu-divider></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">休假天数:</div>
          <input class="item-right" v-model="item.dayNum" placeholder="请输入休假天数" />
        </mu-flex>

        <mu-divider></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">请假事由:</div>
          <input class="item-right" v-model="item.reason" placeholder="请输入请假事由" />
        </mu-flex>

        <mu-divider></mu-divider>
        <mu-flex align-items="center" class="row-item">
          <div class="item-left">工作交接人:</div>
          <input
            class="item-right"
            readonly
            @click="selectHandler(item)"
            :value="item.handlerName"
            placeholder="请选择工作交接人"
          />
          <mu-icon value="navigate_next"></mu-icon>
        </mu-flex>
        <mu-divider></mu-divider>
      </div>

      <mu-bottom-sheet :open.sync="open">
        <mu-list>
          <mu-list-item
            button
            @click="closeBottomSheet(index)"
            v-for="(item,index) in sheets"
            :key="index"
          >
            <mu-list-item-title>{{item}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </mu-container>
    <mu-divider></mu-divider>
    <mu-button flat color="primary" style="height:45px" @click="addItem">+ 添加休假明细</mu-button>
  </mu-paper>
</template>

<script>
import Util from "../../util/Util";

export default {
  data() {
    this.getLeaveTypeAndCheckPeriodList();
    return {
      datetime: "",
      leavetype: [],
      checkperiod: [],
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
      info: {
        name: "",
        typeNo: "",
        typeName: "",
        period: "",
        periodName: "",
        child: [
          {
            startDtm: "",
            endDtm: "",
            dayNum: "",
            reason: "",
            handler: "",
            handlerName: ""
          }
        ]
      },
      open: false,
      sheets: [],
      openDialog: false,
      showDate: true,
      pickTime: null,
      realBack:false,
    };
  },

  methods: {
    navBack: function() {
      this.realBack=true;
      this.$router.go(-1);
    },
    submit: function() {
      console.log(this.info);
    },
    addItem: function() {
      this.info.child.push({
        startDtm: "",
        endDtm: "",
        dayNum: "",
        reason: "",
        handler: "",
        handlerName: ""
      });
    },
    selectType: function() {
      this.sheets = [];
      for (let i = 0; i < this.leavetype.length; i++) {
        this.sheets.push(this.leavetype[i].NAME);
      }
      this.open = true;
      this.closeBottomSheet = index => {
        this.open = false;
        this.info.typeNo = this.leavetype[index].ID;
        this.info.typeName = this.leavetype[index].NAME;
        this.getLeaveDays();
      };
    },
    selectPeriod: function() {
      this.sheets = [];
      for (let i = 0; i < this.checkperiod.length; i++) {
        this.sheets.push(this.checkperiod[i].NAME);
      }
      this.open = true;
      this.closeBottomSheet = index => {
        this.open = false;
        this.info.period = this.checkperiod[index].ID;
        this.info.periodName = this.checkperiod[index].NAME;
        this.getLeaveDays();
      };
    },
    selectHandler: function(item) {
      item.handler = "HULIFEI";
      item.handlerName = "hulifei22333";
      this.$router.push({
        name: "SelectPeople",
        params: {
          callback: function(user) {
            item.handler = user.name;
            item.handlerName = user.value;
          }
        }
      });
    },

    selectStartDate: function(item) {
      console.log(item);
    },

    selectEndDate: function(item) {
      item.endDtm = "2020-06-16 12:12:12";
    },

    getLeaveTypeAndCheckPeriodList() {
      Util.post("getLeaveTypeAndCheckPeriodList", {
        userid: Util.info.userId,
        orgno: Util.info.orgNo
      }).then(resp => {
        this.leavetype = resp.leavetype;
        this.checkperiod = resp.checkperiod;
      });
    },
    getLeaveDays() {
      console.log(this.info);
      Util.post("getLeaveDays", {
        userid: Util.info.userId,
        orgno: Util.info.orgNo,
        leavetype: this.info.typeNo,
        checkperiod: this.info.period
      }).then(resp => {
        this.cirlcles[0].num = resp.currentperioddays;
        this.cirlcles[1].num = resp.lefttotaldays;
        this.cirlcles[2].num = resp.useddays;
      });
    },
    closeBottomSheet() {
      this.open = false;
    }
  },

  mounted() {
    if (window.info) {
      this.info = window.info;
      this.cirlcles = window.cirlcles;
      window.info = null;
    }
  },
  destroyed() {
    if (!this.realBack) {
      window.info = this.info;
      window.circles = this.circles;
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
.row-item {
  height: 45px;
  width: 100%;
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
}
.item-left {
  width: 100px;
  color: #666;
  text-align: left;
}
.item-right {
  flex: 1;
  text-align: right;
  border: none;
  outline: none;
  color: #333;
}
.child_label {
  height: 45px;
  line-height: 45px;
  text-align: left;
  padding-left: 10px;
}
.bottom_add {
  width: 100%;
  height: 45px;
}
</style>
