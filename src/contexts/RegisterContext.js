import React, { useReducer, createContext, useContext } from 'react';

const initialRegisterState = {
    name : '',
    phone : '',
    studentNumber : '',
    password : '',
    passwordCheck : '',
    check : 0,
    show : false,
    error : null
};

function registerReducer(state, action) {
    switch(action.type) {
        case 'TOGGLE_FORM':
            return {
                ...state,
                show : !state.show
            };
        case 'CHANGE':
            return {
                ...state,
                [action.name] : action.value
            };
        case 'NEXT':
            return {
                ...state,
                check : state.check + 1
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
                error : null
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

