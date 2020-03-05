import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getMappedComponentHOC(WrappedComponent, controlMapping) {
    return class PP extends Component {

        static contextTypes = {
            getMappedComponent: PropTypes.func,
        };
        static childContextTypes = {
            getMappedComponent: PropTypes.func,
        };
        getChildContext() {
            return {
                getMappedComponent: this.getMappedComponent,
            };
        }
        getMappedComponent= (tagName) => {
            if (this.props.controlMapping && this.props.controlMapping.hasOwnProperty(tagName)) {
                return this.props.controlMapping[tagName];
            }

            if (controlMapping && controlMapping.get(tagName)) {
                return controlMapping.get(tagName);
            }

            const { getMappedComponent } = this.context;
            return getMappedComponent(tagName);
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    };
}
export default getMappedComponentHOC;
