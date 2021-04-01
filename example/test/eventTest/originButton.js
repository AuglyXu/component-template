// toggle.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Toggle({ onChange }) {
    const [state, setState] = useState(false);
    return (
        <button
            onClick={() => {
                setState((previousState) => !previousState);
                onChange(!state);
            }}
            data-testid="toggle"
            type="button"
        >
            {state === true ? 'Turn off' : 'Turn on'}
        </button>
    );
}

Toggle.propTypes = {
    onChange: PropTypes.func,
};
