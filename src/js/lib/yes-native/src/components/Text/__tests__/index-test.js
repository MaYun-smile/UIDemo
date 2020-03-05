import Text from '..';
import React from 'react';
import { render } from 'enzyme';
describe('components/Text', () => {
    test('default render', () => {
        const component = render(<Text />);
        expect(component).toMatchSnapshot();
    });
});
