import React,{useState,useContext,useEffect} from 'react'
import ContactContext from '../../context/contacts/contactContext';

const ContactsForm = () => {

    const contactContext =useContext(ContactContext)
    const {addContact,current,clearCurrent,updateContact} = contactContext
    const [contact, setContact] = useState(
        {
            name:'',
            email:'',
            phone:'',
            type:'Personal'
        }
    )

    useEffect(()=>{
        if(current !== null){
            setContact(current)
        }
        else{
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'Personal'
            })
        }
    },[contactContext,current])

        const {name,email,phone,type} = contact;
        const onChange = (e) => {
            setContact({...contact,[e.target.name]:e.target.value})
        }
        const onSubmit = (e) => {
            e.preventDefault();
            if(current === null){
                addContact(contact)
            }
            else{
                updateContact(contact)
            }
            clearCurrent()
        }
        const clearCurrentv = (e) =>{
            e.preventDefault()
            clearCurrent()
        }
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current?"Edit Contact":"Add Contact"}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="text" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
            <h5>Contact type</h5>
            <input type="radio" name='type' value="Personal" checked={type==='Personal'} onChange={onChange} />Personal{' '}
            <input type="radio" name='type' value="Professional" checked={type==='Professional'} onChange={onChange} />Professional
            <div>
                <input type="submit" value={current?"Update Contact":"Add Contact"} className="btn btn-primary btn-block"/>
            </div>
            {current && <div>
                    <button className="btn btn-light btn-block" onClick={clearCurrentv}>Clear</button>
                </div>}
        </form>
    )
}

export default ContactsForm
