import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const Domain = process.env.Auth0_Domain;
const ClientId = process.env.Auth0_Client_Id;


ReactDOM.render(
    <Auth0Provider 
        domain = {Domain}
        clientId = {ClientId}
        redirectUri = {window.location.origin}>
        <App/> 
    </Auth0Provider>, 
    document.getElementById('root') 
);