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
                    <el-tab-pane label="网站" name="url" class="tab-url">
                        <el-input placeholder="请输入内容" v-model="url">
                            <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option label="http://" value="1"></el-option>
                            <el-option label="https://" value="2"></el-option>
                            </el-select>
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="电话" name="tel">
                        <el-input placeholder="请输入电话号码" v-model="tel">
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="邮箱" name="email">
                        <el-input placeholder="请输入邮箱" v-model="email">
                        </el-input>
                    </el-tab-pane>
                    <el-tab-pane label="名片" name="card" class="tab-card">
                        <el-form ref="form" :model="MECARD" label-width="80px">
                            <el-form-item label="姓名">
                                <el-input v-model="MECARD.N"></el-input>
                            </el-form-item>
                            <el-form-item label="地址">
                                <el-input v-model="MECARD.ADR"></el-input>
                            </el-form-item>
                            <el-form-item label="电话">
                                <el-input v-model="MECARD.TEL"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="MECARD.EMAIL"></el-input>
                            </el-form-item>
                            <el-form-item label="网址">
                                <el-input v-model="MECARD.URL"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ">
                                <el-input v-model="MECARD.QQ"></el-input>
                            </el-form-item>
                            <el-form-item label="职位">
                                <el-input v-model="MECARD.TIL"></el-input>
                            </el-form-item>
                            <el-form-item label="单位">
                                <el-input v-model="MECARD.ORG"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="MECARD.NOTE" type="textarea" :rows="4"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="WIFI" name="wifi" class="tab-wifi">
                        <el-form ref="form" :model="WIFI" label-width="120px">
                            <el-form-item label="SSID">
                                <el-input v-model="WIFI.S"></el-input>
                            </el-form-item>
                            <el-form-item label="加密方式">
                                <el-select v-model="WIFI.T" placeholder="请选择" @change="wifichange">
                                    <el-option
                                    v-for="item in Toptions"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="WIFI.P" :disabled="WIFI.T=='nopass'"></el-input>
                            </el-form-item>
                            <el-form-item label="是否为隐藏热点">
                                <el-switch
                                    v-model="WIFI.H"
                                    on-text="是"
                                    off-text="否"
                                    on-color="#13ce66"
                                    off-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                           
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="短信" name="sms" class="tab-sms">
                        <el-form ref="form" :model="SMS" label-width="120px">
                            <el-form-item label="手机号码">
                                <el-input v-model="SMS.Tel" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="短信内容">
                                <el-input v-model="SMS.NOTE" placeholder="请输入短信内容" type="textarea" :rows="4"></el-input>
                            </el-form-item>
                           
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="效果设置" name="other" class="tab-other">
                        <span slot="label"><i class="el-icon-picture"></i> 效果设置</span>
                    </el-tab-pane>
                </el-tabs>
                <el-button type="primary" class="draw" @click="handleDraw">生成</el-button>
            </el-col>
            <el-col :span="7" style="text-align:center;">
                <div>
                    <canvas id="canvas"></canvas>
                </div>
                <el-button style="margin:0 auto;" type="primary" size="small"  @click="handleSave">保存图片</el-button>
                <a :href="dl.base64" :download="dl.name" style="display:none;" ref="btna"></a>
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
                tel: "",
                email: "",
                MECARD: {
                    N: "", //姓名
                    ADR: "", //地址
                    TEL: "", //电话
                    EMAIL: "", //邮箱
                    URL: "", //网址
                    QQ: "", //QQ
                    TIL: "", //职位
                    ORG: "", //单位
                    NOTE: "" //备注
                },
                WIFI: {
                    S: "", //SSID
                    P: "", //Password
                    T: "WPA", //type,WEP/WPA/nopass
                    H: false //是否隐藏
                },
                Toptions: [{
                    value: 'nopass',
                    label: '无加密'
                }, {
                    value: 'WEP',
                    label: 'WEP'
                }, {
                    value: 'WPA',
                    label: 'WPA/WPA2'
                }],
                SMS: {
                    Tel: "",
                    NOTE: ""
                },
                dl: {
                    base64: "",
                    name: "二维码.png"
                }
            }
        },

        mounted() {
            this.canvas = new createQRImage("canvas");
            this.canvas.changeText("https://albert.amayading.com");
        },
        computed: {
            mecard() {
                return this.formatter("MECARD");
            },
            wifi() {
                return this.formatter("WIFI");
            },
            sms() {
                return `smsto:${this.SMS.Tel}:${this.SMS.NOTE}`
            }
        },
        methods: {
            wifichange(e) {
                if (e == "nopass") {
                    this.WIFI.P = "";
                }
            },
            formatter(objName) {
                var obj = this[objName];
                var tmp = "";
                Object.keys(obj).forEach((e, i) => {
                    var val = obj[e];
                    if (!!val) {
                        tmp += `${e}:${val};`;
                    }
                })
                return `${objName}:${tmp};`;
            },
            handleDraw() {
                switch (this.activeName) {
                    case "txt":
                        this.canvas.changeText(this.txt);
                        break;
                    case "url":
                        this.canvas.changeText((this.select == 1 ? "http://" : "https://") + this.url);
                        break;
                    case "tel":
                        this.canvas.changeText(`tel:${this.tel}`);
                        break;
                    case "email":
                        this.canvas.changeText(`mailto:${this.email}`);
                        break;
                    case "card":
                        this.canvas.changeText(this.mecard);
                        break;
                    case "wifi":
                        this.canvas.changeText(this.wifi);
                        break;
                    case "sms":
                        console.log(this.sms)
                        this.canvas.changeText(this.sms);
                        break;
                    default:
                        break;
                }

            },
            handleClick() {
                //console.log(createQRImage);
            },
            handleSave() {
                this.dl.base64 = document.getElementById("canvas").toDataURL('image/png');
                this.$nextTick(function() {
                    this.$refs.btna.click();
                })
            }
        }
    }
</script>

<style>
    .code .draw.el-button {
        margin-top: 20px;
        float: right;
    }
    
    .tab-url .el-select .el-input {
        width: 90px;
    }
    
    .tab-card .el-form,
    .tab-wifi .el-form,
    .tab-sms .el-form {
        width: 440px;
    }
    
    .tab-card .el-form .el-form-item,
    .tab-wifi .el-form .el-form-item,
    .tab-sms .el-form .el-form-item {
        margin-bottom: 10px;
    }
    
    #canvas {
        max-width: 100%;
    }
</style>