<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <el-table :data="menuData" ref="itemTable" border style="width: 100%;">
                <el-table-column prop="name" label="名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.grade == 1"
                              style="color: dodgerblue">{{ scope.row.name }}</span>
                        <span v-if="scope.row.grade == 2" style="color: cadetblue">&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.name }}</span>
                        <span v-if="scope.row.grade == 3" style="color: lightskyblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型">
                    <template slot-scope="scope">{{ scope.row.type ===1 ? '菜单' : '按钮' }}</template>
                </el-table-column>
                <el-table-column prop="permission" label="权限key">
                </el-table-column>
                <el-table-column prop="url" label="URL">
                </el-table-column>
                <el-table-column prop="icon" label="ICON">
                </el-table-column>
                <el-table-column prop="orders" label="排序">
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template v-if="menuData.length > 0" slot-scope="scope">
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
        <el-dialog title="增加后台菜单" :visible.sync="isShowMenu" :before-close="back" width="500px" center>
            <div class="form-content">
                <el-form ref="addMenuForm" :model="addMenuForm" label-width="100px">
                    <el-form-item label="菜单名：">
                        <el-input v-model.trim="addMenuForm.name" placeholder="如：首页"></el-input>
                    </el-form-item>
                    <el-form-item label="ICON：">
                        <el-input v-model.trim="addMenuForm.icon" placeholder="如：el-icon-setting"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-select v-model.trim="addMenuForm.type" placeholder="类型">
                            <el-option
                                v-for="item in typeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限key：">
                        <el-input v-model.trim="addMenuForm.permission" placeholder="如common:index"></el-input>
                    </el-form-item>
                    <el-form-item label="链接：">
                        <el-input type="tel" v-model.trim="addMenuForm.url" placeholder="如common:index"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点：">
                        <el-select v-model.trim="addMenuForm.parentId" placeholder="请选择">
                            <el-option
                                v-for="item in menuList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                <span v-if="item.grade == 0"
                                      style="float: left;color: blue;">{{ item.name }}</span>
                                <span v-if="item.grade == 1"
                                      style="float: left;color: dodgerblue;">&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 2"
                                      style="float: left;color: cadetblue;">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 3"
                                      style="float: left;color: lightskyblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序：">
                        <el-input v-model.trim="addMenuForm.orders"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">添加</el-button>
                <el-button @click="back">取消</el-button>
            </span>
        </el-dialog>
        <!--编辑后台菜单-->
        <el-dialog title="编辑后台菜单" :visible.sync="isShowEditMenu" :before-close="cancel" width="500px" center>
            <div class="form-content">
                <el-form ref="editMenuForm" :model="editMenuForm" label-width="100px">
                    <el-form-item label="菜单名：">
                        <el-input v-model.trim="editMenuForm.name" placeholder="如：首页"></el-input>
                    </el-form-item>
                    <el-form-item label="ICON：">
                        <el-input v-model.trim="editMenuForm.icon" placeholder="如：el-icon-setting"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-select v-model.trim="editMenuForm.type" placeholder="类型">
                            <el-option
                                v-for="item in typeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限key：">
                        <el-input v-model.trim="editMenuForm.permission" placeholder="如common:index"></el-input>
                    </el-form-item>
                    <el-form-item label="链接：">
                        <el-input type="tel" v-model.trim="editMenuForm.url" placeholder="如common:index"></el-input>
                    </el-form-item>
                    <el-form-item label="父节点：">
                        <el-select v-model.trim="editMenuForm.parentId" placeholder="请选择">
                            <el-option
                                v-for="item in menuList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                <span v-if="item.grade == 0"
                                      style="float: left;color: blue;">{{ item.name }}</span>
                                <span v-if="item.grade == 1"
                                      style="float: left;color: dodgerblue;">&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 2"
                                      style="float: left;color: cadetblue;">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                                <span v-if="item.grade == 3"
                                      style="float: left;color: lightskyblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.name }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序：">
                        <el-input v-model.trim="editMenuForm.orders"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="update">更新</el-button>
                <el-button @click="cancel">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isShowMenu: false,
                isShowEditMenu: false,
                menuData: [
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
                addMenuForm: {
                    name: '',
                    icon: '',
                    type: '',
                    permission: '',
                    url: '',
                    parentId: '',
                    sort: ''
                },
                typeList: [
                    {
                        name: '菜单',
                        type: 1
                    }, {

                        name: '按钮',
                        type: 2
                    },

                ],
                editMenuForm: {
                    id: "",
                    name: "",
                    icon: "",
                    permission: "",
                    url: "",
                    parentId: "",
                    type: "",
                    orders: ""
                },
                menuList: []
            }
        },
        methods: {
            getMenuData() {
                let vm = this;
                this.$httpGet('/admin/permission/index', {}).then(({data}) => {
                    vm.menuData = data;
                }).catch((data) => {
                    console.log(data)
                })
            },
            getMenuList() {
                let vm = this;
                this.$httpGet('/admin/permission/getSuperPermissionList', {}).then(({data}) => {
                    vm.menuList = data;
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleEdit(row) {
                let vm = this;
                this.isShowEditMenu = true;
                /*this.$httpGet('/admin/permission/edit', {
                    id: row.id
                }).then(({data}) => {
                    vm.editMenuForm = data;
                }).catch((data) => {
                    console.log(data)
                })*/
                vm.editMenuForm.id = row.id;
                vm.editMenuForm.name = row.name;
                vm.editMenuForm.icon = row.icon;
                vm.editMenuForm.permission = row.permission;
                vm.editMenuForm.url = row.url;
                vm.editMenuForm.parentId = row.parentId;
                vm.editMenuForm.type = row.type;
                vm.editMenuForm.orders = row.orders;
            },
            cancel() {
                this.isShowEditMenu = false;
            },
            update() {
                let vm = this;
                if (!this.editMenuForm.name) {
                    this.$message.warning('菜单名不能为空！');
                    return false;
                }
                if (!this.editMenuForm.permission) {
                    this.$message.warning('权限key不能为空！');
                    return false;
                }
                this.$httpPost('/admin/permission/update', {
                    id: this.editMenuForm.id,
                    icon: this.editMenuForm.icon,
                    name: this.editMenuForm.name,
                    permission: this.editMenuForm.permission,
                    url: this.editMenuForm.url,
                    parentId: this.editMenuForm.parentId,
                    type: this.editMenuForm.type,
                    orders: this.editMenuForm.orders
                }).then(({data}) => {
                    vm.$message.success(data);
                    vm.isShowEditMenu = false;
                    vm.getMenuData();
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleDelete(row) {
                let vm = this;
                this.$confirm('确认删除吗?', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$httpGet('/admin/permission/delete', {
                        id: row.id
                    }).then(({data}) => {
                        vm.$message.success(data);
                        this.getMenuData();
                    }).catch((data) => {
                        console.log(data)
                    })
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            add() {
                this.isShowMenu = true;
            },
            submit() {
                let vm = this;
                if (!this.addMenuForm.name) {
                    this.$message.warning('菜单名不能为空！');
                    return false;
                }
                if (!this.addMenuForm.permission) {
                    this.$message.warning('权限key不能为空！');
                    return false;
                }
                this.$httpPost('/admin/permission/save', {
                    name: this.addMenuForm.name,
                    icon: this.addMenuForm.icon,
                    permission: this.addMenuForm.permission,
                    url: this.addMenuForm.url,
                    parentId: this.addMenuForm.parentId,
                    type: this.addMenuForm.type,
                    orders: this.addMenuForm.orders
                }).then(({data}) => {
                    vm.$message.success(data);
                    vm.isShowMenu = false;
                    this.getMenuData();
                    for (let key in this.addMenuForm) {
                        delete this.addMenuForm[key];
                    }
                }).catch((data) => {
                    console.log(data)
                })
            },
            back() {
                this.isShowMenu = false;
                for (let key in this.addMenuForm) {
                    delete this.addMenuForm[key];
                }
            }
        },
        mounted() {
            this.getMenuData();
            this.getMenuList();
        }
    }

</script>

<style scoped>

</style>
