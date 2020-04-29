从/data/backup/server/webapps同步到/data/web
```
rsync -av -e 'ssh -p 223' --progress root@192.168.2.138:/data/backup/server/webapps/* /data/web
```