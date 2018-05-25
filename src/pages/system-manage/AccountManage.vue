<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <!--<el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>-->
                <span>用户名</span>
                <el-input v-model="form.username"></el-input>
                <span>状态</span>
                <el-select v-model="form.status" placeholder="请选择状态">
                    <el-option label="申请中" value="0"></el-option>
                    <el-option label="开放中" value="1"></el-option>
                    <el-option label="冻结中" value="2"></el-option>
                </el-select>
                <span>角色</span>
                <el-select v-model="form.role" placeholder="请选择角色">
                    <el-option label="管理员" value="1"></el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="accountData" border style="width: 100%" @selection-change="handleSelectionChange">
                <!--<el-table-column type="selection" width="55"></el-table-column>-->
                <el-table-column prop="id" label="ID" sortable>
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column prop="roleName" label="角色">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码">
                </el-table-column>
                <el-table-column prop="loginDate" label="最后登录时间" sortable>
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="statusFormatter">
                </el-table-column>
                <el-table-column prop="lockedOrNo" label="是否被锁" :formatter="lockedOrNoFormatter">
                </el-table-column>
                <el-table-column label="操作" width="250px">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
                        <el-button @click="handleClick(scope.row)" type="primary" size="small">修改密码</el-button>
                        <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total='totalPage'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                accountData: [],
                form: {
                    username: '',
                    status: '',
                    role: ''
                },
                cur_page: 1,
                totalPage: '',
                multipleSelection: [],
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleClick(row) {
                console.log(row);
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                this.$httpGet('/admin/admin/index', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    userName: '',
                    status: '',
                    roleId: ''
                }).then(({data}) => {
                    this.accountData = data.page.list;
                    this.totalPage = Number(data.totalPages);
                })
            },
            statusFormatter(row, column) {
                let status = row.status;
                switch (status) {
                    case 0:
                        return '申请中';
                        break;
                    case 1:
                        return '开放中';
                        break;
                    case 2:
                        return '冻结中';
                        break;
                }
            },
            lockedOrNoFormatter(row, column) {
                let lockedOrNo = row.lockedOrNo;
                if (lockedOrNo) {
                    return '被锁';
                } else {
                    return '未被锁';
                }
            },
            loginDateFormatter(row, column) {
                let loginDate = row.loginDate;
                return moment("12-25-1995", "MM-DD-YYYY");
            },
            search() {
                this.$httpGet('/admin/admin/index', {
                    pageNo: 1,
                    pageSize: 10,
                    userName: this.form.username,
                    status: this.form.status,
                    roleId: this.form.role
                }).then(({data}) => {
                    console.log(data);
                    this.accountData = data.page.list;
                    this.total = Number(data.totalPages);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },
        created() {
            this.getData();
        },
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .el-input {
        width: 200px;
    }
</style>
