<template>
    <div class="txt">
        <el-row :gutter="20">
            <el-col :span="16" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="文件">
                        <my-upload
                            :action='action'
                            type="drag"
                            accept=".js"
                            :onSuccess="success"
                            >
                            <div class="el-upload__tip" slot="tips">只能上传js文件</div>
                        </my-upload>
                    </el-form-item>
                    <el-form-item label="压缩后">
                        <a v-show="showdl" :href="dl.href" :download="dl.name">点击下载文件</a>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        
    </div>
    
</template>

<script>
import {target} from '../../config';
import MyUpload from './uploadlist.vue'
    export default {
        components:{
            MyUpload
        },
        data() {
            return {
                fileList:[],
                action:`${target}/js/file`,
                form:{},
                dl:{
                    name:"result.js",
                    href:""
                }
            }
        },
        computed:{
            showdl(){
                return !!this.dl.href;
            }
        },
        methods:{
            success(data){
                var b = new Blob([data.data], { type: "application/octet-binary" });
                var url = URL.createObjectURL(b);
                this.dl.href=url;
            }
        }
    }
</script>

<style>

</style>