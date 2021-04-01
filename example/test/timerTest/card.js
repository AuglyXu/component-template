import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default function Card({ onSelect }) {
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            onSelect(null);
        }, 5000);
        return () => {
            clearTimeout(timeoutID);
        };
    }, [onSelect]);

    return [1, 2, 3, 4].map((choice) => (
        <Button key={choice} data-testid={choice} onClick={() => onSelect(choice)}>
            {choice}
        </Button>
    ));
}

Card.propTypes = {
    onSelect: PropTypes.func,
};
