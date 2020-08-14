
sftp root@8.210.23.30

ssh root@8.210.23.30 "cd /usr/ss707494/zw_project/warehouse_records/build"

ssh root@8.210.23.30
&
rm -rf /usr/ss707494/zw_project/warehouse_records/build
&&
rm -rf ./build
ENDSSH

cd /usr/ss707494/zw_project/warehouse_records/build

put -r D:\code\zw\warehouse_records\build

scp -r D:\code\zw\warehouse_records\build root@8.210.23.30:/usr/ss707494/zw_project/warehouse_records/build
