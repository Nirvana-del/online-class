<template>
  <div class="wrap">
    <div class="silderBar">
      <div class="title">
        <h5 class="mb-2">通鸿云后台管理</h5>
      </div>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="true"
          ><el-icon><ArrowLeft /></el-icon
        ></el-radio-button>
        <el-radio-button :label="false"
          ><el-icon><ArrowRight /></el-icon
        ></el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <!-- active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff" -->
        <el-menu-item index="1" @click="gotoDataAssess">
          <el-icon><Coin /></el-icon>
          <span>数据分析</span>
        </el-menu-item>
        <el-menu-item index="2" @click="gotoCourseList">
          <el-icon><Menu /></el-icon>
          <span>课程管理</span>
        </el-menu-item>
        <!-- <el-menu-item index="2" @click="gotoCourseList">
          <el-icon><User /></el-icon>
          <span>客户管理</span>
        </el-menu-item> -->
        <el-menu-item index="3" @click="gotoTeacher">
          <el-icon><Avatar /></el-icon>
          <span>讲师管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="gotoClass">
          <el-icon><List /></el-icon>
          <span>班级管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="gotoUser">
          <el-icon><UserFilled /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="6" @click="logOut">
          <el-icon><Close /></el-icon>
          <span>退出登录</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
import { ref } from "vue";
import router from '@/router';
import { useStore } from 'vuex';
const store = useStore()
    const isCollapse = ref(false);
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const gotoCourseList = () => {
      router.push('/home/courseList')
    }
    const gotoDataAssess = () => {
      router.push('/home/dataAssess')
    }
    const gotoTeacher = () => {
      router.push('/home/teacher')
    }
    const gotoClass = () => {
      router.push('/home/class')
    }
    const gotoUser = () => {
      router.push('/home/user')
    }
    const logOut = () => {
      store.commit('clearUserInfo')
    }
</script>
<style lang="scss" scoped>
.item {
  text-decoration: none;
}

.wrap {
  display: flex;
  width: 100%;
  .silderBar {
    flex: 1;
    overflow: hidden;
    .title {
      color: #f56c6c;
      text-align: center;
      font-size: 20px;
      float: left;
    }
  }

  .main {
    flex: 8;
    margin-left: 40px;
  }
}
</style>