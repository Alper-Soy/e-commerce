import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../api/category';
import { getSub, updateSub } from '../../../api/sub';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadCategories();
    // loadSub();
    getSub(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });
  }, [slug]);

  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories.data);
  };

  // const loadSub = async () => {
  //   const sub = await getSub(slug);
  //   setName(sub.data.name);
  //   setParent(sub.data.parent);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await updateSub(slug, { name, parent }, user.token);
      setLoading(false);
      setName('');
      toast.success(`"${res.data.name}" is updated`);
      history.push('/admin/sub');
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

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
            <h4>Update Sub Category</h4>
          )}

          <div className='form-group'>
            <label>
              <h6>Parent category</h6>
            </label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option
                    key={c._id}
                    value={c._id}
                    // selected={c._id === parent}
                    selected
                  >
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
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
