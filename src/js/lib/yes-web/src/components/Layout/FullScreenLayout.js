import React, {Component} from "react";
class FullScreenLayout extends Component {
    render() {
        return (
            <div className="fittoparent flexbox"
            >
                {this.props.children}
            </div>
        );
    }
}
export default FullScreenLayout;
