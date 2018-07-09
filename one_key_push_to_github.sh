
#!/bin/bash
# author Kang, Leo
# date 2016-5-26

pre_date=0
os_name=$(uname -s)

if [[ "$os_name" == "Linux" ]]; then
    #statements
    pre_date=$(date +%Y-%m-%d --date)
elif [[ "$os_name" == "Darwin" ]]; then
    pre_date=$(date +%s)
fi

echo $pre_date

echo '更新远端github仓库'
git init 
git add .
git commit -m $pre_date
git push -u origin master
echo '更新成功！'


