import React,{useReducer} from 'react';
import axios from 'axios'
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from "../types";

const ContactState = (props) =>{
    const initialState = {
        contacts:[],
        current:null,
        filtered:null,
        loading:true,
        error:null
    }

    const [state,dispatch] = useReducer(contactReducer,initialState);
    //Get contacts
    const getContacts = async () => {
        try {
           const res =  await axios.get('/api/contacts')
            dispatch({
                type:GET_CONTACTS,
                payload:res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg

            })
        }
    }

    //Add contact
    const addContact = async (contact) => {
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts',contact,config)
            dispatch({
                type:ADD_CONTACT,
                payload:res.data
            })
        } catch (err) {
            console.log(err)
            dispatch({
                type: CONTACT_ERROR,
                payload: 'error'

            })
        }
    }

    //Delete contact
    const deleteContact = async(id) => {
        try {
            await axios.delete(`api/contacts/${id}`)
            dispatch({type:DELETE_CONTACT,payload:id})
        } catch (err) {
            console.log(err)
            dispatch({
                type: CONTACT_ERROR,
                payload: 'error'

            })
        }
    }
    //Update contact
    const updateContact = async (contact) =>{
        const config = {
            headers : {
                'Content-Type':'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config)
            dispatch({type:UPDATE_CONTACT,payload:res.data})
        } catch (err) {
            console.log(err)
            dispatch({
                type: CONTACT_ERROR,
                payload: 'error'

            })
        }
       
    }
    //Set current contact
    const setCurrent = (contact) =>{
        console.log(contact)
        dispatch({type:SET_CURRENT,payload:contact})
    }
    //Clear current contact
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT})
    }
    
    //Filter contacts
    const filterContacts = (text) =>{
        dispatch({type:FILTER_CONTACTS,payload:text})
    }
    //Clear filter contacts
    const clearFilter = () =>{
        dispatch({type:CLEAR_FILTER})
    }
    //Clear contacts
    const clearContacts =() =>{
        dispatch({
            type:CLEAR_CONTACTS
        })
    }
    return(
        <ContactContext.Provider 
        value={{
                contacts: state.contacts,
                current:state.current,
                filtered:state.filtered,
                error:state.error,
                loading:state.loading,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                getContacts,
                clearContacts
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState