import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>
        <h6>Name</h6>
      </label>

      <input
        placeholder='Name'
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

export default CategoryForm;
