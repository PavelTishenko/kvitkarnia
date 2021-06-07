import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addProductStart, fetchProductsStart, onDeleteProductStart} from './../../redux/Products/products.actions';
// components
import Modal from '../../components/Modal';
import Button from '../../components/Forms/Button';
import FormInput from '../../components/Forms/FormInput';
import FormSelect from '../../components/Forms/FormSelect';
import LoadMore from '../../components/LoadMore';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import './styles.scss';

const mapState = ({productsData}) => ({
  products: productsData.products
});

const Admin = props => {
    const dispatch = useDispatch();
    const {products} = useSelector(mapState);
    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('bukets');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');

    const {data, queryDoc, isLastPage} = products;

    useEffect(()=>{
      dispatch(fetchProductsStart());
    },[])

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    const resetForm = () => {
      setHideModal(true);
      setProductCategory('bukets');
      setProductName('');
      setProductThumbnail('');
      setProductPrice(0);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('add new product');
      dispatch(addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice
      }));
      resetForm();
    }

    const handleLoadMore = () => {
      dispatch(fetchProductsStart(
        {
          startAfterDoc: queryDoc,
          persistProducts: data
        }
      ));
    }

    const configLoadMore = {
      onLoadMoreEvent: handleLoadMore,

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
                      {/* <span>CKEEDITOR</span>
                      <CKEditor
                        onChange={evt => setProductDesc(evt.editor.getData())}
                      /> */}

                      <br/>

                      <Button type="submit">
                        Додати
                      </Button>
                  </form>
              </div>
          </Modal>
          <div className="manageProducts">
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <th>
                      <h1>
                        Manage products
                      </h1>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <table className="results" border="0" cellPadding="10" cellSpacing="0">
                        <tbody>
                          {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                            const {
                              productName,
                              productThumbnail,
                              productPrice,
                              documentID
                            } = product;
                            return (
                              <tr key={index}>
                                <td>
                                  <img src={productThumbnail} className="thumb"/>
                                </td>
                                <td>
                                  {productName}
                                </td>
                                <td>
                                  ₴{productPrice}
                                </td>
                                <td>
                                  <Button onClick={() => dispatch(onDeleteProductStart(documentID))}>
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        
                    </td>
                  </tr>
                  <tr>
                    <td>
                        <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td>
                                      {!isLastPage && (
                                        <LoadMore {...configLoadMore}/>
                                      )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
    );
}

export default Admin;
