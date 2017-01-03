<template>
    <div class="txt">
        <el-row :gutter="20">
            <el-col :span="16" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="文本内容">
                        <el-input type="textarea" v-model="form.text" :rows="6"></el-input>
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
                    min:""
                }
            }
        },
        methods:{
            onSubmit(){
                //console.log(this.form.text);
                this.$http.post(`${target}/js/txt`,{jstxt:this.form.text})
                .then((d)=>{
                    return d.json();
                },(e)=>{
                    console.error("error:"+e);
                }).then(d=>{
                    this.form.min=d.data;
                })
                //console.log(this.$http);
            }
        }
    }
</script>

<style>

</style>