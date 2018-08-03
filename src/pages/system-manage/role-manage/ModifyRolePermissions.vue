<template>
    <div class="table">
        <div class="container">
            <el-tree :data="getData" show-checkbox node-key="id" ref="tree" highlight-current :default-expand-all="true" :default-checked-keys="defaultSelectedMenu" :props="defaultProps">
            </el-tree>
            <el-row style="margin: 50px auto">
                <el-button @click="submit" size="medium" type="success" icon="el-icon-check">提交</el-button>
                <el-button @click="cancelAdd" size="medium" type="primary" icon="el-icon-back">返回</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import { goBack } from '../../../functions/index'
import bus from '../../../components/common/bus'
export default {
    data() {
        return {
            getDataList: [
                {
                    grade: '',
                    id: '',
                    list: '',
                    name: '',
                    orders: '',
                    parentId: '',
                    permission: '',
                    rid: '',
                    type: '',
                    url: ''
                }
            ],
            pids: [],
            selectedPid: [],
            getData: [],
            defaultProps: {
                children: 'subs',
                label: 'name'
            },
            //初始话选中的菜单
            defaultSelectedMenu: []
        }
    },
    methods: {
        // 初始化数据
        getDefaultSelectedMenuList() {
            let vm = this
            let defaultSelectedMenuOne = []
            let defaultSelectedMenuTwo = []
            this.$httpGet('/admin/role/getAllMenuByRoleId', {
                id: this.$route.params.id
            })
                .then(({ data }) => {
                    vm.getData = data
                    if (vm.getData || vm.getData.length > 0) {
                        if (
                            vm.getData[0].subs ||
                            vm.getData[0].subs.length > 0
                        ) {
                            for (let valuesOuterOne of vm.getData[0].subs) {
                                if (
                                    valuesOuterOne.subs ||
                                    valuesOuterOne.subs.length > 0
                                ) {
                                    for (let valuesInsideOne of valuesOuterOne.subs) {
                                        if (
                                            valuesInsideOne.subs ||
                                            valuesInsideOne.subs.length > 0
                                        ) {
                                            valuesInsideOne.rid = ''
                                            for (let valuesInsideTwo of valuesInsideOne.subs) {
                                                if (valuesInsideTwo.rid) {
                                                    defaultSelectedMenuOne.push(
                                                        valuesInsideTwo.id
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            for (let valuesOuterTwo of vm.getData[0].subs) {
                                if (
                                    valuesOuterTwo.subs ||
                                    valuesOuterTwo.subs.length > 0
                                ) {
                                    valuesOuterTwo.rid = ''
                                    for (let valuesInsideThree of valuesOuterTwo.subs) {
                                        if (valuesInsideThree.rid) {
                                            defaultSelectedMenuTwo.push(
                                                valuesInsideThree.id
                                            )
                                        }
                                    }
                                } else {
                                    if (valuesOuterTwo.rid) {
                                        defaultSelectedMenuTwo.push(
                                            valuesOuterTwo.id
                                        )
                                    }
                                }
                            }
                            vm.defaultSelectedMenu = defaultSelectedMenuOne.concat(
                                defaultSelectedMenuTwo
                            )
                        } else {
                            vm.defaultSelectedMenu = []
                        }
                    } else {
                        vm.defaultSelectedMenu = []
                    }
                })
                .catch(data => {
                    console.log(data)
                })
        },
        cancelAdd() {
            goBack()
        },
        submit() {
            let vm = this
            // 半选中的Keys
            let getHalfCheckedKeys = []
            // 选中的Keys
            let getCheckedKeys = this.$refs.tree.getCheckedKeys()
            let getHalfCheckedNodes = this.$refs.tree.getHalfCheckedNodes()
            if (getHalfCheckedNodes.length > 0 || getHalfCheckedNodes) {
                for (let values of getHalfCheckedNodes) {
                    getHalfCheckedKeys.push(values.id)
                }
            } else {
                getHalfCheckedKeys = []
            }
            this.selectedPid = getCheckedKeys.concat(getHalfCheckedKeys)
            // 数组去重
            this.selectedPid = Array.from(new Set(vm.selectedPid))
            // 过滤数组里面的1
            this.selectedPid = this.selectedPid.filter(value => {
                return value != 1
            })
            this.$httpPost('/admin/role/assignUpdate', {
                id: this.$route.params.id,
                pids: this.selectedPid.join(',')
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.getMenuList()
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 获取菜单列表
        getMenuList() {
            let vm = this
            this.$httpGet('/admin/admin/getPermissionList', {
                id: JSON.parse(window.localStorage.getItem('user')).id
            })
                .then(({ data }) => {
                    vm.$store.dispatch(
                        'setNavigationMenu',
                        JSON.stringify(data[0].subs)
                    )
                    // 更新菜单
                    bus.$emit('menuItems')
                    setTimeout(() => {
                        goBack()
                    }, 1000)
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 单选
        handleSelectionChange(val, row) {
            this.pids = []
            for (let values of val) {
                if (values) {
                    this.pids.push(values.id)
                }
            }
        },
        // 多选
        handleSelectionAllChange(val) {
            this.pids = []
            for (let i = 0; i < val.length; i++) {
                this.pids.push(val[i].id)
            }
        }
    },
    mounted() {
        this.getDefaultSelectedMenuList()
    }
}
</script>

<style scoped>
</style>
