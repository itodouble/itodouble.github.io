##### 弹窗(MessageBox 弹框) 需要手动关闭 在中间显示 
```
this.$alert('错误详情', '错误信息',{
  confirmButtonText:'确认是', callback:action =>{
    // todo
  }
});
```
![弹窗](http://markdown.itodouble.top/20190522111018.png)

##### 确认弹窗
```
this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning'
}).then(() => {
  // todo 确认
}).catch(() => {
  // todo 取消
});
```
![弹窗](http://markdown.itodouble.top/20190522111439.png)

##### 提示窗 在顶部显示
```
this.$message({message:'提交成功',type:'success'});
```
![提示窗](http://markdown.itodouble.top/20190522110913.png)

##### 消息通知 悬浮于右上角
```
this.$notify({
  title: '成功',
  message: '这是一条成功的提示消息',
  type: 'success',
  duration: 0 // 是否自动关闭
});
// 或
this.$notify.error({
  title: '错误',
  message: '这是一条错误的提示消息'
});
```
![通知](http://markdown.itodouble.top/20190522111930.png)