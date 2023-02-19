import React, { useReducer, createContext, useContext } from 'react';

const initialRegisterState = {
    name : '',
    phone : '',
    studentNumber : '',
    password : '',
    passwordCheck : '',
    check : 0,
    show : false,
    isSubmit : false,
    login : false,
    error : null
};

function registerReducer(state, action) {
    switch(action.type) {
        case 'TOGGLE_FORM':
            return {
                ...state,
                show : !state.show
            };
        case 'REGISTER':
            return {
                ...state,
                check : 10 
            };
        case 'NEXT':
            return {
                ...state,
                check : state.check + 1
            };
        case 'PREV':
            return {
                ...state,
                check : state.check - 1
            };
        case 'MYHOME':
            return {
                ...state,
                check : 3
            };
        case 'CLOSE':
            return {
                ...state,
                name : action.name,
                phone : '',
                studentNumber : '',
                password : '',
                passwordCheck : '',
                check : 3,
                show : false,
                login : action.login,
                error : null
            };
        case 'LOGIN':
            return {
                ...state,
                login : true,
                name : action.name,
                isSubmit : action.isSubmit,
                show : true,
                check : 3,
                error : null
            };
        case 'CLEAR':
            return {
                ...state,
                name : '',
                phone : '',
                studentNumber : '',
                password : '',
                passwordCheck : '',
                check : 0,
                show : false,
                login: false,
                error : null
            };
        case 'RESULT':
            return {
                ...state,
                check : 15
            }
        case 'SUBMIT':
            return {
                ...state,
                isSubmit : true,
                check : 3
            };
        case 'CHECK':
            return {
                ...state,
                name : action.name,
                isSubmit : action.isSubmit
            };
        case 'ERROR':
            return {
                ...state,
                error : action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const RegisterStateContext = createContext();
const RegisterDispatchContext = createContext();

export function RegisterProvider({ children }) {
    const [state, dispatch] = useReducer(registerReducer, initialRegisterState);
    
    return (
        <RegisterStateContext.Provider value={state}>
            <RegisterDispatchContext.Provider value={dispatch}>
                {children}
            </RegisterDispatchContext.Provider>
        </RegisterStateContext.Provider>
    );
}

export function useRegisterState() {
    const context = useContext(RegisterStateContext);
    if(!context) {
        throw new Error('Cannot find RegisterProvider');
    }
    return context;
}

export function useRegisterDispatch() {
    const context = useContext(RegisterDispatchContext);
    if(!context) {
        throw new Error('Cannot find RegisterProvider');
    }
    return context;
}

export function useRegister() {
    return [useRegisterState(), useRegisterDispatch()];
}

