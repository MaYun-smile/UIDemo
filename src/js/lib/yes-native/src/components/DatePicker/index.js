import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { default as DatePickerOld } from 'react-native-datepicker';
/* eslint-disable no-use-before-define */
import { propTypes } from 'yes'; // eslint-disable-line

export default class DatePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.modal = this.modal.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }
    componentDidMount() {
        if (this.props.modalVisible) {
            this.datePicker.onPressDate();
        }
    }
    componentDidUpdate() {
        this.modal();
    }
    handleCloseModal() {
        if (!this.props.disabled) {
            this.props.onChangePopupState(false);
        }
    }
    modal() {
        if (this.props.modalVisible) {
            this.datePicker.onPressDate();
        } else {
            this.datePicker.onPressCancel();
        }
    }
    handleDateChange(date) {
        this.handleCloseModal();
        const dateObj = new Date(date);
        this.props.onChange(dateObj);
    }
    render() {
        return (
            <DatePickerOld
                textLoading
                style={styles.datePickerStyle}
                date={this.props.value}
                mode={this.props.isOnlyDate ? 'date' : 'datetime'}
                placeholder="选择日期"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={this.handleDateChange}
                ref={(picker) => { this.datePicker = picker; }}
                onCloseModal={this.handleCloseModal}
                onPressMask={this.handleCloseModal}
            />
        );
    }
}
const styles = StyleSheet.create({
    datePickerStyle: {
        width: 0,
        height: 0,
    },
});

DatePicker.propTypes = propTypes.DatePicker;
