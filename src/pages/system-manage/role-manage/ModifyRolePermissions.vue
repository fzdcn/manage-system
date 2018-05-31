<template>
    <div class="table">
        <div class="container">
            <el-table :data="permissionsData" ref="itemTable" border style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column @selection-change="handleSelectionChange" type="selection"
                                 width="55"></el-table-column>
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="name" label="菜单">
                </el-table-column>
                <el-table-column prop="permission" label="权限key">
                </el-table-column>
                <el-table-column prop="url" label="URL">
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
                    console.log(data);
                    this.$message.success(data)
                    goBack();
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            // 单选
            handleSelectionChange(val) {
                this.pids = [];
                for (let values of val) {
                    if (values) {
                        this.pids.push(values.id);
                    }
                }
            },
            getPermissionsData() {
                let vm = this;
                this.$httpGet('/admin/role/assign', {
                    id: this.$route.params.id
                }).then(({data}) => {
                    vm.permissionsData = data;
                    vm.$nextTick(() => {
                        vm.permissionsData.forEach((item) => {
                            if (item.rid) {
                                vm.$refs.itemTable.toggleRowSelection(item)
                            }
                        })
                    });
                }).catch((data) => {
                    console.log(data.error)
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
