import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// components
import Modal from '../../components/Modal';
import Button from '../../components/Forms/Button';
import './styles.scss';

const Admin = props => {
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('work');
    }

    return (
        <div className="admin">

        <div className="callToActions">
          <ul>
            <li key='1'>
              <Button onClick={() => toggleModal()}>
                Add new product
              </Button>
            </li>
          </ul>
        </div>
  
        <Modal {...configModal}>
            <div className="addNewProductForm">
                <form onSubmit={handleSubmit}>   
                    <h2>
                        Add new product
                    </h2>
                </form>
            </div>
        </Modal>
        </div>
    );
}

export default Admin;
