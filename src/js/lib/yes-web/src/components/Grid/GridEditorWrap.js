/*
 * @Author: gmf
 * @Date:   2016-05-24 15:10:27
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-25 10:28:54
 */

import React, {Component, PropTypes} from "react";
const GridEditorWrap = (BaseComponent, EditorView) => {
    /**
     * GridEditorWrap 负责包装需要行编辑或行新增的grid控件
     * @property {Object} style 重写根元素样式
     * @property {String} className 根元素css类名
     */
    class GridEditor extends Component {
        static contextTypes = {
            formKey: PropTypes.string,
            oid: PropTypes.string,
        }
        static childContextTypes = {
            formKey: PropTypes.string,
            oid: PropTypes.string,
            gridId: PropTypes.string,
            gridRow: PropTypes.number,
        }
        state = {
            editing: false,
            editingRow: 0,
        }

        getChildContext() {
            return {
                formKey: this.context.formKey,
                oid: this.context.oid,
                gridId: this.props.yigoid,
                gridRow: this.state.editingRow,
            };
        }

        onDetailBack() {
            this.setState({
                editing: false,
            });
        }

        onRowDetail(row) {
            this.setState({
                editing: true,
                editingRow: row,
            });
        }

        getEditView() {
            return (
                <EditorView onClose={() => this.onDetailBack()} title={this.props.title}>
                    {
                        this.props.children
                    }
                </EditorView>
            );
        }

        render() {
            let editingNode = <div></div>;
            let localStyle = {'height': '100%', 'width': '100%'};
            let style = $.extend(localStyle, this.props.style);
            if (this.state.editing) {
                editingNode = this.getEditView();
            }
            return (
                <div
                    className={this.props.className}
                    style={style}
                >
                    {editingNode}
                    <BaseComponent onRowDetail={(row) => this.onRowDetail(row)} {...this.props} />
                </div>);
        }
    }
    return GridEditor;
};
export default GridEditorWrap;
