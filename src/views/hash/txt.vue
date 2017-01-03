<template>
    <div class="txt">
        <el-row :gutter="20">
            <el-col :span="16" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="文本内容">
                        <el-input type="textarea" v-model="form.text" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">HASH!</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    <el-form-item label="大小写">
                        <el-switch on-text="大写" off-text="小写" v-model="form.isupper"></el-switch>
                    </el-form-item>
                    <el-form-item label="MD5">
                        <el-input v-model="comMd5"></el-input>
                    </el-form-item>
                    <el-form-item label="SHA1">
                        <el-input v-model="comSha1"></el-input>
                    </el-form-item>
                    <el-form-item label="Base64">
                        <el-input type="textarea" v-model="form.base64" :rows="4"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onDecode">Base解码</el-button>
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
                    isupper:true,
                    md5:"",
                    sha1:"",
                    base64:""
                }
            }
        },
        computed:{
            comMd5(){
                return this.form.isupper?this.form.md5.toUpperCase():this.form.md5.toLowerCase();
            },
            comSha1(){
                return this.form.isupper?this.form.sha1.toUpperCase():this.form.sha1.toLowerCase();
            }
        },
        methods:{
            onSubmit(){
                //console.log(this.form.text);
                this.$http.post(`${target}/hash/txt`,{txt:this.form.text})
                .then((d)=>{
                    return d.json();
                },(e)=>{
                    console.error("error:"+e);
                }).then(d=>{
                    this.form.md5=d.data.md5;
                    this.form.sha1=d.data.sha1;
                    this.form.base64=d.data.base64;
                })
                //console.log(this.$http);
            },
            onDecode(){//basedecode
                //console.log(this.form.base64);
                this.$http.post(`${target}/hash/basedecode`,{base64:this.form.base64})
                .then((d)=>{
                    return d.json();
                },(e)=>{
                    console.error("error:"+e);
                }).then(d=>{
                    this.form.text=d.data;
                })
            }
        }
    }
</script>

<style>

</style>