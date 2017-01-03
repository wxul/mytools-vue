<template>
    <div class="el-upload">
        <div class="el-upload__inner el-dragger" 
            @click="handleClick"
            @drop.prevent="onDrop"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
        >
            <i class="el-icon-upload"></i>
            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            <input class="el-upload__input" type="file" ref="input" @change="handleChange" multiple="multiple" accept=".js">
        </div><slot name="tips"></slot>
        
        <transition-group tag="ul" class="el-upload__files" name="list">
            <li
            v-for="file in files"
            class="el-upload__file is-finished"
            :key="file" >
            <a class="el-upload__file__name" >
                <i class="el-icon-document"></i>{{file.name}} ({{sizeformat(file.size)}})
            </a>
            <span class="el-upload__btn-delete" v-show="!upload" @click="delFile(file)">删除</span>
            
            </li>
        </transition-group>
        <el-progress v-if="upload" :percentage="parsePercentage(progress)"></el-progress>
        <el-button size="small" type="primary" @click="submit" :disabled="upload">{{upload?"正在处理":"点击上传"}}</el-button>
    </div>
</template>

<script>
    import ElProgress from 'element-ui/packages/progress';
    
    export default {
        name: 'my-upload',
        props: {
            onSubmit:{
                type:Function,
                default:function() {}
            },
            action: {
                type: String,
                required: true
            },
            onError:{
                type:Function,
                default:function() {}
            },
            onSuccess:{
                type:Function,
                default:function() {}
            },
            withCredentials:{
                type:Boolean
            },
            params:{
                type:Object
            },
            headers:{
                type:Object
            }
        },
        data(){
            return {
                upload:false,
                dragOver:false,
                files:[],
                progress:0
            }
        },
        methods: {
            sizeformat(val){
                if(val>1024*1024){
                    return (val/(1024*1024)).toFixed(2)+" MB";
                }else if (val>1024){
                    return (val/(1024)).toFixed(2)+" KB";
                }else {
                    return val+" Byte";
                }
            },
            handleChange(ev){
                const files = ev.target.files;

                if (!files) {
                    return;
                }
                this.addFile(files);
                this.$refs.input.value = null;
            },
            parsePercentage(val) {
                return parseInt(val, 10);
            },
            handleClick(){
                this.$refs.input.click();
            },
            onDrop(e){
                this.dragOver = false;
                this.addFile(e.dataTransfer.files);
            },
            addFile(files){
                this.files=this.files.concat([...files]);
            },
            delFile(file){
                var files=this.files;
                files.splice(files.indexOf(file), 1);
                /*this.files=this.files.filter((e,i)=>{
                    return e!=file;
                });*/
            },
            onProgress(e){
                this.progress=e.percent || 0;
            },
            uploadfile(){
                if(this.files.length==0)return;

                function getError(action, xhr) {
                    const msg = `fail to post ${action} ${xhr.status}'`;
                    const err = new Error(msg);
                    err.status = xhr.status;
                    err.method = 'post';
                    err.url = action;
                    return err;
                }

                function getBody(xhr) {
                    const text = xhr.responseText || xhr.response;
                    if (!text) {
                        return text;
                    }

                    try {
                        return JSON.parse(text);
                    } catch (e) {
                        return text;
                    }
                }

                const xhr=new XMLHttpRequest();
                var action=this.action;
                var _=this;
                if (xhr.upload) {
                    xhr.upload.onprogress = function progress(e) {
                        if (e.total > 0) {
                            e.percent = e.loaded / e.total * 100;
                        }
                        _.onProgress(e);
                    };
                }
                const formData = new FormData();
                if (_.params) {
                    Object.keys(_.params).map(key => {
                        formData.append(key, _.params[key]);
                    });
                }
                _.files.forEach((e,i)=>{
                    formData.append(e.name, e);
                })
                if (_.withCredentials && 'withCredentials' in xhr) {
                    xhr.withCredentials = true;
                }
                xhr.onerror = function error(e) {
                    _.onError(e);
                };

                xhr.onload = function onload(e) {
                    if (xhr.status < 200 || xhr.status >= 300) {
                        return _.onError(getError(action, xhr), getBody(xhr));
                    }

                    _.onSuccess(getBody(xhr));

                    setTimeout(()=>{_.upload=false},1000);
                };
                xhr.open('post', action, true);
                const headers = _.headers || {};
                for (let item in headers) {
                    if (headers.hasOwnProperty(item) && headers[item] !== null) {
                        xhr.setRequestHeader(item, headers[item]);
                    }
                }
                //console.log(xhr);
                this.upload=true;
                xhr.send(formData);
            },
            submit(){
                //console.log('submit!');
                this.uploadfile();
                //this.onSubmit(this.files);
            }
        }
    };
</script>

<style>
    .el-upload,.el-upload__tip{line-height:normal;}
    .el-progress{margin-bottom:10px;}
</style>