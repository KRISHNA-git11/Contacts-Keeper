import React,{Fragment,useContext,useEffect} from 'react';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts,filtered,getContacts,loading} = contactContext 
    useEffect(()=>{
        getContacts()
        //eslint-disabli-next-line
    },[])
    if(contacts !== [] && contacts.length === 0 && !loading){
        return <h4>Please add a contact</h4>
    }
    else{
        return (
            <Fragment>
                {contacts !== [] && !loading ?(
                     <div>
                     {
                         filtered !== null ? filtered.map(contact=><ContactItem contact={contact} key={contact._id}/>) 
                         : contacts.map(contact=><ContactItem contact={contact} key={contact._id} />)
                     }
                     </div>
                 ) : <Spinner/>}
            </Fragment>
        )
    }  
}

export default Contacts
