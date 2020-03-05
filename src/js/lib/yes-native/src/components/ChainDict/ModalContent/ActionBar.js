import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Toolbar, Button, Checkbox } from 'react-native-material-ui';

const styles = {
    container: {
        backgroundColor: '#FFFFFF',
    },
    leftElement: {
        color: '#000000',
    },
    centerElementContainer: {
        textAlign: 'center',
        marginLeft: 0,
    },
};

class ActionBar extends PureComponent {
    render() {
        const { handleSave, handleSelectAll, isSelectAll } = this.props;

        return (
            <View>
                <Toolbar
                    leftElement={
                        <Checkbox
                            label="全选"
                            value="selectAll"
                            checked={isSelectAll}
                            onCheck={handleSelectAll}
                        />
                    }
                    rightElement={
                        <Button
                            primary
                            text="完成"
                            onPress={handleSave}
                        />}
                    style={{
                        container: styles.container,
                        leftElement: styles.leftElement,
                        rightElement: styles.leftElement,
                        centerElement: styles.leftElement,
                    }}
                />
            </View>
        );
    }
}

export default ActionBar;
