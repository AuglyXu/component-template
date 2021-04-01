import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import SnapShot from './snapShot';

let container = null;
beforeEach(() => {
    // 创建一个 DOM 元素作为渲染目标
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    // 退出时进行清理
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('应渲染问候语', () => {
    act(() => {
        render(<SnapShot />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot(`"<span>嘿，陌生人</span>"`);

    act(() => {
        render(<SnapShot name="Jenny" />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot(`"<h1>你好，Jenny！</h1>"`);

    act(() => {
        render(<SnapShot name="Margaret" />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot(`"<h1>你好，Margaret！</h1>"`);
});
