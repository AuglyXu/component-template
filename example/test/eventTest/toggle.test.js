// toggle.test.js

import React from 'react';
import { shallow } from 'enzyme';
// import { act } from 'react-dom/test-utils';

import Toggle from './toggle';

it('点击时更新值', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Toggle onChange={onClick} />); // 进行渲染

    expect(wrapper.find('Button').length).toBe(1);

    expect(wrapper.find('Button').prop('type')).toBe('primary');

    expect(wrapper.find('Button').text()).toBe('Turn on');

    wrapper.find('Button').simulate('click');

    expect(wrapper.find('Button').text()).toBe('Turn off');
});
