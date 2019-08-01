// import axios from 'axios'
export default {
  data () {
    return {
      // 用户列表数据
      usersData: [
        {
          username: '小飞飞',
          email: 'feifei@.com',
          mobile: '1233211234567'
        }
      ],
      // 总个数
      total: 0,
      // 当前页
      pagenum: 1,
      // 输入框绑定的数据
      input3: '',
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户表单对象
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单的校验规则
      rules: {
        // 用户名
        username: [
          // 判断填不填
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 3, max: 5, message: '长度应该在 3-5 之间', trigger: 'blur' }
        ],
        // 密码
        password: [
          // 判断填不填
          { required: true, message: '请输入密码', trigger: 'blur' },
          // 判断格式
          { min: 5, max: 10, message: '长度应该在 5-10 之间', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          // 判断格式
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        // 手机
        mobile: [
          // 判断格式
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]
      },
      // 开关状态
      value1: true,
      // 是否显示编辑用户对话框
      dialogEditUserVisible: false,
      // 编辑用户表单对象
      editUserForm: {
        username: '飞哥',
        email: '',
        mobile: '',
        id: 0
      }
    }
  },
  created () {
    // 默认请求 : 查询全部的第一页
    this.getUsersData()
  },
  // 方法
  methods: {
    // 加载用户数据列表
    async getUsersData (pagenum = 1, query = '') {
      let config = {
        params: {
          query,
          pagenum, // 当前页
          pagesize: 2 // 每一页显示2个
        }
      }
      let res = await this.$axios.get('users', config)

      // 保存用户列表数据
      this.usersData = res.data.data.users
      // 保存总个数
      this.total = res.data.data.total
      // 保存当前页
      this.pagenum = res.data.data.pagenum

      // axios.get(url,config) => params : {} , headers : {}
      // this.$axios
      //   .get('users', {
      //     params: {
      //       query,
      //       pagenum, // 当前页
      //       pagesize: 2 // 每一页显示2个
      //     }
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     console.log(res)

      // // 保存用户列表数据
      // this.usersData = res.data.data.users
      // // 保存总个数
      // this.total = res.data.data.total
      // // 保存当前页
      // this.pagenum = res.data.data.pagenum
      //   })
    },
    // 点击分页
    currentPageChange (curPage) {
      console.log('点击分页了', curPage)
      // 以后点击分页,不能像之前那样只传页码了 还要记得传input输入框里面的内容
      this.getUsersData(curPage, this.input3)
    },
    // 输入内容开始搜索
    startSearch () {
      console.log(this.input3) // t

      // 请求数据
      // 查询 : 带t的第一页数据
      this.getUsersData(1, this.input3)
    },
    // 显示对话框
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)

      if (res.data.meta.status === 201) {
        // 1. 隐藏对话框
        this.dialogAddUserVisible = false

        // 2. 提示
        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 800
        })

        // 3. 刷新一下
        this.getUsersData()
      }

      // axios.post(url,data,config) params: headers
      // this.$axios
      //   .post('users', this.addUserForm, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      // if (res.data.meta.status === 201) {
      //   // 1. 隐藏对话框
      //   this.dialogAddUserVisible = false

      //   // 2. 提示
      //   this.$message({
      //     message: '添加用户成功',
      //     type: 'success',
      //     duration: 800
      //   })

      //   // 3. 刷新一下
      //   this.getUsersData()
      // }
      //   })
    },
    // 监听对话框关闭
    dialogClosed () {
      console.log('对话框关闭了')
      this.$refs.addUserRef.resetFields()
    },
    // 删除用户
    async delUser (id) {
      let res = await this.$axios.delete(`users/${id}`)

      if (res.data.meta.status === 200) {
        // 1. 提示
        this.$message({
          message: '删除用户成功',
          type: 'success',
          duration: 800
        })
        // 2. 刷新一下
        this.getUsersData()
      }

      // axios.delete(url,config)
      // this.$axios
      //   .delete(`users/${id}`, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     // console.log(res)
      // if (res.data.meta.status === 200) {
      //   // 1. 提示
      //   this.$message({
      //     message: '删除用户成功',
      //     type: 'success',
      //     duration: 800
      //   })
      //   // 2. 刷新一下
      //   this.getUsersData()
      // }
      //   })
    },
    // 状态改变
    async stateChange (row) {
      // 1. 通过解构的方法 拿到id 和 mg_state
      const { id, mg_state: mgState } = row

      // 2.
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)

      if (res.data.meta.status === 200) {
        // 提示
        this.$message({
          message: '状态修改成功',
          type: 'success',
          duration: 800
        })
      }
      // console.log('状态改变了')
      // axios.put(url,data,config)
      // this.$axios
      //   .put(`users/${id}/state/${mgState}`, null, {
      //     // headers: {
      //     //   Authorization: localStorage.getItem('token')
      //     // }
      //   })
      //   .then(res => {
      //     // console.log(res)
      // if (res.data.meta.status === 200) {
      //   // 提示
      //   this.$message({
      //     message: '状态修改成功',
      //     type: 'success',
      //     duration: 800
      //   })
      // }
      //   })
    },
    // 展示编辑用户对话框
    showEditUserDialog (row) {
      // 显示 对话框
      this.dialogEditUserVisible = true

      // 接收到了点击编辑按钮传过来的当前 行对象 row
      // 把 row 里面的数据赋值给 editUserForm <==> 表单
      const { username, email, mobile, id } = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id
    },
    // 开始编辑用户
    editUser () {
      // 1. 从 editUserForm 里 获取需要的参数
      const { email, mobile, id } = this.editUserForm

      // axios.put(url,data,config)
      this.$axios
        .put(`users/${id}`, {
          email,
          mobile
        })
        .then(res => {
          if (res.data.meta.status === 200) {
            // 1. 关闭对话框
            this.dialogEditUserVisible = false

            // 3. 提示
            this.$message({
              message: '编辑用户成功',
              type: 'success',
              duration: 800
            })

            // 2. 刷新
            this.getUsersData(this.pagenum, this.input3)
          }
        })
    }
  }
}
