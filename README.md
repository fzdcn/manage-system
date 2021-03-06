# manage-system #
基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案。


## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件
	|           |-- Breadcrumb.vue       // 公共面包屑
	|           |-- bus.js           	 // Event Bus
	|           |-- Header.vue           // 公共头部
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|           |-- Tags.vue           	 // 页面切换标签组件
	|   |-- config                       // 公共配置文件
	|   |-- functions                    // 公共方法
	|   |-- page                   	 // 主要路由页面
	|   |-- router                   // 路由
	|   |-- store                    // vuex
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 安装步骤 ##

	git clone xxx     // 把模板下载到本地
	cd manage-system    // 进入模板目录
	## npm or yarn install ##
	npm install         // 安装项目依赖，等待安装完成之后
	yarn install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##
    ## npm or yarn run dev ##
	// 开启服务器，浏览器访问 http://localhost:8080 或者 http://ip:8080
	npm run dev
    yarn run dev
## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build
