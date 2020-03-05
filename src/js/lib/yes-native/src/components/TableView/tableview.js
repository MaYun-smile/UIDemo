import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import TableViewRow from './tableviewrow';
import { propTypes } from 'yes'; // eslint-disable-line

export default class TableView extends PureComponent {
    generateRows(items) {
        return items.map(item => this.generateRow(item)
        );
    }

    generateRow(item) {
        return(
            <TableViewRow
                {...item}
                key={item.metaObj.key}
            />);
    }

    render() {
        const items = this.props.controlState.get('items');
        return (<ScrollView>
            {this.generateRows(items)}
        </ScrollView>);
    }
}
TableView.propTypes = propTypes.TableView;
