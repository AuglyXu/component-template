/**
 * @file 调试环境入口
 * @author 徐贤喆
 * @date 2021/03/01
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
// import { MyDemo } from 'self-component-test'

export default class MyDemo2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // buttonText: '我是按钮',
        };
    }

    render() {
        return <Button>111</Button>;
    }
}

ReactDOM.render(<MyDemo2 />, document.getElementById('app'));
