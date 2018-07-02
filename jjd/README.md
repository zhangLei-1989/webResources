# 今借到 3.0

## 基础组件
* 按钮	（btn）
* 载入进度条（集成）
* 加载更多动画（more）
* 行（ele）
* 组（group）
* 验证码按钮（codeBtn）
* 街区选择（cityList）
* 地址选择（city）
* 框列表（borderBox）
* 日期选择（date）
* 单列选择（selector）

## 封装方法
* 弹窗（通过 utils.alert / utils.confirm 调用）
* 封装了 `ajaxJson` `ajaxForm` `ajaxJsonp` `ajaxGet` 四种请求方法
* 获取 url 中参数 utils.getArg([argument])
* 获取浏览器类型 utils.browser.argument
* 表单验证函数 
## 项目结构

* /build			- 编译脚本
* /config		- 环境配置
* /dist			- 生产文件夹
	* /static	- 静态资源
		* /css
		* /js
	* index.html		- 入口文件
* /qnShell				- 七牛
	* qnConfig			- 七牛配置文件
	* qrsync_*			- 七牛上传工具
* /src					- 源码文件夹
	* /api				- 后台接口
	* /assets			- 小静态文件
	* /components		- 组件
		* /basic			- 基础组件，不能直接被使用
		* /mixin			- 由 basic 混合或者直接写出来的基础组件
		* /output		- 该项目单独的组件，不会被其他项目复用
		* /router		- 路由
			* map			- 路由表
			* router		- 路由基础配置
		* /scss			- scss 样式文件，里面的文件全部都用 _ 开头命名，引入的时候自动忽略
			* const		- 颜色、高度等样式参数，全部大写，用 @include $* 引入
			* fragment	- 样式片段，用 @extend %* 引入
			* function	- 函数片段，用 @include * 引入
			* normal		- 初始化样式，用 @include $* 引入
		* /store			- 状态存储
			* action		- 直接被调用的函数，只有它
			* mutation-types	- 状态改变列表
			* mutation			- 状态改变函数
			* state				- 全部状态
			* store				- 状态基础配置
		* /tools					- 工具
			* cityDetail		- 城市级列表
			* cityList			- 省级列表
			* utils				- 工具函数
			* validationRules	- 表单验证规则
		* /views			- 全部视图，即页面
		* App				- vue 框架组件
		* main			- webpack 入口文件
	* /static			- 大静态文件
	* .babelrc			- babel 规则，es6 转译工具
	* .editorconfig	- 编辑器配置
	* .eslintrc			- eslint 规则，代码质量检测
	* .gitignore		- git 忽略文件列表
	* codingMR			- 在 coding 上创建合并请求
	* index				- webpack index.html 的模板
	* package			- node 模块列表
	* qnUpload			- 上传 dist 下文件到七牛
	* README				- 本文

