import React from 'react';
import { storiesOf } from '@storybook/react';
import RawDate from 'yes-native/components/Date';
import controlWrapDemo from '../wraps/ControlWrapDemo';
import DatePicker from 'yes/datacontrols/datepicker';
import triggerControlWrap from '../../js/lib/yes-native/components/TriggerControlWrap';
const dateComponent = new DatePicker();
dateComponent.init({
    value: 1496905177271,
    visible: true,
    editable: true,
    enabled: true,
    metaObj: {
        isOnlyDate: true,
    },
});
const dateComponentWithFullDate = new DatePicker();
dateComponentWithFullDate.init({
    value: 1496905177271,
    visible: true,
    editable: true,
    enabled: true,
    metaObj: {
        isOnlyDate: false,
    },
});

const DateDemo = controlWrapDemo(triggerControlWrap(RawDate), dateComponent, 
    'Date with short date');
const FullDateDemo = controlWrapDemo(triggerControlWrap(RawDate), dateComponentWithFullDate, 
    'Date with full date');
storiesOf('component:Date', module)
    .add('default', () => <div><DateDemo /><FullDateDemo /></div>);
