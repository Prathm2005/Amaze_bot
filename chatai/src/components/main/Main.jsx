import React, { useContext, useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { context } from '../../context/context';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(context);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const loadthepage = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (isFirstOpen) {
      const timer = setTimeout(() => {
        setIsFirstOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFirstOpen]);

  const handleSearch = () => {
    if (input) {
      onSent(input);
    }
  };



  const handleUnauthorizedAction = () => {
    alert("Please login to use this feature!");
  };

  const handleCardClick = (text, isSignedIn) => {
    if (!isSignedIn) {
      handleUnauthorizedAction();
    } else {
      setInput(text);
      handleSearch();
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <div className={`main ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className='nav'>
      <p
    style={{
      background: "linear-gradient(16deg, #4b90ff, #ff5546)", 
      WebkitBackgroundClip: "text", 
      WebkitTextFillColor: "transparent", 
      backgroundClip: "text", 
      cursor: 'pointer',
    }}
    onClick={loadthepage}
  >
    AmazeBot
  </p>
  <div className='icon-container'>
    <FontAwesomeIcon onClick={toggleTheme} icon={isDarkTheme ? faSun : faMoon} />
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton>
        <FontAwesomeIcon icon={faUser} size="1x" />
      </SignInButton>
    </SignedOut>
  </div>
</div>


      <div className={`intro ${isFirstOpen ? 'show' : 'hide'}`}>
        <img src={assets.user_icon} alt="Logo" />
        <p>Welcome to AmazeBot!</p>
      </div>

      <div className='main-container'>
        {!showResult ? (
          <>
            <div className="great">
              <p><span>Hello, Buddy..</span></p>
              <p>How Can I Help You...</p>
            </div>
            <div className="cards">
              <SignedIn>
                <div onClick={() => handleCardClick('How AI transforms industries and job markets.', true)} className="card">
                  <p>How AI transforms industries and job markets.</p>
                  <img src={assets.compass_icon} alt="Compass Icon" />
                </div>
                <div onClick={() => handleCardClick('How renewable energy reduces carbon emissions.', true)} className="card">
                  <p>How renewable energy reduces carbon emissions.</p>
                  <img src={assets.bulb_icon} alt="Bulb Icon" />
                </div>
              </SignedIn>

              <SignedOut>
                <div onClick={() => handleCardClick('How AI transforms industries and job markets.', false)} className="card">
                  <p>How AI transforms industries and job markets.</p>
                  <img src={assets.compass_icon} alt="Compass Icon" />
                </div>
                <div onClick={() => handleCardClick('How renewable energy reduces carbon emissions.', false)} className="card">
                  <p>How renewable energy reduces carbon emissions.</p>
                  <img src={assets.bulb_icon} alt="Bulb Icon" />
                </div>
              </SignedOut>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img style={{ height: 90, width: 100, borderRadius: 50, cursor: 'pointer' }} src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className='Result-data'>
              <img style={{ height: 40 }} src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <SignedIn>
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder='Write your text'
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img
                  onClick={handleSearch}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              </div>
            </div>
          </SignedIn>
          <div className='bottom-text'>
            <p>© 2024 AmazeBot Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
