<template>
  <div class="teacher-list">
    <div class="bread-crumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/class">班级</el-breadcrumb-item>
            <el-breadcrumb-item>班级管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
    <div class="top-info">
      <div class="operation">
        <el-button type="default" icon="Plus" @click="toAddClassess"
          >添加班级</el-button
        >
        <el-button type="default" icon="DeleteFilled">批量删除</el-button>
      </div>
      <div class="search">
        <el-input v-model="state.keyWord" placeholder="请输入内容" />
        <el-button type="default" icon="Search"></el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTableRef"
        :data="state.classesList"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" header-align="center" />
        <el-table-column
          label="封面"
          align="center"
          width="150"
          header-align="center"
        >
          <template #default="props">
            <img
              :src="props.row.coverUrl == null ? emptyImg : props.row.coverUrl"
              style="width: 120px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          property="name"
          label="班级名称"
          align="center"
          width="150"
        />
        <el-table-column
          property="atmosphere"
          label="班训"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          property="headteacher.nickName"
          label="班主任"
          header-align="center"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template #default="props">
            <el-button
              type="default"
              size="default"
              icon="EditPen"
              @click="toEditClass(props.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除该班级吗？"
              @confirm="deleteClass(props.row)"
            >
              <template #reference>
                <el-button type="danger" size="default" icon="DeleteFilled"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[5, 10, 20, 30]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="dialogVisible" title="班级信息" width="30%" :lock-scroll="false">
      <el-form
        label-width="100px"
        :model="state.classesList"
        style="max-width: 460px"
      >
      <el-form-item label="班级封面：">
          <el-upload
            class="avatar-uploader"
            action="/api/common/uploadImage"
            :show-file-list="false"
            :on-success="handleFaceImgSuccess"
            :before-upload="beforeFaceImgUpload"
          >
            <img
              v-if="state.classInfo.coverUrl !== null"
              :src="state.classInfo.coverUrl"
              class="avatar"
              style="width: 200px; height: 200px"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="班级名称：">
          <el-input v-model="state.classInfo.name" placeholder="班级名称" />
        </el-form-item>
        <el-form-item label="班训:">
          <el-input v-model="state.classInfo.atmosphere" placeholder="班训" />
        </el-form-item>
        <el-form-item label="班主任:">
            <el-select
            v-model="state.classInfo.headteacher.id"
            class="m-2"
            placeholder="选择班主任"
            size="default"
            :loading="state.teacherLoading"
            loading-text="加载中..."
            @visible-change="getTeacherIdName"
          >
            <el-option
              v-for="item in state.teacherList"
              :key="item.id"
              :label="item.teacherName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="buttonConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
    
<script lang="ts" setup>
import router from "@/router";
import { ElMessage } from "element-plus";
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import { Classes } from "./types/Classes";
import { Teacher } from "./types/Teacher/index";
let dialogVisible = ref(false);
let isEdit = ref(false);
const { proxy } = getCurrentInstance() as any;
const emptyImg = require("@/assets/empty.png");
const state = reactive({
  classesList: [] as Classes[],
  classInfo: {} as Classes,
  teacherList: [] as Teacher[],
  keyWord: "",
  teacherLoading: false
});
const pagination = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});
// 获取老师ID姓名集合
const getTeacherIdName = (val: Boolean): void => {
  console.log(val);
  state.teacherLoading = true;
  if (val) {
    proxy.$API.default.teacher.getTeacherIdName().then((res: any) => {
      console.log(res.data);
      const { code, msg, data } = res.data;
      if (code == "0") {
        state.teacherList = data;
      }
      state.teacherLoading = false;
    });
  }
};

// 改变当前页
const handleCurrentChange = (e: any) => {
  console.log(e);
  pagination.currentPage = e;
  getClasserList();
}
// 改变页大小
const handleSizeChange = (e: any) => {
  console.log(e);
  pagination.pageSize = e;
  pagination.currentPage = 1;
  getClasserList();
}

// 弹出框确定按钮
const buttonConfirm = (): void => {
  if (isEdit.value == true) {
    editClassess();
  } else {
    addClasses();
  }
}

// 添加班级信息
const addClasses = (): void => {
  console.log(state.classInfo);

  proxy.$API.default.classes
    .reqAddClassesItem(state.classInfo)
    .then((res: any) => {
      console.log(res);
      const { code, data, msg } = res.data;
      if (code == "0") {
        getClasserList();
      }
    });
};
// 删除班级信息
const deleteClass = (row: Classes): void => {
  console.log(row);
  proxy.$API.default.classes.reqDeleteClasserItem(row.id).then((res: any) => {
    console.log(res);
    const { code, msg, data } = res.data;
    if (code == "0") {
      getClasserList();
    }
  });
}
// 查询班级列表
const getClasserList = (): void => {
  console.log(proxy.$API.default);

  proxy.$API.default.classes.reqGetClassList(pagination).then((res: any) => {
    console.log(res.data);
    const { code, msg, data } = res.data;
    if (code == "0") {
      state.classesList = data.grades;
      pagination.total = data.totalItems;
      dialogVisible.value = false;
    }
  });
}
// 修改班级信息
const editClassess = (): void => {
  proxy.$API.default.teacher
    .updateCourseItem(state.classInfo)
    .then((res: any) => {
      console.log(res);
      const { code, data, msg } = res.data;
      if (code == "0") {
        getClasserList();
        isEdit.value = false;
      }
    });
}

// 点击添加班级按钮 
const toAddClassess = () =>{
  isEdit.value = false;
  state.classInfo.name = null;
  state.classInfo.atmosphere = null;
  state.classInfo.coverUrl = null;
  state.classInfo.headteacher = {
    id: null,
    nickName: "",
  }
  console.log(state.classInfo);

  dialogVisible.value = true;
}
// 点击编辑班级按钮
const toEditClass = (classInfo: Classes) => {
  console.log(classInfo);
  isEdit.value = true;
  Object.assign(state.classInfo, classInfo);
  console.log(state.classInfo);
  dialogVisible.value = true;
}

// 班级封面上传成功回调
const handleFaceImgSuccess = (response: any, uploadFile: any) => {
  console.log(response);
  console.log(uploadFile);
  const { code, msg, data } = response;
  if (code == "0") {
    state.classInfo.coverUrl = data;
  }
};
// 班级封面图片大小限定
const beforeFaceImgUpload = (rawFile: any) => {
  console.log(rawFile);

  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("图片必须是 JPG 格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过 2MB!");
    return false;
  }
  return true;
};

//时间戳格式化 
const dateFormat = (time: string): string => {
  var data = new Date(time); //获取年
  var y = data.getFullYear(); //获取月
  var m = data.getMonth() + 1; //获取日
  var d = data.getDate();
  //获取小时，判断是否小于10，小于10前面加o
  var hours = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  //获取分钟，判断是否小于10，小于10前面加o
  var minutes =
    data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  //获取秒，判断是否小于10，小于10前面加o
  //var secounds = data.getSeconds()<10 ? 'O' + data.getSeconds() : data.getSeconds();
  //输出结果
  return `${y}-${m}-${d} ${hours}:${minutes}`;
}
onMounted(() => {
  getClasserList();
});
</script>
    
    
  <style lang="scss" scoped>
.teacher-list {
  overflow: hidden;
  .bread-crumb {
    margin-top: 33px;
  }
  .top-info {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 20px;
    .search {
      display: flex;
    }
  }
  .pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>