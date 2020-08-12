<template>
  <mu-paper :z-depth="1" class="demo-loadmore-wrap">
    <mu-appbar style="width: 100%;" color="primary" textColor="white">
      <mu-button flat slot="left"></mu-button>
      <div style="font-size:18px">休假申请列表</div>
      <mu-button flat slot="right" @click="addVacation">
        <mu-icon value="add" right size="30"></mu-icon>
      </mu-button>
    </mu-appbar>

    <mu-container ref="container" class="demo-loadmore-content">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
        <mu-list textline="two-line" class="list">
          <div v-for=" (item,index) in listData" :key="index">
            <mu-list-item avatar button :ripple="true" @click="onItemClick(item)">
              <mu-list-item-action>
                <mu-avatar color="yellow600">
                  <mu-icon value="insert_chart"></mu-icon>
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{item.leavename}}</mu-list-item-title>
                <mu-list-item-sub-title>{{item.approvenode}}</mu-list-item-sub-title>
              </mu-list-item-content>
              <mu-list-item-action>
                <mu-list-item-sub-title>{{item.leavetime}}</mu-list-item-sub-title>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
        </mu-list>
      </mu-load-more>
    </mu-container>
  </mu-paper>
</template>

<script>
import Util from "../../util/Util";

export default {
  data() {
    this.refresh();
    return {
      listData: [],
      refreshing: false,
      loading: false,

      canloadMore: true,
      page: 1,
      limit: 20
    };
  },
  methods: {
    refresh() {
      this.refreshing = true;
      // this.$refs.container.scrollTop = 0;
      this.page = 1;
      this.getMyLeaveList(this.page);
    },
    load() {
      if (!this.canloadMore) {
        return;
      }
      this.loading = true;
      this.page++;
      this.getMyLeaveList(this.page);
    },

    addVacation: function() {
      this.$router.push({ name: "Add"});
    },
    onItemClick: function(item) {
      this.$router.push({ name: 'Detail',params:{ leaveno: item.leaveno } });
    },

    getMyLeaveList(page) {
      Util.post("getMyLeaveList", {
        page: page,
        limit: 10,
        userid: Util.info.userId,
        orgno: Util.info.orgNo
      }).then(resp => {
        console.log(JSON.stringify(resp));
        this.refreshing = false;
        this.loading = false;

        if (page == 1) {
          this.listData = resp.rows;
        } else {
          this.listData = this.listData.concat(resp.rows);
        }

        this.canloadMore = this.listData.length < resp.total;
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
}
.mu-infinite-scroll {
  height: 80px;
}
.mu-list {
  padding: 0px;
  background: white;
}
</style>
