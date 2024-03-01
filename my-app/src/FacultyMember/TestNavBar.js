import React, { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function TestNavBar() {
  const navRef = useRef();
  
const showNabar = () =>{
    navRef.current.ClassList.toggle("responsive_nav")
}
  return (
    <header>
      <h3>Logo</h3>
      <nav ref={navRef}>
        <a href="#/">Home</a>
        <a href="#/">My work</a>
        <a href="#/">Blog</a>
        <a href="#/">About me</a>
        <button className='nav-btn nav-close-btn' onClick={showNabar}>
          <FaTimes />
        </button>
      </nav>
      <button className='nav-btn' onClick={showNabar}>
        <FaBars />
      </button>
    </header>
  );
}

export default TestNavBar;
