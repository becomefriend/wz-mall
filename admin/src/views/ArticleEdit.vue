<template>
    <div class="about">
        <h1>{{id?'编辑':'新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="文章详情">
<!--                vue2-editor富文本编辑器-->
                <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {VueEditor} from 'vue2-editor'
    export default {
        // 接收id
        props:{
            id:{}
        },
        components:{
            VueEditor
        },
        data(){
            return{
                model:{name},
                //父级的分类选项
                categories:[],
            }

        },
        methods:{
           async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                const formData = new FormData();
                formData.append("file", file);
               const res=await this.$http.post('upload',formData)
               Editor.insertEmbed(cursorLocation, "image", res.data.url);
               resetUploader();
            },
            async save(){
                let res
                if(this.id){
                    res= await this.$http.put(`rest/articles/${this.id}`,this.model)

                }else {
                    res= await this.$http.post('rest/articles',this.model)
                }

                console.log(res);
                this.$router.push('/articles/list')
                this.$message({
                    type:'success',
                    message:'保存成功'
                })
            },
            async fetch(){
                const res=await this.$http.get(`rest/articles/${this.id}`)
                this.model=res.data
            },
            async fetchCatgoies(){
                const res=await this.$http.get(`rest/categories`)
                this.categories=res.data
            }
        },
        created() {
            this.fetchCatgoies()
            this.id&&this.fetch()
        }
    }
</script>

<style scoped>

</style>