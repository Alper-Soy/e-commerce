import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../api/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { getCategories, getCategorySubs } from '../../../api/category';

const initialState = {
  title: 'Macbook Pro',
  description: 'This is the best Apple product',
  price: '20000',
  categories: [],
  category: '',
  subs: [],
  shipping: 'Yes',
  quantity: '50',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: 'White',
  brand: 'Apple',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categories = await getCategories();
    setValues({ ...values, categories: categories.data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createProduct(values, user.token);
      console.log(res.data);
      window.alert(`"${res.data.title}" is created`);
      window.location.reload();
    } catch (err) {
      console.log(err);
      // if (err.response.status === 400) toast.error(err.response.data);
      toast.error(err.response.data.err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('Clicked Category', e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        console.log('SUB OPTIONS ON CATEGORY CLICK', res);
        setSubOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        setShowSub(false);
      });
    setShowSub(true);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Product create</h4>
          <hr />

          <div className='p-3'>
            <FileUpload />
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
