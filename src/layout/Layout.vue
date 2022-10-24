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
        <el-menu-item index="1" @click="gotoCourseList">
          <el-icon><Menu /></el-icon>
          <span>课程管理 </span>
        </el-menu-item>
        <el-menu-item index="2" @click="gotoCourseList">
          <el-icon><User /></el-icon>
          <span>客户管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="gotoTeacher">
          <el-icon><Avatar /></el-icon>
          <span>讲师管理</span>
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

    const isCollapse = ref(false);
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    function gotoCourseList(){
      router.push('/courseList')
    }
    const gotoTeacher = () => {
      router.push('/teacher')
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