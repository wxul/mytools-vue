<template>
    <div class="container">
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-submenu index="/hash">
                <template slot="title">HASH</template>
                <el-menu-item index="/hash/txt">文本Text</el-menu-item>
                <el-menu-item index="/hash/file">文件File</el-menu-item>
            </el-submenu>
            <el-submenu index="/js">
                <template slot="title">JS压缩</template>
                <el-menu-item index="/js/txt">文本压缩</el-menu-item>
                <el-menu-item index="/js/file">文件压缩</el-menu-item>
            </el-submenu>
            <el-submenu index="/qr">
                <template slot="title">二维码</template>
                <el-menu-item index="/qr/code">生成</el-menu-item>
                <el-menu-item index="/qr/decode">解码</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="viewbox">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import '../styles/normalize.css';
    import '../styles/style.css';
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style>
    .viewbox{
        margin-top:40px;
    }
    .container{
        min-width: 900px;
        overflow-x: hidden;
        min-height: 100%;
    }
</style>