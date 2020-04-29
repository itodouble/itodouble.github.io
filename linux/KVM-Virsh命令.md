查看所有虚拟机和状态
```
virsh list
```
启动该虚拟机
```
virsh start  test
```
重启该虚拟机
```
virsh reboot test
```
虚拟机处于paused暂停状态,一般情况下是被admin运行了virsh suspend才会处于这种状态,但是仍然消耗资源,只不过不被超级管理程序调度而已。
```
virsh  suspend test
```
把虚拟机唤醒，使其恢复到running状态
```
virsh resume test
```
关闭指令，是虚拟机进入shutoff状态，系统提示虚拟机正在被关闭，却未必能成功
```
virsh shutdown test
```
强制关闭该虚拟机，但并非真的销毁该虚拟机，只是关闭而已。
```
virsh destroy test
```
将该虚拟机的运行状态存储到文件a中
```
virsh save test a
```
根据文件a恢复被存储状态的虚拟机的状态，即便虚拟机被删除也可以恢复（如果虚拟机已经被undefine移除，那么恢复的虚拟机也只是一个临时的状态，关闭后自动消失）
```
virsh restore a
```
移除虚拟机，虚拟机处于关闭状态后还可以启动，但是被该指令删除后不能启动。在虚拟机处于Running状态时，调用该指令，该指令暂时不生效，但是当虚拟机被关闭后，该指令生效移除该虚拟机，也可以在该指令生效之前调用define+TestKVM.xml取消该指令
```
virsh undefine test  
```
修改TestKVM的配置文件，效果等于先dumpxml得到配置文件，然后vi xml，最后后define该xml文件(建议关机修改，修改完virsh define防止不生效)
```
virsh edit test
```
在-o后面为被克隆虚拟机名称，-n后克隆所得虚拟机名称，file为克隆所得虚拟机镜像存放地址。
克隆的好处在于，假如一个虚拟机上安装了操作系统和一些软件，那么从他克隆所得的虚拟机也有一样的系统和软件，大大节约了时间。
```
virt-clone -o test -n test01 –file   /data/test01.img 
```

根据名称登录
```
virsh  console nzwweb01
```

添加外网IP前先加路由
```
route add -net 0.0.0.0 gw 192.168.2.1
```