<template>
    <div class="table">
        <div class="container">
            <el-table :data="permissionsData" ref="itemTable" border style="width: 100%;"
                      @selection-change="handleSelectionAllChange" @select="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="菜单">
                    <template slot-scope="scope">
                        <span v-if="scope.row.grade == 1"
                              style="color: dodgerblue">{{ scope.row.name }}</span>
                        <span v-if="scope.row.grade == 2" style="color: cadetblue">&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.name }}</span>
                        <span v-if="scope.row.grade == 3" style="color: lightskyblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="permission" label="权限key">
                </el-table-column>
                <el-table-column prop="url" label="URL">
                </el-table-column>
                <el-table-column prop="icon" label="ICON">
                </el-table-column>
            </el-table>
            <el-row style="margin: 50px auto">
                <el-button @click="submit" size="medium" type="success">提交</el-button>
                <el-button @click="back" size="medium" type="primary">返回</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {goBack} from '../../../functions/index'

    export default {
        data() {
            return {
                permissionsData: [
                    {
                        "grade": '',
                        "id": '',
                        "list": '',
                        "name": '',
                        "orders": '',
                        "parentId": '',
                        "permission": '',
                        "rid": '',
                        "type": '',
                        "url": ''
                    }
                ],
                pids: []
            }
        },
        methods: {
            back() {
                goBack();
            },
            submit() {
                this.$httpPost('/admin/role/assignUpdate', {
                    id: this.$route.params.id,
                    pids: this.pids.join(',')
                }).then(({data}) => {
                    this.$message.success(data);
                    this.getMenuList();
                    goBack();
                }).catch((data) => {
                    console.log(data)
                })
            },
            // 获取菜单列表
            getMenuList() {
                let vm = this;
                this.$httpGet('/admin/admin/getPermissionList', {
                    id: JSON.parse(window.localStorage.getItem("user")).id
                }).then(({data}) => {
                    vm.$store.dispatch('setNavigationMenu', JSON.stringify(data[0].subs));
                }).catch((data) => {
                    console.log(data);
                })
            },
            // 单选
            handleSelectionChange(val, row) {
                this.pids = [];
                let arrary = [];
                // for (let values of this.permissionsData) {
                //     arrary.push(values.name);
                // }
                // if (arrary.includes(row.name)) {
                if (row.grade == 1) {
                    for (var i = row.index; i < this.permissionsData.length; i++) {
                        if (i + 1 < this.permissionsData.length) {
                            if (this.permissionsData[i + 1].grade >= 2) {
                                this.$refs.itemTable.toggleRowSelection(this.permissionsData[i + 1]);
                            } else {
                                break;
                            }
                        }

                    }
                } else if (row.grade == 2) {
                    for (var i = row.index; i < this.permissionsData.length; i++) {
                        if (i + 1 < this.permissionsData.length) {
                            if (this.permissionsData[i + 1].grade >= 3) {
                                this.$refs.itemTable.toggleRowSelection(this.permissionsData[i + 1]);
                            } else {
                                break;
                            }
                        }
                    }
                }
                for (let values of val) {
                    if (values) {
                        this.pids.push(values.id);
                    }
                }
            },
            // 多选
            handleSelectionAllChange(val) {
                /*for (let values of val) {
                    if (values) {
                        this.pids.push(values.id);
                    }
                }
                console.log(val);
                console.log(this.pids);*/
            },
            getPermissionsData() {
                let vm = this;
                this.$httpGet('/admin/role/assign', {
                    id: this.$route.params.id
                }).then(({data}) => {
                    let i = 0;
                    for (let values of data) {
                        values['index'] = i++;
                    }
                    vm.permissionsData = data;
                    vm.$nextTick(() => {
                        vm.permissionsData.forEach((item) => {
                            if (item.rid) {
                                vm.$refs.itemTable.toggleRowSelection(item);
                            }
                        })
                    });
                }).catch((data) => {
                    console.log(data)
                })
            }
        },
        mounted() {
            this.getPermissionsData();
        }
    }

</script>

<style scoped>

</style>
