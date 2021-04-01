/**
 * @file 发包组件代码
 * @author 徐贤喆
 * @date 2021/03/01
 */
import React from 'react';
import { Button } from 'antd';

class MyDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: '我是按钮',
        };
    }

    render() {
        const { buttonText } = this.state;
        return <Button>{buttonText}</Button>;
    }
}

export { MyDemo };
