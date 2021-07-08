import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contacts/contactContext'

const ContactItem = ({contact}) => {
    const {_id,name,email,phone,type} = contact;
    const contactContext = useContext(ContactContext)
    const {deleteContact,setCurrent,clearCurrent} = contactContext
    const onDelete = () =>{
        deleteContact(_id);
        clearCurrent()
    }
    const editContact =()=>{
        console.log('hey')
        setCurrent(contact)
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name} {' '} <span style={{float:'right'}} className={'badge ' + (type==='Professional'?'badge-success':'badge-primary')}>{type}</span>
            </h3>
            <ul className="list">
                {email && <li>
                    <i className="fas fa-envelope-open" /> {email}
                </li>}

                {phone && <li>
                    <i className="fas fa-phone" /> {phone}
                    </li>}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={editContact}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}
ContactItem.propTypes={
    contact:PropTypes.object.isRequired
}
export default ContactItem
