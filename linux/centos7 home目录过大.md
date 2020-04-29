http://blog.csdn.net/evandeng2009/article/details/49814097


1. 如果需要的话 备份/home目录

2. 卸载(取消挂载)/home目录
```
umount /home
```

3.删除逻辑卷home
```
lvremove /dev/centos/home
```

查看卷组可用空间
```
vgdisplay
```
注:Free PE / Size 中显示的空间为卷组的空闲空间

4.新建一个卷home，fdisk格式化为8e格式，文件系统还是搞为xfs（同样挂载到/home）
```
lvcreate -L 50G -n home centos //L表示大小，默认单位为M；n表示卷名
vgchange -ay centos  //可选步骤：激活卷组centos，使得这个新建的home逻辑卷生效（用vgchange而不用lvchange）
mkfs -t xfs /dev/centos/home //在新建的逻辑卷home上建立xfs文件系统
mount /dev/centos/home /home/ //把这个新逻辑卷home挂到之前的文件夹/home中去，直接重启用fstab来挂载也行
```

最后再把释放出来多余的空间分配给root卷并xfs_growfs扩展文件系统
```
lvextend -L +823G /dev/centos/root //把剩下的823G现在分配给root卷，剩下那点渣渣空间让它闲着；+号表示在原来的基础上额外增加，不要加好则设定为具体额度
```

```
vgchange -ay centos //可选步骤：再次激活下卷组centos
xfs_growfs /dev/centos/root //扩展root卷
```