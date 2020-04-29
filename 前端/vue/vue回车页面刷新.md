```
<el-form :inline="true" :rules="rules" label-position="left" style="text-align: left;padding-left: 5px;"
         size="mini"
         :model="joinusForm" ref="joinusForm" @submit.native.prevent>
    <el-form-item>
        <el-input v-model="joinusForm.keyword" placeholder="请输入关键字"  @keyup.enter.native="query"></el-input>
    </el-form-item>
    <el-form-item >
        <el-button type="primary" @click="query">查询</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="resetForm">重置</el-button>
    </el-form-item>
    
    <el-alert
        title="多个时,用英文逗号分隔"
        type="warning"
        close-text="知道了" style="width: 300px">
    </el-alert>
</el-form>
```

1.  form 上增加@submit.native.prevent 就可以阻止回车刷新了
2.  @keyup.enter.native="query" 在输入框回车及可以搜索了