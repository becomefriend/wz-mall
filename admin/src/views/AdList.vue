<template>
    <div>
        <h1>广告位列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="Id" width="230"></el-table-column>

            <el-table-column prop="name" label="名称" >
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template v-slot="scope">

                    <el-button type="primary" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "CategoryList",
        data(){
            return{
                items:[]
            }
        },
        methods:{
            async fetch(){
                const res= await this.$http.get('rest/ads')
                this.items=res.data
            },
            async remove(row){
                const confirmResult=await this.$confirm(`是否删除该广告"${row.title}"`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err=>err)

                if(confirmResult!=='confirm'){
                    return this.$message.info('已经取消删除')
                }

                const res=await this.$http.delete(`rest/ads/${row._id}`)
                console.log(res)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch()

            }
        },
        created() {
            this.fetch()
        }
    }
</script>

<style scoped>

</style>