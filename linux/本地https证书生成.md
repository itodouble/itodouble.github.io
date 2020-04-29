openssl genrsa -out ca.key 1024
 
 
openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key
 
./demoCA/newcerts 文件夹  ./demoCA/index.txt 文件  ./demoCA/serial 文件(内容00)


openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key 