<template>
  <div class="teacher-list">
    <!-- <div class="bread-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/courseList">课程</el-breadcrumb-item>
          <el-breadcrumb-item>课程管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div> -->
    <div class="top-info">
      <div class="operation">
        <el-button type="default" icon="Plus" @click="toAddTeacher"
          >添加讲师</el-button
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
        :data="state.teacherList"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" header-align="center" />
        <el-table-column
          property="phone"
          label="联系电话"
          align="center"
          width="150"
        />
        <el-table-column
          property="teacherName"
          label="姓名"
          header-align="center"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          property="introduce"
          label="教师简介"
          header-align="center"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          property="email"
          label="邮箱"
          width="200"
          header-align="center"
          align="center"
        />
        <!-- <el-table-column
          property="level"
          label="级别"
          width="120"
          header-align="center"
          align="center"
        /> -->

        <el-table-column header-align="center" align="center" label="操作">
          <template #default="props">
            <el-button
              type="default"
              size="default"
              icon="EditPen"
              @click="toEditTeacher(props.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除该课程吗？"
              @confirm="deleteTeacher(props.row)"
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
    <el-dialog v-model="dialogVisible" title="课程信息" width="30%">
      <el-form
        label-width="100px"
        :model="state.teacherList"
        style="max-width: 460px"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="state.teacherInfo.teacherName"
            placeholder="姓名"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="state.teacherInfo.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="state.teacherInfo.phone" placeholder="电话号码" />
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input
            v-model="state.teacherInfo.introduce"
            type="textarea"
            placeholder="讲师简介"
          />
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
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import { Teacher } from "./types/Teacher";
let dialogVisible = ref(false);
let isEdit = ref(false);
const { proxy } = getCurrentInstance() as any;
const state = reactive({
  teacherList: [] as Teacher[],
  teacherInfo: {} as Teacher,
  keyWord: "",
});
const pagination = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});
// const keyWord = ref("");
function handleCurrentChange(e: any) {
  console.log(e);
  pagination.currentPage = e;
  getTeacherList();
}
function handleSizeChange(e: any) {
  console.log(e);
  pagination.pageSize = e;
  pagination.currentPage = 1;
  getTeacherList();
}
function getTeacherList(): void {
  console.log(proxy.$API.default);

  proxy.$API.default.teacher.getTeacherList(pagination).then((res: any) => {
    console.log(res.data);
    const { code, msg, data } = res.data;
    if (code == "0") {
      state.teacherList = data.teachers;
      pagination.total = data.totalItems;
      dialogVisible.value = false;
    }
  });
}
function deleteTeacher(row: Teacher): void {
  console.log(row);
  proxy.$API.default.teacher.deleteTeacherItem(row.id).then((res: any) => {
    console.log(res);
    const { code, msg, data } = res.data;
    if (code == "0") {
      getTeacherList();
    }
  });
}
function buttonConfirm(): void {
  if (isEdit.value == true) {
    editTeacherItem();
  } else {
    addTeacher();
  }
}
// 编辑课程信息
function editTeacherItem(): void {
  proxy.$API.default.teacher
    .updateCourseItem(state.teacherInfo)
    .then((res: any) => {
      console.log(res);
      const { code, data, msg } = res.data;
      if (code == "0") {
        getTeacherList();
        isEdit.value = false;
      }
    });
}
const addTeacher = (): void => {
  console.log(state.teacherInfo);

  proxy.$API.default.teacher
    .addTeacherItem(state.teacherInfo)
    .then((res: any) => {
      console.log(res);
      const { code, data, msg } = res.data;
      if (code == "0") {
        getTeacherList();
      }
    });
};
function toAddTeacher() {
  isEdit.value = false;
  state.teacherInfo.email = "";
  state.teacherInfo.phone = "";
  state.teacherInfo.teacherName = "";
  state.teacherInfo.introduce = "";
  console.log(state.teacherInfo);

  dialogVisible.value = true;
}
function toEditTeacher(teacherInfo: Teacher) {
  console.log(teacherInfo);
  isEdit.value = true;
  Object.assign(state.teacherInfo, teacherInfo);
  console.log(state.teacherInfo);
  dialogVisible.value = true;
}

function dateFormat(time: string): string {
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
  getTeacherList();
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