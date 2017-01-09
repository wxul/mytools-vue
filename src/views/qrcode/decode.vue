<template>
    <div class="decode">
        <el-row :gutter="20">
            <el-col :span="16" :offset="1">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="图片">
                        <el-upload
                            action="/test.com"
                            type="drag"
                            :thumbnail-mode="true"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :default-file-list="fileList"
                            :before-upload="handleUpload"
                            >
                            <i class="el-icon-upload"></i>
                            <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="imgurl" @blur="handleImgBlur"></el-input>
                    </el-form-item>
                    <el-form-item label="解码">
                        <el-input type="textarea" v-model="form.decodetext" :rows="4" :spellcheck="false"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog title="图片预览" v-model="dialogVisible" size="tiny">
            <img :src="imgdata" />
        </el-dialog>
    </div>
    
</template>

<script>
    import qrcode from '../../other/llqrcode.js';
    export default {
        data() {
            return {
                form: {
                    decodetext: ""
                },
                imgurl: "",
                fileList: [],
                imgdata: "",
                dialogVisible: false
            }
        },
        mounted() {
            qrcode.callback = (result) => {
                this.form.decodetext = result;
            }
        },
        methods: {
            handleImgBlur(e) {
                var reg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/;
                if (reg.test(this.imgurl)) {
                     //qrcode自带
                    var domain = this.imgurl.match(/(http|https|ftp):\/\/([^\/]+)\//i);
                    domain = domain ? domain[2] : "未知";
                    this.decodeImg(`来自 ${domain} 的图片`, this.imgurl);

                    /* 设置了跨域的图片不能生成base64
                    var img = document.createElement("img");
                    img.crossOrigin = "Anonymous";
                    var _ = this;
                    console.log(1);
                    try {
                        img.onload = function() {
                            console.log(4);

                            var canvas = document.createElement("canvas");
                            canvas.width = this.width;
                            canvas.height = this.height;

                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                            //document.body.appendChild(canvas);

                            console.log(5);
                            var dataURL = canvas.toDataURL("image/png");
                            _.decodeImg(_.imgurl, dataURL);

                        }
                        console.log(2);
                        img.src = this.imgurl;
                        console.log(3);
                    } catch (err) {
                        console.log(123);
                    }*/
                }
                console.log(this.imgurl);
            },
            handleRemove(file, fileList) {
                //console.log(file, fileList);
                this.imgdata = "";
                this.form.decodetext = "";
            },
            handlePreview(file) {
                this.dialogVisible = true;
            },
            decodeImg(filename, result) {
                this.imgdata = result;
                this.fileList = [{
                    name: filename,
                    url: result
                }];
                qrcode.decode(result);
            },
            handleUpload(file) {
                var _ = this;
                var reader = new FileReader();
                reader.onload = function(f) {
                    _.decodeImg(file.name, f.target.result);
                }
                reader.readAsDataURL(file);
                //this.fileList=[file];
                return false;
            }
        }
    }
</script>

<style>
    .el-upload,
    .el-upload__tip {
        line-height: normal;
    }
    
    .el-dragger {
        height: auto;
        min-height: 180px;
    }
    
    .el-dragger__cover {
        position: static;
        font-size: 0;
    }
    
    .el-dragger__cover__content {
        position: static;
    }
    
    .el-dialog {
        width: auto;
        max-width: 100%;
    }
    
    .el-dialog__body {
        padding: 20px 10px;
    }
</style>