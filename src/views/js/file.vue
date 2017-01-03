<template>
    <div class="txt">
        <el-row :gutter="20">
            <el-col :span="16" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="文件">
                        <el-upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            type="drag"
                            :multiple="true"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                            :default-file-list="fileList"
                            accept=".js"
                            >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传js文件</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">压缩!</el-button>
                    </el-form-item>
                    <el-form-item label="压缩后">
                        <el-input type="textarea" v-model="form.min" :rows="4"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
    </div>
    
</template>

<script>
import {target} from '../../config';
    export default {
        data() {
            return {
                form:{
                    text:"",
                    min:"",
                    fileList:[]
                }
            }
        },
        methods:{
            onSubmit(){
                //console.log(this.form.text);
                /*this.$http.post(`${target}/js/txt`,{jstxt:this.form.text})
                .then((d)=>{
                    return d.json();
                },(e)=>{
                    console.error("error:"+e);
                }).then(d=>{
                    this.form.min=d.data;
                })*/
                //console.log(this.$http);
            }
        }
    }
</script>

<style>

</style>