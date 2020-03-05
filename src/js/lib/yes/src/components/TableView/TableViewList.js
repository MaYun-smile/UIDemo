/* 
 * @Author: gmf
 * @Date:   2016-11-14 16:28:05
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-12-28 10:16:16
 */



import React, {Component} from "react";
import defaultControlMapping from '../util/defaultControlMapping';
import TableViewListRowWrap from "./TableViewListRowWrap";
import FlexLayout from "../../../yes-web/components/Layout/FlexLayout";
import Flex from "../../../yes-web/components/Layout/Flex";

export default class TableViewList extends Component {
    render() {
        let comp = this.props.comp;
        if (this.props.comp.metaObj.GroupColumnKeys) {//带分组标记
            var data = this.props.controlState.get('data');
            let GroupView = this.props.comp.layout
            return <div>
                { data.map((groupData, groupKey) => {
                    let GroupComp = defaultControlMapping.get(comp.groupView.tagName);
                    let NewGroupComp = TableViewListRowWrap(GroupComp, comp.metaObj.key, [groupKey, 0], true);
                    let DetailComp = defaultControlMapping.get(comp.detailView.tagName);
                    let NewDetailComp = TableViewListRowWrap(DetailComp, comp.metaObj.key, [groupKey, 0], false);
                    let contentControlList = new Array();
                    for (let i = 0; i < groupData.size / comp.metaObj.ColumnCount; i++) {
                        let flexs = new Array();
                        for (let j = 0; j < comp.metaObj.ColumnCount; j++) {
                            let idx = i * comp.metaObj.ColumnCount + j;
                            if (idx < groupData.size) {
                                flexs.push(<Flex><NewDetailComp
                                    yigoid={comp.detailView.metaObj.key}></NewDetailComp></Flex>)
                            }
                        }
                        contentControlList.push(<FlexLayout Orientation="horizontal">
                            {
                                flexs
                            }
                        </FlexLayout>)
                    }
                    return <div>
                        <div>
                            <NewGroupComp yigoid={comp.groupView.metaObj.key}></NewGroupComp>
                        </div>
                        <div>
                            {contentControlList}
                        </div>
                    </div>
                })}</div>
        } else {

        }
        return <div></div>;
    }
}