把链接传递到父页面 让父页面先把高度设置为0后 再跳转 得到页面高度 避免当页面高度低的时候无法得到真实高度

父页面：
```
// 监听
<script type="text/javascript">
window.addEventListener('message', function(event){
	console.log(event.data);
	document.getElementById("frame_content").height=0;
    if(event.data!=null && event.data.height!=null) {
    	document.getElementById("frame_content").height=event.data.height;
    }
    if(event.data!=null && event.data.linkUrl!=null) {
    	document.getElementById("frame_content").src=event.data.linkUrl;
    }
	
}, false);
</script>
```
子页面：
```
function loadFrame(linkUrl) {
	var map = {linkUrl:linkUrl};
	window.parent.postMessage(map,'*');
}
```
子页面2:
```
// 传递高度到父页面
function getBodyHeight() {
	var height1 = document.body.clientHeight;
	var height2 = document.documentElement.scrollHeight;
	var height3 = document.body.scrollHeight;
	var height4 = document.documentElement.clientHeight;
	console.log(height1+"-"+height2+"-"+height3+"-"+height4);
	var heights = [height1,height2,height3,height4];
	var height=Math.max.apply(Math,heights);
	var map = {height:height};
	window.parent.postMessage(map,'*');
}
```