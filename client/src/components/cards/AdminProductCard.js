import React from 'react';
import laptop from '../../images/laptop.png';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          style={{ objectFit: 'scale-down', height: '300px' }}
          className='p-1  '
        />
      }
      actions={[
        <EditOutlined className='text-primary' />,
        <DeleteOutlined
          onClick={() => handleRemove(slug)}
          className='text-danger'
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 30)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
