<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="primary" size="medium" icon="el-icon-view" @click="handleDetail">iconFont</el-button>
            </div>
            <el-table :data="getDataList" ref="itemTable" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="name" label="名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.grade == 1" style="color: dodgerblue">{{ scope.row.name }}</span>
                        <span v-if="scope.row.grade == 2" style="color: cadetblue">&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.name }}</span>
                        <span v-if="scope.row.grade == 3" style="color: lightskyblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label="类型">
                    <template slot-scope="scope">{{ scope.row.type ===1 ? '菜单' : '按钮' }}</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="permission" label="权限key">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="url" label="URL">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="icon" label="ICON">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="orders" label="排序">
                </el-table-column>
                <el-table-column label="操作" width="200px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
                        </el-button>
                        <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--增加后台菜单-->
        <el-dialog title="增加后台菜单" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="100px">
                    <el-form-item label="菜单名：">
                        <el-input clearable v-model.trim="addDataForm.name" maxlength="10" placeholder="只能是10位以内英文或汉字"></el-input>
                    </el-form-item>
                    <el-form-item label="ICON：">
                        <el-input clearable v-model.trim="addDataForm.icon" placeholder="如：el-icon-setting"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-select clearable v-model.trim="addDataForm.type" placeholder="类型">
                            <el-option v-for="item in typeList" :key="item.type" :label="item.name" :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限key：">
                        <el-input clearable v-model.trim="addDataForm.permission" placeholder="如common:index"></el-input>
                    </el-form-item>
                    <el-form-item label="URL：">
                        <el-input clearable type="tel" v-model.trim="addDataForm.url" placeholder="如:index"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点：">
                        <el-select clearable v-model.trim="addDataForm.parentId" placeholder="请选择">
                            <el-option v-for="item in menuList" :key="item.id" :label="item.name" :value="item.id">
                                <span v-if="item.grade == 0" style="float: left;color: blue;">{{ item.name }}</span>
                                <span v-if="item.grade == 1" style="float: left;color: dodgerblue;">&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 2" style="float: left;color: cadetblue;">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 3" style="float: left;color: lightskyblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序：">
                        <el-input type="number" v-model.trim="addDataForm.orders" placeholder="必须为正整数"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">添加</el-button>
                <el-button @click="cancelAdd">取消</el-button>
            </span>
        </el-dialog>
        <!--编辑后台菜单-->
        <el-dialog title="编辑后台菜单" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="100px">

                    <el-form-item label="菜单名：">
                        <el-input clearable v-model.trim="editDataForm.name" maxlength="10" placeholder="只能是10位以内英文或汉字"></el-input>
                    </el-form-item>
                    <el-form-item label="ICON：">
                        <el-input clearable v-model.trim="editDataForm.icon" placeholder="如：el-icon-setting"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-select clearable v-model.trim="editDataForm.type" placeholder="类型">
                            <el-option v-for="item in typeList" :key="item.type" :label="item.name" :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限key：">
                        <el-input clearable v-model.trim="editDataForm.permission" placeholder="如common:index"></el-input>
                    </el-form-item>
                    <el-form-item label="URL：">
                        <el-input clearable type="tel" v-model.trim="editDataForm.url" placeholder="如:index"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点：">
                        <el-select clearable v-model.trim="editDataForm.parentId" placeholder="请选择">
                            <el-option v-for="item in menuList" :key="item.id" :label="item.name" :value="item.id">
                                <span v-if="item.grade == 0" style="float: left;color: blue;">{{ item.name }}</span>
                                <span v-if="item.grade == 1" style="float: left;color: dodgerblue;">&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 2" style="float: left;color: cadetblue;">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 3" style="float: left;color: lightskyblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序：">
                        <el-input type="number" v-model.trim="editDataForm.orders" placeholder="必须为正整数"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitEdit">更新</el-button>
                <el-button @click="cancelEdit">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShowAdd: false,
            isShowEdit: false,
            getDataList: [
                /*{
                        grade: "",
                        id: "",
                        list: "",
                        name: "",
                        orders: "",
                        parentId: "",
                        permission: "",
                        rid: "",
                        type: "",
                        url: ""
                    }*/
            ],
            addDataForm: {},
            typeList: [
                {
                    name: '菜单',
                    type: 1
                },
                {
                    name: '按钮',
                    type: 2
                }
            ],
            editDataForm: {
                id: '',
                name: '',
                icon: '',
                permission: '',
                url: '',
                parentId: '',
                type: '',
                orders: ''
            },
            menuList: []
        }
    },
    methods: {
        handleDetail() {
            const { href } = this.$router.resolve({
                name: 'icon-font'
            })
            window.open(href, '_blank')
        },
        // 菜单列表,同步需要
        getMenuData() {
            return this.$httpGet('/admin/permission/index', {})
        },
        // 菜单列表,不需要同步
        getMenuDataList() {
            this.$httpGet('/admin/permission/index', {})
                .then(({ data }) => {
                    vm.getDataList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 增加的下拉菜单，不需要同步
        getMenu() {
            let vm = this
            this.$httpGet('/admin/permission/getSuperPermissionList', {})
                .then(({ data }) => {
                    vm.menuList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 增加的下拉菜单，同步需要
        getMenuList() {
            return this.$httpGet('/admin/permission/getSuperPermissionList', {})
        },
        handleEdit(row) {
            this.isShowEdit = true
            this.editDataForm.id = row.id
            this.editDataForm.name = row.name
            this.editDataForm.icon = row.icon
            this.editDataForm.permission = row.permission
            this.editDataForm.url = row.url
            this.editDataForm.parentId = row.parentId
            this.editDataForm.type = row.type
            this.editDataForm.orders = row.orders
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (!this.editDataForm.name) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '菜单名不能为空！'
                })
                return false
            }
            if (
                !/^[\u4e00-\u9fa5]{1,10}$/.test(vm.editDataForm.name) &&
                !/^[A-Za-z]{1,10}$/.test(vm.editDataForm.name)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '菜单名只能是10位以内英文或汉字！'
                })
                return false
            }
            if (!this.editDataForm.type) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '类型不能为空！'
                })
                return false
            }
            if (!this.editDataForm.permission) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '权限key不能为空！'
                })
                return false
            }
            if (!this.editDataForm.url) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: 'URL不能为空！'
                })
                return false
            }
            if (!this.editDataForm.parentId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '父节点不能为空！'
                })
                return false
            }
            if (!this.editDataForm.orders) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '排序不能为空！'
                })
                return false
            }
            if (!/^[1-9]\d*$/.test(vm.editDataForm.orders)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '排序数字必须为正整数！'
                })
                return false
            }
            this.$httpPost('/admin/permission/update', {
                id: this.editDataForm.id,
                icon: this.editDataForm.icon,
                name: this.editDataForm.name,
                permission: this.editDataForm.permission,
                url: this.editDataForm.url,
                parentId: this.editDataForm.parentId,
                type: this.editDataForm.type,
                orders: this.editDataForm.orders
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.cancelEdit()
                    vm.getAllData()
                })
                .catch(data => {
                    console.log(data)
                })
        },
        handleDelete(row) {
            let vm = this
            this.$confirm('确认删除吗?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$httpGet('/admin/permission/delete', {
                        id: row.id
                    })
                        .then(data => {
                            vm.$notify.success({
                                duration: 2000,
                                title: '成功',
                                message: data.message
                            })
                            vm.getAllData()
                        })
                        .catch(data => {
                            console.log(data)
                        })
                })
                .catch(() => {
                    vm.$notify.info({
                        duration: 2000,
                        title: '消息',
                        message: '已取消删除'
                    })
                })
        },
        add() {
            this.isShowAdd = true
        },
        submitAdd() {
            let vm = this
            if (!this.addDataForm.name) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '菜单名不能为空！'
                })
                return false
            }
            if (
                !/^[\u4e00-\u9fa5]{1,10}$/.test(vm.addDataForm.name) &&
                !/^[A-Za-z]{1,10}$/.test(vm.addDataForm.name)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '菜单名只能是10位以内英文或汉字！'
                })
                return false
            }
            if (!this.addDataForm.type) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '类型不能为空！'
                })
                return false
            }
            if (!this.addDataForm.permission) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '权限key不能为空！'
                })
                return false
            }
            if (!this.addDataForm.url) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: 'URL不能为空！'
                })
                return false
            }
            if (!this.addDataForm.parentId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '父节点不能为空！'
                })
                return false
            }
            if (!this.addDataForm.orders) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '排序不能为空！'
                })
                return false
            }
            if (!/^[1-9]\d*$/.test(vm.addDataForm.orders)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '排序数字必须为正整数！'
                })
                return false
            }
            this.$httpPost('/admin/permission/save', {
                name: this.addDataForm.name,
                icon: this.addDataForm.icon,
                permission: this.addDataForm.permission,
                url: this.addDataForm.url,
                parentId: this.addDataForm.parentId,
                type: this.addDataForm.type,
                orders: this.addDataForm.orders
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.cancelAdd()
                    vm.getAllData()
                })
                .catch(data => {
                    console.log(data)
                })
        },
        cancelAdd() {
            this.isShowAdd = false
            this.addDataForm = {}
        },
        async getAllData() {
            let vm = this
            await Promise.all([vm.getMenuList(), vm.getMenuData()])
                .then(data => {
                    vm.menuList = data[0].data
                    vm.getDataList = data[1].data
                })
                .catch(data => {
                    console.log(data)
                })
        }
    },
    mounted() {
        this.getAllData()
    }
}
</script>

<style scoped>
</style>
