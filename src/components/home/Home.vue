
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
      <el-aside width="200px">Aside</el-aside>
      <!-- 主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>

</template>

<script>
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
