import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import MyModal from './components/MyModal';
import SearchModal from './components/SearchModal';

import * as S from './Nav.styled.js';

const Nav = () => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [input, setInput] = useState('');
  const [emptySubmit, setEmptySubmit] = useState(false);
  const [listStyle, setListStyle] = useState('block');
  const [myHover, setMyHover] = useState(false);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  });

  const seacrhClick = () => {
    listStyle === 'block' ? setListStyle('none') : setListStyle('block');
    if (listStyle === 'none' && input !== '') {
      navigate(`/search/${input}`);
      setInput('');
    } else if (listStyle === 'none' && input === '') {
      setEmptySubmit(true);
    }
  };

  const logoClick = () => {
    setListStyle('block');
    window.scrollTo({
      top: 0,
    });
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <S.NavStyle>
      <div className={scrollPosition < 2 ? 'nav-origin' : 'nav-change'}>
        <div className='nav-container'>
          <Link to='/' className='logo-box' onClick={logoClick}>
            {scrollPosition < 2 ? (
              <img className='logo' src='/images/logoWhite.svg' alt='logo' />
            ) : (
              <img className='logo' src='/images/logoBlue.svg' alt='logo' />
            )}
          </Link>
          <div className='nav-content'>
            <div className={classnames('search-icon-box', { 'search-icon-change': listStyle === 'none' })}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                color={scrollPosition < 2 ? '#ffffffc4' : '#525252'}
                size='lg'
                name='searchIcon'
                className='search-icon'
                onClick={seacrhClick}
              />
              <SearchModal
                scrollPosition={scrollPosition}
                setListStyle={setListStyle}
                listStyle={listStyle}
                input={input}
                setInput={setInput}
                emptySubmit={emptySubmit}
                setEmptySubmit={setEmptySubmit}
              />
            </div>

            <div style={{ display: listStyle }}>
              <ul className='navigate-list'>
                <li className='list'>
                  <Link to='nearby' className='nav-link' onClick={handleClick}>
                    내주변
                  </Link>
                </li>
                <li className='list'>
                  <Link
                    to={localStorage.getItem('token') !== null ? '/reservation-list' : '/login'}
                    className='nav-link'
                    onClick={handleClick}>
                    예약내역
                  </Link>
                </li>
                <li className='list' onClick={handleClick}>
                  <Link className='nav-link'>더보기</Link>
                </li>

                {localStorage.getItem('token') !== null ? (
                  <li className='list icon-li'>
                    <Link
                      to='/my'
                      onMouseOver={() => {
                        setMyHover(true);
                      }}
                      onMouseOut={() => {
                        setMyHover(false);
                      }}
                      className='nav-link '>
                      <img className='smile-icon' onClick={handleClick} alt='myPage' src='/images/smile_icon.png' />
                      <FontAwesomeIcon className='caret-down' icon={faCaretDown} size='xs' color='#ffff' />
                      {myHover && <MyModal setMyHover={setMyHover} onClick={handleClick} />}
                    </Link>
                  </li>
                ) : (
                  <li className='list '>
                    <Link to='/login' className='nav-link'>
                      로그인
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </S.NavStyle>
  );
};

export default Nav;
