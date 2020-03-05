import 'react-native';
import React from 'react';
import DatePicker from '../index';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
// import { expect } from 'chai';
/* ---------------- mock DOM ----------------*/
import { jsdom } from 'jsdom';
var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js',
};

// test('renders correctly', () => {
//     const date = new Date('Fri Jun 09 2017 17:25:01 GMT+0800 (CST)');
//     const tree = renderer.create(
//         <DatePicker
//             value={date}
//         />
//     ).toJSON();
//     expect(tree).toMatchSnapshot();
// });

// describe('DatePicker:', () => {
// /*    const date = new Date('Fri Jun 09 2017 17:25:01 GMT+0800 (CST)');
//     const wrapper = mount(
//         <DatePicker
//             value={date}
//         />
//     );
//     it('prop.value transfer success', () => {
//         expect(wrapper.props().value).toEqual(date);
//     });
//     // console.log(wrapper.prop('mode'));
//     // expect(wrapper.prop('mode')).toEqual('datetime');
//
//     it('initialize', () => {
//         const wrapper1 = mount(
//             <DatePicker
//                 date="2016-05-11"
//                 format="YYYY/MM/DD"
//                 mode="datetime"
//                 duration={400}
//                 confirmBtnText="Confirm"
//                 cancelBtnText="Cancel"
//                 iconSource={{}}
//                 customStyles={{ testStyle: 123 }}
//                 disabled
//                 showIcon={false}
//                 isOnlyDate
//             />
//         );
//         expect(wrapper1.prop('mode')).toEqual('datetime');
//         expect(wrapper1.prop('format')).toEqual('YYYY/MM/DD');
//         expect(wrapper1.prop('duration')).toEqual(400);
//         expect(wrapper1.prop('confirmBtnText')).toEqual('Confirm');
//         expect(wrapper1.prop('cancelBtnText')).toEqual('Cancel');
//         expect(wrapper1.prop('iconSource')).toEqual({});
//         expect(wrapper1.prop('customStyles')).toEqual({ testStyle: 123 });
//         expect(wrapper1.prop('showIcon')).toEqual(false);
//         expect(wrapper1.prop('disabled')).toEqual(true);
//     });
//     it('setModalVisible', () => {
//         let wrapper = shallow(<DatePicker />);
//         wrapper.setProps({ modalVisible: true });
//         // expect(wrapper.prop('modalVisible')).toBe(true);
//         expect(wrapper.state('animatedHeight')._animation._toValue).toEqual(300);
//
//     });*/
//
//     it('`mode` should respond to this.props.isOnlyDate', () => {
//         let wrapper = shallow(<DatePicker isOnlyDate />);
//         expect(wrapper.prop('mode')).toEqual('date');
//         wrapper = shallow(<DatePicker />);
//         expect(wrapper.prop('mode')).toEqual('datetime');
//
//     });
// });
test('`mode` should respond to this.props.isOnlyDate', () => {
    let wrapper = shallow(<DatePicker isOnlyDate />);
    expect(wrapper.prop('mode')).toEqual('date');
    wrapper = shallow(<DatePicker />);
    expect(wrapper.prop('mode')).toEqual('datetime');

});
test('name is DatePicker', () => {
    const wrapper = shallow(<DatePicker />);
    expect(wrapper.name()).toBe('DatePicker');
});
