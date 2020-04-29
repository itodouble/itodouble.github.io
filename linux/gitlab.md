```bash
# 重新应用gitlab的配置,每次修改/etc/gitlab/gitlab.rb文件之后执行
sudo gitlab-ctl reconfigure

# 启动gitlab服务
sudo gitlab-ctl start

# 重启gitlab服务
sudo gitlab-ctl restart

# 查看gitlab运行状态
sudo gitlab-ctl status

#停止gitlab服务
sudo gitlab-ctl stop

# 查看gitlab运行所有日志
sudo gitlab-ctl tail

#查看 nginx 访问日志
sudo gitlab-ctl tail nginx/gitlab_acces.log 

#查看 postgresql 日志
sudo gitlab-ctl tail postgresql 

# 停止相关数据连接服务
gitlab-ctl stop unicorn
gitlab-ctl stop sidekiq

# 系统信息监测
gitlab-rake gitlab:env:info   
```