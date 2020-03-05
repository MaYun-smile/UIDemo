/**
 * 所有组件的基础类。
 */
import { YIUI } from '../YIUI-base';
import '../YIUI-common';
import '../YIUI-parser';
import '../YIUI-svr';
import { lodash as $ } from 'yes-common';
import '../yes-ui';
import './componentmgr';
import Immutable from 'immutable';
import getDispatcher from '../dispatchers';
import { PostChange as postChange } from '../actions';
import '../idGenerator';
import throttle from 'lodash/throttle';

const dispatchChange = throttle(() => setTimeout(() => getDispatcher().dispatch(postChange()), 0), 200);

export default YIUI.Component = YIUI.extend({
    /**
     * Boolean。
     * 是否可编辑。
     */
    editable: true,

    /**
     * 是否可用
     */
    enable: true,

    /**
     * Boolean。
     * 是否可见
     */
    visible: true,

    /**
     * Number。
     * 组件在面板中的位置。
     */
    /** top : -1, */
    /** left : -1, */

    /**
     * Number、百分比、auto。
     * 组件的宽度、高度。
     * Number: 像素值，固定大小；
     * 百分比: 相对于父组件的宽度、高度；
     * auto: 自适应大小。
     */
    // width: -1,
    // height: -1,

    /**
     * String。
     * 鼠标悬停时，显示的提示信息。
     */
    /** tip : null, */

    /**
     * Boolean。
     * 该组件是否必填。
     */
    required: false,

    /**
     * Object。
     * 组件上的CSS样式。
     * 例： format : {
	 * 		foreColor : 'red',
	 * 		backColor : 'blue',
	 * 		fontName : 'Arial',
	 * 		fontSize : '12px',
	 * 		bold : true,
	 * 		italic : false,
	 * 		border : '1px',
	 * 		borderStyle : 'solid',
	 * 		borderColor : '#000000',
	 * 		align : 'center'
	 * }
     */
    format: null,

    /**
     * String。
     * 组件的位置，仅在BorderLayout中有效。
     * 取值：top、bottom、left、right、center。
     */
    /** region : null, */

    /**
     * Number。
     * 仅在GridLayout中有效，组件在网格中的第几列、第几行、占几列、占几行。
     */
    /** x : -1, */
    /** y : -1, */
    /** colspan : -1, */
    /** rowspan : -1, */

    /**
     * Object。
     * 组件触发事件时的回调方法。
     *  new YIUI.TextEditor({
	 * 		listeners : {
	 * 			change : function(event) {
	 * 				// 这里的this是当前的TextEditor
	 * 			},
	 * 			keydown : {
	 * 				fn : function(event) {
	 * 					// 这里的this是由scope指定的
	 * 				},
	 * 				scope : scope
	 * 			}
	 * 		}
	 *  });
     */
    listeners: null,

    error: null,
    errorInfo: {},
    /** 触发事件
     *  在组件作为TabPanel面板的子项时，如果子项被选中，触发该事件。
     *  */
    active: null,

    /** 伙伴组件的标识 */
    buddyKey: null,

    /** 是否是伙伴组件*/
    buddy: false,

    needRender: false,

    /**
     * 初始化方法，此方法由组件构造函数默认调用。
     * @param options 传入属性设置，格式为json : {key : key, caption : caption,...}
     */
    init(options) {
        $.extend(this, options);

        var meta = this.getMetaObj();
        if (meta) {
            this.key = this.key || meta.key;
            this.buddyKey = meta.buddyKey || '';
            this.type = this.type || meta.type;
            this.caption = meta.caption || this.caption || '';
            this.required = this.required || meta.required;
            this.validation = meta.validation || '';
            this.valueChanged = meta.valueChanged || '';
            this.valueChanging = meta.valueChanging || '';
            this.defaultFormulaValue = meta.defaultFormulaValue || '';
            this.columnKey = meta.columnKey || this.columnKey || '';
            this.tableKey = meta.tableKey || '';
            this.bindingCellKey = meta.bindingCellKey || '';
            this.isSubDetail = meta.isSubDetail || false;
            this.parentGridKey = meta.parentGridKey || '';
            this.active = meta.active || '';
            this.condition = meta.condition || null;
        }

        // 如果id未定义，动态生成个id
        this.getId();

        // 注册控件，以id为唯一标识
        // YIUI.ComponentMgr.register(this);

        // 所有注册的事件监听。
        // this.events = this.events || {};

        // 把listens注册到events中
        // if (this.listeners) {
        //     this.addListener(this.listeners);
        //     delete this.listeners;
        // }
        this.state = Immutable.fromJS({
            visible: this.visible,
            editable: this.editable,
            enable: this.enable,
            value: this.value,
            displayValue: null,
            required: this.required,
            loading: false,
        });
    },
    
    getState() {
        return this.state;
    },

    setMetaObj(metaObj) {
        this.metaObj = (metaObj == null ? {} : metaObj);
    },

    getMetaObj() {
        return this.metaObj || {};
    },

    getOrgMetaObj() {
        return this.orgMetaObj;
    },

    setOnActive(onActive) {
        // this.onActive = onActive;
    },

    isOnActive() {
        // return $.isUndefined(this.onActive) ? false : this.onActive;
    },

    hasDataBinding() {
        return this.tableKey && this.columnKey;
    },

    getCommonProps() {
        const result = {};
        if (this.height) {
            if (typeof (this.height) === 'number' && this.height > 0) {
                result.height = this.height;
            }
        }
        if (this.width) {
            if (typeof (this.width) === 'number' && this.width > 0) {
                result.width = this.width;
            }
        }
        // if(this.weight){
        let weight = this.weight || 1;
        result.flex = weight;
        // }
        return result;
    },

    /**
     * 设置组件宽度。
     * @param width：Number类型。
     */
    setWidth(width) {
        if (!width || !$.isNumeric(width) || width <= 0)
            return;

        if (!this.rendered) {
            this.width = width;
            return;
        }

        var lastSize = this.lastSize;
        if (lastSize.width !== width) {
            lastSize.width = width;
            this.onSetWidth(width);
        }
    },

    // private 默认的设置组件宽度方法，如果组件有自定义设置宽度方法，可在子组件重写此方法。
    onSetWidth(width) {
        // this.el.css("width", width);
    },

    /**
     * 获取组件宽度。
     * @return Number。
     */
    getWidth() {
        // if (this.rendered) {
        //     return this.getOuterEl().outerWidth();
        // }
        return this.width;
    },

    /**
     * 设置组件高度。
     * @param height：Number。
     */
    setHeight(height) {
        // if (!height || !$.isNumeric(height) || height <= 0)
        //     return;

        // if (!this.rendered) {
        //     this.height = height;
        //     return;
        // }

        // var lastSize = this.lastSize;
        // if (lastSize.height !== height) {
        //     lastSize.height = height;
        //     this.onSetHeight(height);
        // }
    },

    // private 默认的设置组件高度方法，如果组件有自定义设置高度方法，可在子组件重写此方法。
    onSetHeight(height) {
        // this.el.css("height", height);
    },

    /**
     * 获取组件高度。
     * @return Number。
     */
    getHeight() {
        // if (this.rendered) {
        //     return this.getOuterEl().outerHeight();
        // }
        return this.height;
    },

    // private 获取除去padding和border的宽度
    getInnerWidth() {
        // return this.el.width();
    },

    // private 获取除去padding和border的高度
    getInnerHeight() {
        // return this.el.height();
    },

    /**
     * 设置水平方向位置。
     * @param left：Number。
     */
    setLeft(left) {
        // if (!left || !$.isNumeric(left) || left <= 0)
        //     return;

        // var lastPosition = this.lastPosition;
        // if (lastPosition.left !== left) {
        //     lastPosition.left = left;
        //     if (this.rendered) {
        //         this.el.css('position', 'absolute');
        //         this.onSetLeft(left);
        //     } else {
        //         this.left = left;
        //     }
        // }
    },

    // private 默认的设置组件位置方法，如果组件有自定义设置位置方法，可在子组件重写此方法。
    onSetLeft(left) {
        // this.el.css("left", left);
    },

    /**
     * 设置竖直方向位置。
     * @param top：Number。
     */
    setTop(top) {
        // if ((!top && top != 0) || top == 'auto')
        //     return;

        // var lastPosition = this.lastPosition;
        // if (lastPosition.top !== top) {
        //     lastPosition.top = top;
        //     if (this.rendered) {
        //         this.el.css('position', 'absolute');
        //         this.onSetTop(top);
        //     } else {
        //         this.top = top;
        //     }
        // }
    },

    // private 默认的设置组件位置方法，如果组件有自定义设置位置方法，可在子组件重写此方法。
    onSetTop(top) {
        // this.el.css("top", top);
    },

    setPadding(padding) {
        // this.el.css("padding", padding);
    },

    setLeftPadding(leftPadding) {
        // this.el.css("padding-left", leftPadding);
    },

    setRightPadding(rightPadding) {
        // this.el.css("padding-right", rightPadding);
    },

    setTopPadding(topPadding) {
        // this.el.css("padding-top", topPadding);
    },

    setBottomPadding(bottomPadding) {
        // this.el.css("padding-bottom", bottomPadding);
    },

    setMargin(margin) {
        // this.el.css("margin", margin);
    },

    setLeftMargin(leftMargin) {
        // this.el.css("margin-left", leftMargin);
    },

    setRightMargin(rightMargin) {
        // this.el.css("margin-right", rightMargin);
    },

    setTopMargin(topMargin) {
        // this.el.css("margin-top", topMargin);
    },

    setBottomMargin(bottomMargin) {
        // this.el.css("margin-bottom", bottomMargin);
    },

    setBorderColor(borderColor) {
        // this.el.css("border-color", borderColor);
    },

    setBorderRadius(borderRadius) {
        // this.el.css("border-radius", borderRadius);
    },

    setVAlign(vAlign) {
        this.vAlign = vAlign;
        // switch (this.vAlign) {
        //     case YIUI.HAlignment.TOP:
        //         this.el.css("vertical-align", "top");
        //         break;
        //     case YIUI.VAlignment.CENTER:
        //         this.el.css("vertical-align", "middle");
        //         break;
        //     case YIUI.VAlignment.BOTTOM:
        //         this.el.css("vertical-align", "bottom");
        //         break;
        // }
    },
    setHAlign(hAlign) {
        this.hAlign = hAlign;
        //    	switch(this.hAlign) {
        //	    	case YIUI.HAlignment.LEFT:
        //		    	this.el.css("float", "left");
        //				break;
        //	    	case YIUI.VAlignment.CENTER:
        //		    	this.el.css("margin", "auto auto");
        //		    	break;
        //	    	case YIUI.VAlignment.RIGHT:
        //		    	this.el.css("float", "right");
        //		    	break;
        //		}
    },

    /**
     * 返回控件id，如果id未定义，则给组件自动生成一个唯一id。
     * @return String。
     */
    getId() {
        if (this.ofFormID) {
            return this.id || (this.id = this.ofFormID + '_' + this.key);
        } else {
            return this.id || YIUI.allotId();
        }
    },

    setColumnKey(columnKey) {
        this.columnKey = columnKey;
    },

    setTableKey(tableKey) {
        this.tableKey = tableKey;
    },

    setDefaultFormulaValue(defaultFormulaValue) {
        this.defaultFormulaValue = defaultFormulaValue;
    },

    getColumnKey() {
        return this.columnKey;
    },

    getTableKey() {
        return this.tableKey;
    },

    getDefaultFormulaValue() {
        return this.defaultFormulaValue;
    },

    dependedValueChange: $.noop,

    /**
     * 设置控件是否可编辑。
     * @param editable：Boolean。
     */
    setEditable(editable, fire = true) {
        this.editable = editable;
        const state = this.state.set('editable', editable);
        this.changeState(state, fire);
    },

    getFormatEl() {
        // return this.el;
    },

    /**
     * 设置控件是否可用。
     */
    setEnable(enable, fire = true) {
        this.enable = enable;
        const state = this.state.set('enable', enable);
        this.changeState(state, fire);
        // var outerEl = this.getOuterEl();
        // if(!outerEl || outerEl.length == 0) return false;
        // var el = this.getFormatEl();
        // if (this.enable) {
        //     el.removeAttr('readonly');
        //     outerEl.removeClass("ui-readonly");
        // } else {
        //     el.attr('readonly', 'readonly');
        //     outerEl.addClass("ui-readonly");
        // }
    },
    setFocusManager(focusManager) {
        // this.focusManager = focusManager;
    },
    setTabIndex(tabIndex) {
        this.tabIndex = tabIndex;
    },
    getTabIndex() {
        return this.tabIndex;
    },

    /**
     * 控件是否可编辑。
     * @return Boolean。
     */
    isEditable() {
        // return this.editable;
        this.state.get('editable');
    },

    /**
     * 控件是否可用。
     * @return Boolean。
     */
    isEnable() {
        // return this.enable;
        return this.state.get('enable');
    },

    /**
     * 设置控件是否可见。
     * @param visible：Boolean。
     */
    setVisible(visible, fire = true) {
        this.visible = visible;
        const state = this.state.set('visible', visible);
        this.changeState(state, fire);
        // var ownerCt = this.ownerCt;
        // if (ownerCt) {
        //     ownerCt.reduceVisible(visible, this);
        // }
        // var outerEl = this.getOuterEl();
        // if(!outerEl) return;
        // if (this.buddyKey) {
        //     var form = YIUI.FormStack.getForm(this.ofFormID);
        //     var buddyComp = form.getComponent(this.buddyKey);
        //     if(buddyComp) {
        //     	if(buddyComp.rendered) {
        //     		buddyComp.setVisible(visible);
        //     	} else {
        //     		buddyComp.visible = visible;
        //     	}
        //     }
        // }
        // if (this.visible) {
        //     outerEl.removeClass('ui-hidden');
        // } else {
        //     outerEl.addClass('ui-hidden');
        // }
    },

    isPanel() {
        return this.isPanel;
    },

    /**
     * 控件是否可见。
     * @return Boolean。
     */
    isVisible() {
        return this.visible;
    },

    /**
     * 设置鼠标悬停时显示的提示信息。
     * @param tip String，显示的文本。
     */
    setTip(tip) {
        if (this.tip) {
            tip = this.tip;
        }
        // this.el && this.el.attr("title", tip);
    },

    /**
     * 返回使用的jQueryUI对象的dom。
     * @return jQuery。
     */
    getEl() {
        // return this.el;
    },

    /**
     * 返回控件最外层dom，有些控件的最外层dom和getEl()不同，比如grid。
     * @return jQuery。
     */
    getOuterEl() {
        // return this.getEl();
    },

    /**
     * 用于控制在刷新界面时,是否需要清空值
     * @return
     */
    needClean() {
        var meta = this.getMetaObj();
        if (!meta) {
            return false;
        }

        var controlType = meta.type;

        if (controlType == YIUI.CONTROLTYPE.LABEL
            || controlType == YIUI.CONTROLTYPE.BUTTON
            || controlType == YIUI.CONTROLTYPE.HYPERLINK) {
            return false;
        }

        if (!meta.condition) {
            return meta.clearable != false;
        }

        return false;
    },

    /**
     * 把控件渲染到container中
     * @param container：jQuery，当前控件的父节点。
     */
    render(container) {
        // this.doRender(container);
        // if (this.hasLayout) {
        //     var panelWidth, panelHeight,
        //         parentWidth = this.container.width(),
        //         parentHeight = this.container.height();
        //     if (this.width == -1) {
        //         panelWidth = $.getReal("100%", parentWidth);
        //     } else {
        //         panelWidth = $.getReal(this.width, parentWidth);
        //     }
        //     if (this.height == -1) {
        //         panelHeight = $.getReal("100%", parentHeight);
        //     } else {
        //         panelHeight = $.getReal(this.height, parentHeight);
        //     }
        //     this.doLayout(panelWidth, panelHeight);
        // }
    },

    doRender(container) {
        // if (this.needRender && !this.rendered && this.beforeRender() !== false) {
        //     this.rendered = true;
        //     this.container = container ? $(container)
        //         : (this.container ? $(this.container) : $.getBody());
        //     this.onRender(this.container);
        //     this.onRenderChildren();
        //     this.afterRender();
        //     this.install();
        // }
    },

    /**
     * 控件渲染前所做准备。
     */
    beforeRender: $.noop,

    setError(error, msg) {
        this.errorInfo = { error, msg };
        // var el = this.getEl(),
        //     outerEl = this.el;
        // if(!el) return;
        // if (this.errorInfo.error) {
        //     outerEl.addClass('ui-error');
        //     $('<span class="error-icon" />').attr("title", msg).appendTo(outerEl);
        // } else {
        //     outerEl.removeClass('ui-error');
        //     $(".error-icon", outerEl).remove();
        // }
    },

    isError() {
        return this.errorInfo.error;
    },

    getErrorMsg() {
        return this.errorInfo.msg;
    },

    /**
     * 控件渲染到界面，不包含items的渲染。
     */
    onRender(ct) {
        // var el = this.el;

        // // 如果未定义ct，且组件el已定义，取ct为el的parentNode
        // if (el && (!ct || ct.length == 0)) {
        //     this.container = ct = $(el).parent();
        // }
        // if (!el && this.autoEl) {
        //     if ($.isString(this.autoEl)) {
        //         el = $(this.autoEl);
        //     }
        // }
        // if (el) {
        //     if (!el.attr('id')) {
        //         el.attr('id', this.getId());
        //     }
        //     this.el = $(el);
        //     // 如果发现el已经在DOM树中，不再进行插入
        //     if (this.el.parents('body')[0] != $.getBody()[0]) {
        //         ct.append(this.el);
        //     }
        // }
        // if (this.errorInfo) {
        //     this.setError(this.errorInfo.error, this.errorInfo.msg);
        // }
        // this.setColumnKey(this.columnKey);
        // this.setTableKey(this.tableKey);
        // if (this.defaultFormulaValue) {
        //     this.setDefaultFormulaValue(this.defaultFormulaValue);
        // }
        // this.setKey(this.key);
    },

    onRenderChildren: $.noop,
    /**
     * 重新布局组件
     */
    doLayout: $.noop,

    setKey(key) {
        this.key = key;
    },
    /**
     * 设置背景色
     */
    setBackColor(backColor) {
        this.backColor = backColor;
        // this.getEl().css({
        //     'background-image': 'none',
        //     'background-color': backColor
        // });
    },

    /**
     * 设置前景色
     */
    setForeColor(foreColor) {
        this.foreColor = foreColor;
        // this.getEl().css('color', foreColor);
    },

    /**
     * 设置组件显示样式。
     * @param style Object，参考style属性说明。
     */
    setStyle(style) {
        // var cssStyle = {};
        // if(style.vAlign > -1) {
        // 	cssStyle['vertical-align'] = YIUI.VAlignment.parse(style.vAlign);
        // 	cssStyle['line-height'] = "normal";
        // }
        // (style.hAlign > -1) && (cssStyle['text-align'] = YIUI.HAlignment.parse(style.hAlign));
        // var font = style.font;
        // if (font) {
        // 	font.name && (cssStyle['font-family'] = font.name);
        // 	font.size && (cssStyle['font-size'] = font.size);
        // 	font.bold && (cssStyle['font-weight'] = 'bold');
        // 	font.italic && (cssStyle['font-style'] = 'italic');
        // }
        // this.setFormatStyle(cssStyle);
    },

    setFormatStyle(cssStyle) {
        // this.getEl().css(cssStyle);
    },

    /**
     * 设置为必填。
     */
    setRequired(required) {
        this.required = required;
        const state = this.state.set('required', required);
        this.changeState(state);
        // var el = this.getOuterEl();
        // if(!el) return;
        // if (required) {
        // 	el.addClass('ui-required');
        // } else {
        // 	el.removeClass('ui-required');
        // }
    },

    isRequired() {
        // return this.required;
        return this.state.get('required');
    },

    setCssClass(cssClass) {
        // this.el.addClass(cssClass);
    },

    /**
     * 控件渲染后所做操作，默认为设置el大小位置，并注册监听事件；对于Panel，还需进行layout。
     */
    afterRender() {
        // this.required &&this.setRequired(this.isNull());
        // (this.enable != undefined) && this.setEnable(this.enable);
        // (this.editable != undefined) && this.setEditable(this.editable);
        // (this.visible != undefined) && this.setVisible(this.visible);

        // this.backColor && this.setBackColor(this.backColor);
        // this.foreColor && this.setForeColor(this.foreColor);
        // this.format && this.setStyle(this.format);
        // this.setTip(this.tip);

        // this.cssClass && this.setCssClass(this.cssClass);
        // this.padding && this.setPadding(this.padding);
        // this.leftPadding && this.setLeftPadding(this.leftPadding);
        // this.rightPadding && this.setRightPadding(this.rightPadding);
        // this.topPadding && this.setTopPadding(this.topPadding);
        // this.bottomPadding && this.setBottomPadding(this.bottomPadding);

        // this.setLeft(this.left);
        // this.setTop(this.top);

        // this.borderColor && this.setBorderColor(this.borderColor);
        // this.borderRadius && this.setBorderRadius(this.borderRadius);

        // this.vAlign && this.setVAlign(this.vAlign);
        // this.hAlign && this.setHAlign(this.hAlign);
    },

    setBox() {
        // var ownerCt = this.ownerCt, parentWidth, parentHeight;

        // if (ownerCt) {
        //     if ((ownerCt.type == YIUI.CONTROLTYPE.TABPANEL && ownerCt.items.length >= 1) ||
        //         (ownerCt.tagName == "tabcontainer" && ownerCt.items.length >= 1) || ownerCt.items.length == 1) {
        //         if (this.width == -1) {
        //             this.width = '100%';
        //         }
        //         if (this.height == -1) {
        //             this.height = '100%';
        //         }
        //     }
        // }

        // if (ownerCt) {
        //     // 这里需要用减去layout占位符的宽度高度
        //     parentWidth = ownerCt.getValidWidth();
        //     parentHeight = ownerCt.getValidHeight();
        //     this.setWidth($.getReal(this.width, parentWidth));
        //     this.setHeight($.getReal(this.height, parentHeight));
        // } else {
        //     var parent = this.el.parent();
        //     parentWidth = parent.width();
        //     parentHeight = parent.height();
        //     this.setWidth(this.width);
        //     this.setHeight(this.height);
        // }
    },

    focus() {
        // this.el.focus();
    },

    needTip() {
        return true;
    },

    getShowText() {
        return this.caption;
    },

    calculateDisplayValue(v) {
        return v ? v.toString() : '';
    },
    /**
     * 给DOM添加事件监听。
     */
    install() {
        // var self = this;
    },

    /**
     * 给组件添加事件监听。
     * @param ename String或Object。
     *              String：事件名称，这里不是DOM上的事件名称，而是组件自定义的；
     *              Object：形如：{change : {fn:fn, scope:scope}}。
     * @param fn Function，事件触发时的回调函数。
     * @param scope Object，可选的，调用fn时的作用域。
     */
    addListener(ename, fn, scope) {
        // if ($.isObject(ename)) {
        //     var listeners = ename, listener;
        //     for (var e in listeners) {
        //         listener = listeners[e];
        //         this.addListener(e, listener.fn || listener, listener.scope);
        //     }
        // } else {
        //     var event = this.events[ename] = this.events[ename]
        //         || new YIUI.Event(ename, this);
        //     event.addListener(fn, scope);
        // }
    },

    /**
     * 触发组件上注册的所有ename指定的事件监听方法。
     * @param ename String，事件名称，这里不是DOM上的事件名称，而是组件自定义的。
     */
    fireEvent(ename) {
        // var event = this.events[ename];
        // if (event) {
        //     var args = $.makeArray(arguments);
        //     args.shift();
        //     event.fire.apply(event, args);
        // }
    },

    /**
     * 给DOM添加事件监听。
     * @param selector String，把事件监听添加到el中的
     * 哪个子DOM上。
     * @param ename String，事件名称，这里是DOM上的事件名称。
     * @param fn Function 事件监听方法。
     * @param scope 调用回调方法的作用域。
     */
    bind(selector, ename, fn, scope) {
        // scope = scope || this;
        // var dom = selector ? $(selector, this.el) : this.el;
        // dom.bind(ename, function (event) {
        //     fn ? fn.call(scope, event) : scope.fireEvent(ename, event);
        // });
    },

    /**
     * 销毁控件，防止内存泄露。
     */
    destroy() {
        if (this.isDestroyed)
            return;
        if (this.beforeDestroy() !== false) {
            // 如果已经渲染过，先删除已经注册的listeners，然后删除DOM
            // if (this.rendered) {
            //     this.el.destroy();
            //     delete this.el;
            //     delete this.listeners;
            // }

            // 取消注册控件
            // YIUI.ComponentMgr.unregister(this);
            this.state = null;

            this.afterDestroy();

            this.isDestroyed = true;
        }
    },

    beforeDestroy: $.noop,

    getNoTabOrderComps: $.noop,

    /**
     * 解除自身所有属性的引用
     */
    afterDestroy() {
        for (var prop in this) {
            if (this.hasOwnProperty(prop)) {
                delete this[prop];
            }
        }
    },
    changeState(state, trigger = true) {
        if (state === this.state) {
            return;
        }
        this.state = state;
        if (trigger) {
            dispatchChange();
            // setTimeout(() => getDispatcher().dispatch(postChange()), 0);
        }
    },
});
YIUI.reg('component', YIUI.Component);

// // 封装添加到组件上的事件监听
// YIUI.Event = function (name, owner) {
//     this.name = name;
//     this.owner = owner;

//     this.listeners = [];
// };
// YIUI.Event.prototype = {
//     addListener: function (fn, /*optional*/scope) {
//         var obj = {
//             fn: fn,
//             scope: scope || this.owner
//         };
//         this.listeners.push(obj);
//     },

//     removeListener: function (fn, /*optional*/scope) {
//         var index = this.indexOfListener(fn, scope);
//         if (index != -1) {
//             this.listeners.splice(index, 1);
//             return true;
//         }

//         return false;
//     },

//     indexOfListener: function (fn, /*optional*/scope) {
//         var owner = this.owner, index = -1;
//         $.each(this.listeners, function (i) {
//             if (this.fn == fn && (this.scope == scope || this.scope == owner)) {
//                 index = i;
//                 return false;
//             }
//         });
//         return index;
//     },

//     fire: function () {
//         var args = $.makeArray(arguments), owner = this.owner;
//         $.each(this.listeners, function (i) {
//             if (this.fn.apply(this.scope || window, args) === false) {
//                 return false;
//             }
//         });
//     }
// };
