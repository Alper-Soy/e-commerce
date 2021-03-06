import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../api/category';
import { createSub, removeSub, getSubs } from '../../../api/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories.data);
  };

  const loadSubs = async () => {
    const subs = await getSubs();
    setSubs(subs.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createSub({ name, parent: category }, user.token);
      setLoading(false);
      setName('');
      toast.success(`"${res.data.name}" is created`);
      loadSubs();
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const handleRemove = async (slug) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
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
            <h4>Create Sub Category</h4>
          )}

          <div className='form-group'>
            <label>
              <h6
                className={
                  category && category !== 'Please select'
                    ? 'text-dark'
                    : 'text-warning'
                }
              >
                Parent category
              </h6>
            </label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {subs.filter(searched(keyword)).map((sub) => (
            <div className='alert alert-secondary' key={sub._id}>
              {sub.name}
              <span
                onClick={() => handleRemove(sub.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger lg pl-2' />
              </span>
              <Link to={`/admin/sub/${sub.slug}`}>
                <span className='btn btn-sm float-right'>
                  <EditOutlined className='text-primary pr-2' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
