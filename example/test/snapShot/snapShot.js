import React from 'react';
import PropTypes from 'prop-types';

export default function SnapShot({ name }) {
    if (name) {
        return <h1>你好，{name}！</h1>;
    }
    return <span>嘿，陌生人</span>;
}

SnapShot.propTypes = {
    name: PropTypes.string,
};
