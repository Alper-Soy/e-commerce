import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../api/product';
import FileUpload from '../../../components/forms/FileUpload';
import { getCategories, getCategorySubs } from '../../../api/category';
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: [
    'Apple',
    'Samsung',
    'Microsoft',
    'Lenovo',
    'ASUS',
    'Hewlett Packard',
  ],
  color: '',
  brand: '',
};

const ProductUpdate = ({ match, history }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((product) => {
        // 1 load single product
        setValues({ ...values, ...product.data });
        // 2 load single product category subs
        getCategorySubs(product.data.category._id).then((res) => {
          setSubOptions(res.data); // on first load, show default subs
        });
        // 3 prepare array of sub ids to show as default sub values in antd Select
        let arr = [];
        product.data.subs.map((s) => {
          arr.push(s._id);
        });
        console.log('ARR', arr);
        setArrayOfSubIds((prev) => arr); // required for ant design select to work
      })
      .catch();
  };

  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push('/admin/dashboard');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log('Clicked Category', e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value)
      .then((res) => {
        console.log('SUB OPTIONS ON CATEGORY CLICK', res);
        setSubOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setShowSub(false);
      });

    // if user cliks back to the original category
    //show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    //clear old sub category ids
    setArrayOfSubIds([]);
    // setShowSub(true);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          {loading ? (
            <LoadingOutlined className='text-danger h1' />
          ) : (
            <h4>Product update</h4>
          )}
          <hr />

          <div className='p-3'>
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            // showSub={showSub}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
