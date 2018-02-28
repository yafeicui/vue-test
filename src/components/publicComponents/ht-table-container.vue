<template>
    <div class="ht-table-container">    
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>
<style lang="less">
    .ht-table-container{//table header
        .el-table{
            width: 100%; 
            border-left: solid 1px #eee;
            border-top: solid 1px #eee;
            border-right: solid 1px #eee;
            .el-table__header-wrapper{
                .el-table__header{
                    tr{
                        background:#dee0eb;
                    }
                }
            }
            .el-table__body-wrapper{//table 偶数行
                .el-table__body{
                    tbody{
                        tr:nth-child(2n+0){
                            background: #f7f8fc;
                        }
                    }                    
                }
            }
        }
        
    }
</style>

