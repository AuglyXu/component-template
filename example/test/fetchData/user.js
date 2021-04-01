// user.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function User({ id }) {
    const [user, setUser] = useState(null);

    async function fetchUserData(userId) {
        const response = await fetch(`/${userId}`);
        setUser(await response.json());
    }

    useEffect(() => {
        fetchUserData(id);
    }, [id]);

    if (!user) {
        return '加载中...';
    }

    return (
        <details>
            <summary>{user.name}</summary>
            <strong>{user.age}</strong> 岁
            <br />
            住在 {user.address}
        </details>
    );
}

User.propTypes = {
    id: PropTypes.string,
};
