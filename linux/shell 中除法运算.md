保留两位小数
```
df_disk_per=(`echo "scale=2; $df_disk_used / $df_disk_total" | bc | awk '{printf "%.2f", $0}'`)
```