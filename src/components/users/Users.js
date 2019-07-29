import axios from 'axios'
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
      input3: ''
    }
  },
  created () {
    // 默认请求 : 查询全部的第一页
    this.getUsersData()
  },
  // 方法
  methods: {
    // 加载用户数据列表
    getUsersData (pagenum = 1, query = '') {
      // axios.get(url,config) => params : {} , headers : {}
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum, // 当前页
            pagesize: 2 // 每一页显示2个
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)

          // 保存用户列表数据
          this.usersData = res.data.data.users
          // 保存总个数
          this.total = res.data.data.total
          // 保存当前页
          this.pagenum = res.data.data.pagenum
        })
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
    }
  }
}
