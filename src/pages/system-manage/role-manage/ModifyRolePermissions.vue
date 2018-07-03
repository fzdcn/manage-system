<template>
    <div class="table">
        <div class="container">
            <el-table :data="getDataList" ref="itemTable" border style="width: 100%;"
                      @selection-change="handleSelectionAllChange" @select="handleSelectionChange"
                      @select-all="handleSelectionChange">
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
                <el-button @click="submitAdd" size="medium" type="success">提交</el-button>
                <el-button @click="cancelAdd" size="medium" type="primary">返回</el-button>
            </el-row>


            <!--<el-tree-->
                <!--:data="data2"-->
                <!--show-checkbox-->
                <!--node-key="id"-->
                <!--ref="tree"-->
                <!--highlight-current-->
                <!--:default-expand-all="true"-->
                <!--:default-checked-keys="defaultSelectedMenu"-->
                <!--:props="defaultProps">-->
            <!--</el-tree>-->
            <!--<div class="buttons">-->
                <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
                <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import {goBack} from '../../../functions/index'

    export default {
        data() {
            return {
                getDataList: [
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
                pids: [],
                data2: [],
                defaultProps: {
                    children: 'subs',
                    label: 'name'
                },
                defaultSelectedMenu: []
            }
        },
        methods: {
            getCheckedNodes() {
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
                console.log(this.$refs.tree.getNode('98'));
            },
            getDefaultSelectedMenuList() {
                let vm = this;
                this.$httpGet('/admin/role/getAllMenuByRoleId', {
                    id: this.$route.params.id
                }).then(({data}) => {
                    vm.data2 = data;
                    if (vm.data2.length > 0) {
                        if (vm.data2[0].subs || vm.data2[0].subs.length > 0) {
                            for (let valuesOuter of vm.data2[0].subs) {
                                if (valuesOuter.subs || valuesOuter.subs.length > 0) {
                                    for (let valuesInsideOne of valuesOuter.subs) {
                                        if (valuesInsideOne.subs || valuesInsideOne.subs.length > 0) {
                                            for (let valuesInsideTwo of valuesInsideOne.subs) {
                                                if (valuesInsideTwo.rid) {
                                                    vm.defaultSelectedMenu.push(valuesInsideTwo.id);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            for (let valuesOuter of vm.data2[0].subs) {
                                if (valuesOuter.subs || valuesOuter.subs.length > 0) {
                                    for (let valuesInsideOne of valuesOuter.subs) {
                                        if (valuesInsideOne.subs || valuesInsideOne.subs.length > 0) {
                                            if (valuesInsideOne.subs.length = 1) {

                                            }
                                            if (valuesInsideOne.rid) {
                                                vm.defaultSelectedMenu.push(valuesInsideOne.id);
                                            }
                                        }
                                    }
                                }
                            }
                            for (let valuesOuter of vm.data2[0].subs) {
                                if (valuesOuter.subs || valuesOuter.subs.length > 0) {
                                    if (valuesOuter.rid) {
                                        vm.defaultSelectedMenu.push(valuesOuter.id);
                                    }
                                }
                            }
                        } else {

                        }
                    } else {

                    }
                }).catch((data) => {
                    console.log(data)
                })
            },
            cancelAdd() {
                goBack();
            },

            submitAdd() {
                let vm = this;
                this.$httpPost('/admin/role/assignUpdate', {
                    id: this.$route.params.id,
                    pids: this.pids.join(',')
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.getMenuList();
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
                    setTimeout(() => {
                        window.location.href = window.location.origin + '/#/role-manage';
                        location.reload();
                    }, 1000);
                }).catch((data) => {
                    console.log(data);
                })
            },
            // 单选
            handleSelectionChange(val, row) {
                this.pids = [];
                /*if (row.grade == 1) {
                    for (var i = row.index; i < this.getDataList.length; i++) {
                        if (i + 1 < this.getDataList.length) {
                            if (this.getDataList[i + 1].grade >= 2) {
                                this.$refs.itemTable.toggleRowSelection(this.getDataList[i + 1]);
                            } else {
                                break;
                            }
                        }
                    }
                } else if (row.grade == 2) {
                    for (var i = row.index; i < this.getDataList.length; i++) {
                        if (i + 1 < this.getDataList.length) {
                            if (this.getDataList[i + 1].grade >= 3) {
                                let nameArray = [];
                                for (let values of val) {
                                    nameArray.push(values.name);
                                }
                                if (nameArray.includes(this.getDataList[i + 1].name)) {
                                    this.$refs.itemTable.toggleRowSelection(this.getDataList[i + 1]);
                                } else {
                                    this.$refs.itemTable.toggleRowSelection(this.getDataList[i + 1], false);
                                }
                            } else {
                                break;
                            }
                        }
                    }
                } else if (row.grade == 3) {
                    for (var i = row.index; i < this.getDataList.length; i++) {
                        if (i + 1 < this.getDataList.length) {
                            if (this.getDataList[i + 1].grade >= 3) {
                                this.$refs.itemTable.toggleRowSelection(this.getDataList[i + 1]);
                            } else {
                                break;
                            }
                        }
                    }
                }*/
                for (let values of val) {
                    if (values) {
                        this.pids.push(values.id);
                    }
                }
            },
            // 多选
            handleSelectionAllChange(val) {
                this.pids = [];
                for (let i = 0; i < val.length; i++) {
                    this.pids.push(val[i].id);
                }
            },
            getPermissionsData() {
                let vm = this;
                this.pids = [];
                this.$httpGet('/admin/role/assign', {
                    id: this.$route.params.id
                }).then(({data}) => {
                    let i = 0;
                    for (let values of data) {
                        values['index'] = i++;
                    }
                    vm.getDataList = data;
                    vm.$nextTick(() => {
                        vm.getDataList.forEach((item) => {
                            if (item.rid) {
                                vm.pids.push(item.id);
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
            // this.getDefaultSelectedMenuList();
        }
    }

</script>

<style scoped>

</style>
