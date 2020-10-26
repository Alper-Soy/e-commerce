import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../api/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { getCategories, getCategorySubs } from '../../../api/category';
import { LoadingOutlined } from '@ant-design/icons';

const ProductUpdate = ({ match }) => {
  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>

        <div className='col-md-10'>
          <h4>Product update</h4>
          {JSON.stringify(slug)}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
