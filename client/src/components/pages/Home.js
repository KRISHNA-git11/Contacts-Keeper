import React,{useContext,useEffect} from 'react'
import Contacts from '../contacts/Contacts'
import ContactsForm from '../contacts/ContactsForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
    const authContext = useContext(AuthContext);
    const {loadUser} = authContext
    useEffect(()=>{
        loadUser()
        //eslint-disble-next-line
    },[])
    return (
        <div className='grid-2'>
            <div>
                <ContactsForm></ContactsForm>
            </div>
            <div>
                <ContactFilter></ContactFilter>
                <Contacts></Contacts>
            </div>
        </div>
    )
}

export default Home
