import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// components
import Modal from '../../components/Modal';
import Button from '../../components/Forms/Button';
import FormInput from '../../components/Forms/FormInput';
import FormSelect from '../../components/Forms/FormSelect';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import './styles.scss';

const Admin = props => {
    const dispatch = useDispatch();
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');

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
                          Додати новий товар
                      </h2>
                      <FormSelect
                        label="Категорія"
                        options={[{
                          value: "bukets",
                          name: "Букети"
                        }, {
                          value: "plants",
                          name: "Рослини"
                        }]}
                        handleChange={e => setProductCategory(e.target.value)}
                      />
                      <FormInput
                        label="Ім'я"
                        type="text"
                        value={productName}
                        handleChange={e => setProductName(e.target.value)}
                      />
                      <FormInput
                        label="Зображення товару URL"
                        type="url"
                        value={productThumbnail}
                        handleChange={e => setProductThumbnail(e.target.value)}
                      />

                      <FormInput
                        label="Ціна"
                        type="number"
                        min="0.00"
                        max="10000.00"
                        step="0.01"
                        value={productPrice}
                        handleChange={e => setProductPrice(e.target.value)}
                      />
                      <CKEditor
                        onChange={evt => setProductDesc(evt.editor.getData())}
                      />

                      <br/>

                      <Button type="submit">
                        Додати
                      </Button>
                  </form>
              </div>
          </Modal>
          <div className="manageProducts">


      </div>
        </div>
    );
}

export default Admin;
