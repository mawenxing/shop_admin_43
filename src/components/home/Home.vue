
<template>
  <!-- 布局容器 -->
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span='8'>
          <img
            src="../../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span='8'>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span='8'
          class="col3"
        >
          恭喜上海前端43期月薪20万 <a
            @click.prevent='logout'
            href="#"
          >退出</a>
        </el-col>
      </el-row>

    </el-header>
    <!-- 容器  -->
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="200px">
        <!--
          菜单导航
          el-menu : 菜单组件
            -  default-active="2" 默认高亮 取值依据:index
            -  @open="handleOpen"  开
            -  @close="handleClose" 关
            - background-color="#545c64"  背景色
            - text-color="#fff"   文字颜色
            - active-text-color="#ffd04b"  高亮颜色

          el-submenu : 子菜单 (可展开)

          el-menu-item 菜单元素 (最小单位)
         -->
        <el-menu
          :router='true'
          :default-active="handleUrlPath()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!-- 标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 选项 -->
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 选项 -->
            <el-menu-item index="/roles">角色列表</el-menu-item>
            <el-menu-item index="/rights">权限列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <!-- 留一个出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
/* eslint-disable */
export default {
  methods: {
    logout () {

      this.$confirm('此操作将退出账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定 => 走then
        // console.log('点击确定 =>  then');

        //0. 删除本地的token
        localStorage.removeItem('token')

        //1. 提示
        this.$message({
          message: '退出成功',
          type: 'success',
          duration: 800
        })

        //2. 返回
        this.$router.push('/login')


      }).catch(() => {
        // 点击的取消 => 走catch
        console.log('点击取消 => catch');
        this.$message({
          message: '取消退出',
          type: 'info',
          duration: 800
        })


      });

    },
    // 开
    handleOpen () {
      console.log('开了');

    },

    // 关
    handleClose () {
      console.log('关了');

    },
    // 处理url哈希值路径的方法
    handleUrlPath () {
      // 想怎么处理就怎么处理
      return this.$route.path
    }
  },
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
}

.el-header {
  background: #b3c1cd;
  padding: 0;
  h1 {
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 26px;
  }
  .col3 {
    line-height: 60px;
    text-align: right;
    padding-right: 30px;
    a {
      color: #daa520;
    }
  }
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
</style>
