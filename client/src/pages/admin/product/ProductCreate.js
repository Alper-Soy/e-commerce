import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../api/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories } from '../../../api/category';

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

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Product create</h4>
          <hr />

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
