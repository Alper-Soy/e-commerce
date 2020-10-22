import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../api/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createCategory({ name }, user.token);
      setLoading(false);
      setName('');
      toast.success(`"${res.data.name}" is created`);
      loadCategories();
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
      
          {categories.filter(searched(keyword)).map((category) => (
            <div className='alert alert-secondary' key={category._id}>
              {category.name}
              <span
                onClick={() => handleRemove(category.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${category.slug}`}>
                <span className='btn btn-sm float-right'>
                  <EditOutlined className='text-primary' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
