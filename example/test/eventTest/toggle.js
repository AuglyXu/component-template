// toggle.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default function Toggle({ onChange }) {
    const [state, setState] = useState(false);
    return (
        <Button
            onClick={() => {
                setState((previousState) => !previousState);
                onChange(!state);
            }}
            name="togglePreview"
            type="primary"
        >
            {state === true ? 'Turn off' : 'Turn on'}
        </Button>
    );
}

Toggle.propTypes = {
    onChange: PropTypes.func,
};
