import React from 'react';
import PropTypes from 'prop-types';

export default function Hello({ name }) {
    if (name) {
        return <h1>你好，{name}！</h1>;
    }
    return <span>嘿，陌生人</span>;
}

Hello.propTypes = {
    name: PropTypes.string,
};
