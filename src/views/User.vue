<template>
  <div class="course-list">
    <div class="bread-crumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home/courseList">用户</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="top-info">
      <div class="operation">
        <el-button type="default" icon="Plus" @click="toAddUser"
          >添加用户</el-button
        >
        <!-- <el-button type="default" icon="DeleteFilled">批量删除</el-button> -->
      </div>
      <div class="search">
        <el-button
          type="primary"
          icon="Search"
          style="margin-right: 10px"
          @click="searchByUserName"
          >搜索</el-button
        >
        <el-input
          v-model="state.keyWord"
          placeholder="请输入用户姓名"
          @keyup.enter="searchByUserName"
        />
      </div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTableRef"
        :data="state.userList"
        v-loading="state.tableLoading"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" header-align="center" />
        <el-table-column
          label="用户封面"
          align="center"
          width="150"
          header-align="center"
        >
          <template #default="props">
            <img
              :src="
                props.row.avatarUrl == null ? emptyImg : props.row.avatarUrl
              "
              style="width: 120px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          property="email"
          label="用户邮箱"
          width="150"
          header-align="center"
          align="center"
        />
        <el-table-column label="用户性别" header-align="center" align="center">
          <template v-slot="props">
            <span>{{ state.sexMap[props.row.gender] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          property="nickName"
          label="用户昵称"
          header-align="center"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          property="phone"
          label="用户电话"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          width="350"
        >
          <template #default="props">
            <!-- <el-button
                type="default"
                size="default"
                icon="Operation"
                @click="gotoChapter(props.row.id)"
                >章节</el-button
              > -->
            <!-- <el-button
                type="default"
                size="large"
                icon="FolderOpened"
              ></el-button> -->
            <el-button
              type="default"
              size="default"
              icon="EditPen"
              @click="toEditUser(props.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="你确定要删除该用户吗？"
              @confirm="deleteUser(props.row)"
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
    <el-dialog
      v-model="dialogVisible"
      title="课程信息"
      width="30%"
      :lock-scroll="false"
    >
      <el-form
        label-width="100px"
        :model="state.userInfo"
        style="max-width: 460px"
      >
        <el-form-item label="用户封面：">
          <el-upload
            class="avatar-uploader"
            action="/api/common/uploadImage"
            :show-file-list="false"
            :on-success="handleFaceImgSuccess"
            :before-upload="beforeFaceImgUpload"
          >
            <img
              v-if="state.userInfo.avatarUrl !== null"
              :src="state.userInfo.avatarUrl"
              class="avatar"
              style="width: 200px; height: 200px"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名称：" required>
          <el-input
            v-model="state.userInfo.nickName"
            placeholder="填写用户名称"
          />
        </el-form-item>
        <el-form-item label="用户性别：" required>
          <el-radio-group v-model="state.userInfo.gender" class="ml-4">
            <el-radio :label="0" size="large">男</el-radio>
            <el-radio :label="1" size="large">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属班级" required>
          <el-select
            v-model="state.userInfo.grades"
            multiple
            placeholder="选择班级"
            :loading="state.classesLoading"
            loading-text="加载中..."
            @visible-change="getClassesIdName"
          >
            <el-option
              v-for="item in state.classesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="电话：" required>
          <el-input v-model="state.userInfo.phone" placeholder="电话" />
        </el-form-item>
        <el-form-item label="用户邮箱" required>
          <el-input v-model="state.userInfo.email" placeholder="用户邮箱" />
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
import { ElMessage } from "element-plus";
import { User } from "./types/User/index";
import { Classes } from "./types/Classes/index";
// 默认空图片
const emptyImg = require("@/assets/empty.png");
// 弹出框显示隐藏
let dialogVisible = ref(false);
// 是否编辑状态
let isEdit = ref(false);
const { proxy } = getCurrentInstance() as any;
const sexMap = {
  0: "男",
  1: "女",
};
const state = reactive({
  userList: [] as User[],
  userInfo: {} as User,
  sexMap,
  classesList: [] as Classes[],
  // teacherList: [] as Teacher[],
  // courseTypeList: [] as Course[],
  keyWord: "",
  tableLoading: false,
  courseTypeLoading: false,
  classesLoading: false,
});
const pagination = reactive({
  currentPage: 1,
  pageSize: 5,
  total: 0,
});

// 页面加载获取课程列表
onMounted(() => {
  getUserList();
});

const getClassesIdName = async () => {
  console.log("获取班级信息");
  state.classesLoading = true;
  proxy.$API.default.classes.reqGetClassList(pagination).then((res: any) => {
    console.log(res.data);
    const { code, msg, data } = res.data;
    if (code == "0") {
      state.classesList = data.grades;
      state.classesLoading = false;
    }
  });
};

// 添加用户
const addUser = (): void => {
  console.log(state.userInfo);

  proxy.$API.default.user.reqAddUser(state.userInfo).then((res: any) => {
    console.log(res);
    if (res.status == 200) {
      getUserList();
    }
  });
};
// 删除用户
function deleteUser(row: User): void {
  console.log(row);
  proxy.$API.default.user.reqDeleteUser(row.id).then((res: any) => {
    console.log(res);
    getUserList();
  });
}
// 编辑课程信息
function editUserItem(): void {
  proxy.$API.default.user.reqUpdateUser(state.userInfo).then((res: any) => {
    console.log(res);
    if (res.data.code == "0") {
      getUserList();
      isEdit.value = false;
      dialogVisible.value = false;
    }
  });
}
// 获取用户列表
function getUserList(): void {
  state.tableLoading = true;
  proxy.$API.default.user.reqGetUserList(pagination).then(
    (res: any) => {
      console.log(res.data);
      state.userList = res.data.data.users;
      pagination.total = res.data.data.totalItems;
      state.tableLoading = false;
      dialogVisible.value = false;
    },
    (err: any) => {
      console.log(err);
      state.tableLoading = false;
      ElMessage.error(err.message);
    }
  );
}

// 点击添加用户按钮
function toAddUser() {
  isEdit.value = false;
  state.userInfo.avatarUrl = null;
  state.userInfo.nickName = null;
  state.userInfo.gender = null;
  state.userInfo.phone = null;
  state.userInfo.email = null;
  state.userInfo.grades = [];
  console.log(state.userInfo);

  dialogVisible.value = true;
}
// 点击编辑课程按钮
const toEditUser =  async (courseItem: any) => {
  await getClassesIdName();
  console.log(courseItem);
  isEdit.value = true;
  Object.assign(state.userInfo, courseItem);
  state.userInfo.grades = courseItem.grades!.map(item => item.id)
  // state.userInfo.teacher.id = courseItem.teacher.teacherName;
  // state.userInfo.type.id = courseItem.type.name;
  console.log(state.userInfo);
  dialogVisible.value = true;
}
// 弹出框确定按钮
function buttonConfirm(): void {
  const obj = state.userInfo;
  console.log(obj);

  if (
    obj.nickName == null ||
    obj.phone == null ||
    obj.email == null ||
    obj.gender == null ||
    obj.grades?.length == 0
  ) {
    ElMessage({
      message: "必填项不能为空",
      type: "warning",
    });
    return;
  }
  if (isEdit.value == true) {
    editUserItem();
  } else {
    addUser();
  }
}

// 课程封面上传成功回调
const handleFaceImgSuccess = (response: any, uploadFile: any) => {
  console.log(response);
  console.log(uploadFile);
  const { code, msg, data } = response;
  if (code == "0") {
    state.userInfo.avatarUrl = data;
  }
};
// 课程封面图片大小限定
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
//
const searchByUserName = (keyWord: any) => {
  state.tableLoading = true;

  proxy.$API.default.user
    .reqGetUserListByKeyWord(pagination, state.keyWord)
    .then(
      (res: any) => {
        console.log(res.data);
        state.userList = res.data.data.users;
        pagination.total = res.data.data.totalItems;
        dialogVisible.value = false;
        state.tableLoading = false;
      },
      (err: any) => {
        console.log(err);
        ElMessage.error(err.message);
        state.tableLoading = false;
      }
    );
};
// 进入章节管理
function gotoChapter(courseId: any) {
  router.push("/chapterList?courseId=" + courseId);
}
// 改变页数
function handleCurrentChange(e: any) {
  console.log(e);
  pagination.currentPage = e;
  getUserList();
}
// 改变页大小
function handleSizeChange(e: any) {
  console.log(e);
  pagination.pageSize = e;
  pagination.currentPage = 1;
  getUserList();
}
// 时间戳格式化(未启用)
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
</script>
  
  
  <style lang="scss" scoped>
.course-list {
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