import {CALL_API} from 'redux-api-middleware';
import {push} from 'react-router-redux';

export const LOGIN_MODAL_TOGGLED = 'LOGIN_MODAL_TOGGLED'
export const LOGIN_REQUEST_SUBMITTED = 'LOGIN_REQUEST_SUBMITTED'
export const LOGIN_SUCCESS_RECIEVED = 'LOGIN_SUCCESS_RECIEVED'
export const LOGIN_FAILURE_RECIEVED = 'LOGIN_FAILURE_RECIEVED'
export const LOGOUT_REQUEST_SUBMITTED = 'LOGOUT_REQUEST_SUBMITTED'
export const CREDENTIALS_ENTERED = 'CREDENTIALS_ENTERED'
export const SENDING_REQUEST = 'SENDING_REQUEST'
export const AUTH_SET = 'AUTH_SET'

/**
 * Sets the `awaitingResponse` state, which displays a loading indicator during requests
 * @param  {boolean} awaitingResponse True means we're sending a request, false means we're not
 */
export function sendingRequest(awaitingResponse) {
    return { type: SENDING_REQUEST, awaitingResponse }
}

/**
 * Toggles login panel
 */
export function toggleLogin() {
    return {type: LOGIN_MODAL_TOGGLED}
}

/**
 * Sets the form state
 * @param  {object} loginForm          The new state of the form
 * @param  {string} loginForm.email    The new text of the email input field of the form
 * @param  {string} loginForm.password The new text of the password input field of the form
 */
export function enterCredentials(loginForm) {
    return {type: CREDENTIALS_ENTERED, loginForm}
}

/**
 * Makes a call to the {someApi} API to validate user credentials
 * @param  {object} userCredentials          The object containing username and password
 * @param  {string} userCredentials.email Username 
 * @param  {string} userCredentials.password Password
 */
export function fetchUserAuthenticationStatus(userCredentials) {
    return {
        [CALL_API]: {
            types: [
                LOGIN_REQUEST_SUBMITTED, LOGIN_SUCCESS_RECIEVED, LOGIN_FAILURE_RECIEVED
            ],
            method: 'GET',
            endpoint: `http://www.fakeresponse.com/api/?sleep=3`
        }
    }
}

export function doStuff() {
    return dispatch => {
        dispatch({
            [CALL_API]: {
                types: [
                    LOGIN_REQUEST_SUBMITTED,
                    {
                        type: LOGIN_SUCCESS_RECIEVED,
                        payload: (action, state, res) => {
                            dispatch(setAuth());
                            //dispatch(push('/dashboard'));
                        }
                    },
                    LOGIN_FAILURE_RECIEVED
                ],
                method: 'GET',
                endpoint: `http://www.fakeresponse.com/api/?sleep=3`
            }
        })
    }
}

/**
 * Tells the app we want to authenticate user
 */
export function setAuth() {
    return { type: AUTH_SET }
}

/**
 * 
 * @param  {object} userCredentials          The object containing username and password
 * @param  {string} userCredentials.username Username 
 * @param  {string} userCredentials.password Password
 */
export function authenticateUser(userCredentials) {
    return dispatch => {
        return dispatch(fetchUserAuthenticationStatus(userCredentials))
    }
}

/**
 * Tells the app we want to log out a user
 */
export function logout() {
    return { type: LOGOUT_REQUEST_SUBMITTED }
}