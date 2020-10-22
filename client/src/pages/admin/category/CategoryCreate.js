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

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

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

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          type='text'
          className='form-control'
          autoFocus
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button className='btn btn-outline-primary'>Save</button>
      </div>
    </form>
  );

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
          {categoryForm()}
          <hr />
          {categories.map((category) => (
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
