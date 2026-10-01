import React from 'react';
import Header from '../Header/Header';
import LowerHeader from '../Header/LowerHeader';

import './Layout.css';

function Layout({ children }) {
  return (
    <div>
      {/* ሁለቱንም Header በአንድ Sticky Wrapper ውስጥ እናስገባቸዋለን */}
      <div className="sticky__header">
        <Header />
        <LowerHeader />
      </div>

      {/* የገጾቹ ዋና ይዘት (Landing, Results, Products, etc.) */}
      <main>{children}</main>
    </div>
  );
}

export default Layout;