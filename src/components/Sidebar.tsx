import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Routing } from '../routing';

const Sidebar = () => {
  const [path, setPath] = useState('/')
  const singerID = 1

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={`/singer/${singerID}/songs`}>Song List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;