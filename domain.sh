#!/bin/bash

# 查找 ./src/ 目录下的所有 .jsx 文件，并将所有的 http://localhost:3098 替换为 https://file.xianyi.it
find ./src/ -type f -name "*.jsx" -exec sed -i 's/http:\/\/localhost:3098/https:\/\/file.xianyi.it/g' {} +
