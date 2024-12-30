import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onSubmitSuccess = (response) => {
        const { jwt_token, user_id } = response.data;
        // Store both tokens
        Cookies.set('jwt_token', jwt_token);
        Cookies.set('user_id', user_id);
        
        history.replace('/');
    };

    // ... rest of the component ...
}; 