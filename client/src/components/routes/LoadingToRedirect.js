import React, { useEffect, useState } from 'react';
import { useHistory, userHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push('/');

    //cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className='container p-5 text-primary text-center'>
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
