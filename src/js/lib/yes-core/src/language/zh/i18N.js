import { YIUI } from '../../YIUI-base';
import plug_in from './plug-in';
const other = {
	control : {
		require : "-必须填写-"
	},

	attachment : {
		name : "附件名称",
		time : "上传时间",
		people : "上传人",
		url : "附件路径",
		exercise : "操",
		ldo : "作",
		operation : "操作",
		upload : "上传",
		download : "下载",
		ldelete : "删除",
		preview : "预览",
		noContent : "表中无内容",
		unable : "新增状态无法进行上传操作！"
	},

	listview : {
		order : "序",
		number : "序号"
	},

	dict : {
		unknown : '未知的类型：',
		query : "查询",
		cancel : "取消",
		determine : "确定",
		empty : "清空",
		code : "代码",
		name : "名称"
	},
	
	date : {
		today : "今天",
		confirm : "确认",
		formatError : "输入的格式错误",
		wrongTime:"错误的时间："
	},

	yescombobox : {
		nothing : "无"
	},

	grid : {
		whetherEmpty : "是否清空所有子明细数据?",
		nonsupport : "表格排序不支持行分组！",
		lundefined : "扩展源未定义",
		total : "共 {0} 条",
		noData : "无数据显示",
		recordtext : "共 {2} 条",
		jumpTo : " 跳转至：{0}页",
		deleteRecord : "删除所选记录？",
		addRecord : "添加新记录",
		delRecord : "删除所选记录",
		moveUp : "上移数据行",
		moveDown : "下移数据行",
		isNotTable : "表格初始化错误，初始化所用HtmlElement不是Table类型",
		isErrorMode : "表格所在页面的渲染模式(documentMode)低于5",
		model : "colNames 和 colModel 长度不等！",
		isSortError : "行分组情况下不允许进行排序",
		notAllow : "多选复合字典{0}不允许有数据绑定字段",
		prompt : "提示",
		open : "打开",
		see : "查看",
		eliminate : "清除"
	},

	userinfopane : {
		admin : "系统管理员",
		logout : "注销",
		quit : "退出"
	},


	rightsset : {
		setUp : "字典权限设置",
		modify : "修改",
		save : "保存",
		select : "全选",
		sign : "标志",
		coding : "编码",
		jurisdiction : "是否有权限",
		search : "搜索",
		formSet : "表单权限设置",
		inletSet : "入口权限设置"
	},

	

	baidumap : {
		inputPlace : "请输入搜索地点...",
		eventTest : "Event测试",
		address : "地址：XX市XX区XXXXXXX",
		canton : "行政区",
		inputName : "请输入行政区名称...",
		failTo : "未能获取当前输入行政区域",
		currentDot : "当前点"
	},

	calendar : {
		months : "yyyy年MM月",
		weeks : "yyyy年MM月dd-{dd}日",
		days : "yyyy年MM月dd日-dddd",
		week : "周",
		month : "月",
		day : "日",
		today : "今天",
		january : "一月",
		february : "二月",
		march : "三月",
		april : "四月",
		may : "五月",
		june : "六月",
		july : "七月",
		august : "八月",
		september : "九月",
		october : "十月",
		november : "十一月",
		december : "十二月",
		sunday : "周日",
		monday : "周一",
		tuesday : "周二",
		wednesday : "周三",
		thursday : "周四",
		friday : "周五",
		saturday : "周六",
		allday : "全天",
		dot : "点",
		schedule : "日程内容：",
		thing : "记录你将要做的一件事...",
		startTime : "开始时间：",
		stopTime : "结束时间：",
		choice : "选择",
		current : "当前",
		notEmpty : "内容不允许为空!",
		notTime : "开始时间不允许为空!",
		newEvent : "新建事件",
		editEvent : "编辑事件",
		lnew : "新建",
		confirmDel : "确定删除？"
	},

	tabpanelex : {
		picture : "图片",
		materialOrder : "物料订单"
	},

	wizardpanel : {
		previousStep : "上一步",
		nextStep : "下一步",
		complete : "完成"
	},
	
	dialog : {
		close : "关闭",
		details : "详情",
		wClose : "是否关闭",
		yes : "是",
		no : "否"
	},
	

	pagination : {
		joint : "共",
		totalRecord : "条记录",
		page : "页"
	},

	form : {
		closeInterface : "是否确定要关闭界面？"
	},

	request : {
		check : "请求状态未初始化，检查服务器连接！"
	},

	opt : {
		warning : "警告",
		form : "表单",
		table : "表格",
		the : "第",
		line : "行:",
		lineThe : "行,第",
		column : "列:",
		required : "为必填项",
		formControl : "表单控件",
		noFill : "是必填项，当前未填值。"
	},

	docserviceproxy : {
		notNull : "form 不能为空"
	},
	
	toolbar : {
		approval : "撤销已提交审批",
		submit : "提交工作项",
		via : "通过",
		startUp : "启动流程"
	},

	jQueryExt : {
		beyong : "超出指定大小!",
		nonType : "非指定文件类型!"
	},

	navigation : {
		application : "Yigo应用",
		userName : "朱文文",
		modfiyPwd : "修改密码",
		version : "版本：",
		create : "创建号：",
		companyName : "上海博科资讯股份有限公司",
		authorize : "授权于：博科资讯 ",
		overdueTime : "过期时间：",
		about : "关于Yigo"
	},

	menutree : {
		keyword : "请输入关键词..."
	}

};

export default YIUI.I18N = Object.assign(other,plug_in);