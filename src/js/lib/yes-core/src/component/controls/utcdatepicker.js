import BaseControl from './control';
import { YIUI } from '../../YIUI-base';
import '../../YIUI-common';
import '../../YIUI-svr';
import '../../YIUI-parser';
import { regControlType } from './controlUtil';
import moment from 'moment';

const DateEditor = YIUI.extend(BaseControl, {
    init(options) {
        this.base(options);
        let format = this.getMetaObj().format;
        if (format) {
            format = format.replace(/y/gm, 'Y');
            format = format.replace(/d/gm, 'D');
            format = format.replace(/H/gm, 'h');
            this.getMetaObj().format = format;
        }
    },
    convertValue(v) {
        const metaObj = this.getMetaObj();
        const { onlyDate } = metaObj;
        let date = v;
        if (typeof v === 'string') {
            // String 分为两种一种其实是数字，一种是日期的文本形式
            if (isNaN(v)) {
                date = date.replace(/-/g, '/');
                if (__DEV__) {
                    console.log('datepicker');
                }
                date = new Date(date);
            } else {
                const dt = parseInt(v, 10);
                // date = new Date(dt);
                return dt || null;
            }
        } else if (typeof v === 'number') {
            // this.changeState(this.state.set('value', v));
            return v || null;
        } else {
            if (v) {
                date = new Date(v);
            }
        }
        let parseFormat = 'YYYYMMDD';
        if (!onlyDate) {
            parseFormat = 'YYYYMMDDHHmmss';
        }
        const result = moment(date).format(parseFormat);
        return result;
    },
    // setInnerValue(v) {
    //     const metaObj = this.getMetaObj();
    //     const { onlyDate } = metaObj;
    //     let date = v;
    //     if (typeof v === 'string') {
    //         // String 分为两种一种其实是数字，一种是日期的文本形式
    //         if (isNaN(v)) {
    //             date = date.replace(/-/g, '/');
    //             if (__DEV__) {
    //                 console.log('datepicker');
    //             }
    //             date = new Date(date);
    //         } else {
    //             const dt = parseInt(v, 10);
    //             date = new Date(dt);
    //         }
    //     } else if (typeof v === 'number') {
    //         this.changeState(this.state.set('value', v));
    //         return;
    //     } else {
    //         if (v) {
    //             date = new Date(v);
    //         }
    //     }
    //     let parseFormat = 'YYYYMMDD';
    //     if (!onlyDate) {
    //         parseFormat = 'YYYYMMDDHHmmss';
    //     }
    //     const result = moment(date).format(parseFormat);
    //     const state = this.state.set('value', parseInt(result, 10));
    //     this.changeState(state);
    // },
    calculateDisplayValue: async function (v) { // eslint-disable-line object-shorthand
        const metaObj = this.getMetaObj();
        const { onlyDate } = metaObj;
        const propFormat = metaObj.format;
        let text = '';
        if (!v) {
            return '';
            // v = new Date();
        }
        // let date = v;

        // if (v instanceof String) {
        //     // String 分为两种一种其实是数字，一种是日期的文本形式
        //     const dt = parseInt(v, 10);
        //     if (isNaN(dt)) {
        //         date = new Date(v);
        //     } else {
        //         date = new Date(dt);
        //     }
        // } else {
        //     date = new Date(v);
        // }
        // default format
        let format = 'YYYY-MM-DD';
        if (!onlyDate) {
            format = 'YYYY-MM-DD HH:mm:ss';
        }
        let parseFormat = 'YYYYMMDD';
        if (!onlyDate) {
            parseFormat = 'YYYYMMDDHHmmss';
        }
        const date = moment('' + v, parseFormat);
        // props format
        if (propFormat) {
            format = propFormat;
        }
        text = date.format(format);
        return text;
    },

});
YIUI.reg('utcdatepicker', DateEditor);
regControlType(YIUI.CONTROLTYPE.UTCDATEPICKER, 'utcdatepicker');
export default DateEditor;
