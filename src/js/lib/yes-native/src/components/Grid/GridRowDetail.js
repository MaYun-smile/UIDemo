import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';
export default class DefaultGridRowDetail extends PureComponent {
    static contextTypes = {
        getOwner: PropTypes.func,
    }
    getColumns() {
        const grid = this.context.getOwner();
        if (!grid) {
            return null;
        }
        const columns = grid.getVisibleColumns();
        return columns;
    }
    render() {
        const columns = this.getColumns();
        return (
            <Layout.CellGroupLayout items={columns} />
        );
    }
}
