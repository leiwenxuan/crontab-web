<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>定时任务</el-breadcrumb-item>
      <el-breadcrumb-item>定时任务列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getcrontabList">
            <el-button slot="append" icon="el-icon-search" @click="getcrontabList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加定时任务</el-button>
        </el-col>
      </el-row>

      <!-- 定时任务列表区域 -->
      <el-table :data="crontabList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="任务名称" prop="name"></el-table-column>
        <el-table-column label="shell命令" prop="command"></el-table-column>
        <el-table-column label="cron表达式" prop="cronExpr"></el-table-column>
        <el-table-column label="操作" width="240px">

          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="modifyjob(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeJobByname(scope.row.name)"></el-button>
            <!-- kill 任务 -->
            <el-button type="primary"  size="mini" @click="killJobByname(scope.row.name)">kill</el-button>
            <!-- 查看日志 -->
            <el-button type="primary" icon="el-icon-view" size="mini" @click="showjoblog(scope.row.name)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加任务 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm"  label-width="70px">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="任务命令" prop="command">
          <el-input v-model="addForm.command"></el-input>
        </el-form-item>
        <el-form-item label="任务时间" prop="cronExpr">
          <el-input v-model="addForm.cronExpr"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addJob">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改定时任务的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm"  label-width="70px">
        <el-form-item label="任务名称">
          <el-input v-model="editForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务命令" prop="command">
          <el-input v-model="editForm.command"></el-input>
        </el-form-item>
        <el-form-item label="任务时间" prop="cronExpr">
          <el-input v-model="editForm.cronExpr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editJob">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import { getJobList, getJobSave, getJobDelete, getJobKill } from '@/api/job'

export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 30
      },
      crontabList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        name: '',
        command: '',
        cronExpr: ''
      },
      editForm: {
        name: '',
        command: '',
        cronExpr: ''
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false
    }
  },
  created() {
    this.getcrontabList()
  },
  methods: {
    // 获取job  list
    getcrontabList() {
      getJobList().then(response => {
        this.crontabList = response.data.data
        console.log(this.crontabList)
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getcrontabList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getcrontabList()
    },

    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加任务
    addJob() {
      console.log('submit!')
      console.log(this.addForm)
      getJobSave(this.addForm).then(response => {
        console.log(this.crontabList)
        this.addDialogVisible = false
        // this.$router.push('/')
        location.reload()
      })
    },
    // 修改任务
    editJob() {
      console.log('submit!')
      console.log(this.editForm)
      getJobSave(this.editForm).then(response => {
        console.log(this.crontabList)
        this.addDialogVisible = false
        // this.$router.push('/')
        location.reload()
      })
    },
    // 删除任务
    removeJobByname(val) {
      var params = {
        name: val
      }
      getJobDelete(params).then(response => {
        this.testList = response.data
        console.log(this.testList)
        this.listLoading = false
        location.reload()
      })
    },
    // 修改任务
    modifyjob(val) {
      this.editDialogVisible = true
      this.editForm = val

      // getJobSave(this.addForm).then(response => {
      //   console.log(this.testList)
      //   this.listLoading = false
      //   this.addDialogVisible = false
      //   // this.$router.push('/')
      //   location.reload()
      // })
    },
    // kill 任务
    killJobByname(val) {
      var params = {
        name: val
      }
      getJobKill(params).then(response => {
        this.testList = response.data
        console.log(this.testList)
        this.listLoading = false
      })
    },
    // 查看日志
    showjoblog(val) {
      console.log('查看日志:  ' + val)
      this.$router.push({
        path: '/logList',
        query: {
          name: val
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
