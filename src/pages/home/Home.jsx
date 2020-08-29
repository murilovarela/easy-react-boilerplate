import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchExampleRequest } from '@Redux/example/exampleActions';

import './home.scss';

function Home() {
  const exampleList = useSelector(state => state.example.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExampleRequest());
  }, []);

  return (
    <div className="home">
      Example
      <ul>
        {exampleList.map(eg => (
          <li key={eg}>{eg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
