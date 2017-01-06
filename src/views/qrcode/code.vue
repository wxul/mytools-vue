<template>
    <div class="code">
        <el-row :gutter="20">
            <el-col :span="15" :offset="1">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="文本" name="txt">
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="6"
                            v-model="txt">
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="网站" name="url">
                        <el-input placeholder="请输入内容" v-model="url">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option label="http://" value="1"></el-option>
                            <el-option label="https://" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="名片" name="card">名片</el-tab-pane>
                    <el-tab-pane label="短信" name="sms">短信</el-tab-pane>
                </el-tabs>
                <el-button type="primary"  @click="handleDraw">生成</el-button>
            </el-col>
            <el-col :span="7" >
                <div>
                    <canvas id="canvas"></canvas>
                </div>
            </el-col>
        </el-row>
    </div>
    
</template>

<script>
    import createQRImage from '../../other/qrcanvas.js'
    export default {
        data() {
            return {
                form: {},
                activeName: "",
                canvas: null,
                txt: "",
                url: "",
                select: "1",
                mecard:{
                    N:"",       //姓名
                    ADR:"",     //地址
                    TEL:"",     //电话
                    EMAIL:"",   //邮箱
                    URL:"",     //网址
                    QQ:"",      //QQ
                    TIL:"",     //职位
                    ORG:"",     //单位
                    NOTE:""     //备注
                }
            }
        },

        mounted() {
            this.canvas = new createQRImage("canvas");
            this.canvas.changeText("https://albert.amayading.com");
        },
        methods: {
            handleDraw() {
                console.log(this.select)
                switch (this.activeName) {
                    case "txt":
                        this.canvas.changeText(this.txt);
                        break;
                    case "url":
                        this.canvas.changeText((this.select == 1 ? "http://" : "https://") + this.url);
                        break;
                    default:
                        break;
                }

            },
            handleClick() {
                //console.log(createQRImage);
            }
        }
    }
</script>

<style>
    .el-button {
        margin-top: 20px;
        float: right;
    }
    
    .el-select .el-input {
        width: 90px;
    }
</style>