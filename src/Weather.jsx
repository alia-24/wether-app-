import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import './index.css';

// simple animations
const moveUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gentleFloat = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulseEffect = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(14, 165, 233, 0);
  }
`;

const spinSlow = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const slideSide = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
`;

// --- Styled Components ---
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '☀️';
    position: absolute;
    font-size: 250px;
    top: -80px;
    right: -80px;
    opacity: 0.15;
    animation: ${spinSlow} 30s linear infinite;
    pointer-events: none;
  }
  
  &::after {
    content: '☁️';
    position: absolute;
    font-size: 180px;
    bottom: -60px;
    left: -60px;
    opacity: 0.12;
    animation: ${slideSide} 15s ease-in-out infinite;
    pointer-events: none;
  }
`;

const Card = styled.div`
  background: var(--card);
  backdrop-filter: blur(20px);
  border-radius: 64px;
  padding: 42px 38px;
  width: 100%;
  max-width: 480px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  position: relative;
  z-index: 1;
  animation: ${moveUp} 0.5s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 50px -20px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .logoIcon {
      font-size: 32px;
      animation: ${spinSlow} 8s linear infinite;
      display: inline-block;
    }
    
    h1 {
      font-size: 26px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent), var(--accent-2), var(--accent-3));
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      letter-spacing: -0.5px;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 16px 22px;
  border: 2px solid var(--border);
  border-radius: 60px;
  background: rgba(255, 255, 255, 0.8);
  color: var(--text);
  font-size: 15px;
  font-weight: 500;
  outline: none;
  transition: all 0.2s;
  
  &:focus {
    border-color: var(--accent-2);
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
    background: white;
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SearchBtn = styled.button`
  padding: 16px 32px;
  background: linear-gradient(135deg, var(--accent-2), var(--accent-3));
  color: white;
  border: none;
  border-radius: 60px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  animation: ${pulseEffect} 2s infinite;
  
  &:hover {
    transform: scale(1.02);
    filter: brightness(1.05);
    padding-right: 38px;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const WeatherDisplay = styled.div`
  text-align: center;
  animation: ${moveUp} 0.4s ease-out;
`;

const CityWrapper = styled.div`
  margin-bottom: 20px;
  
  h2 {
    font-size: 38px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -1px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    
    &::before {
      content: '📍';
      font-size: 24px;
      opacity: 0.7;
    }
  }
`;

const DateText = styled.p`
  color: var(--accent-3);
  font-size: 13px;
  font-weight: 600;
  margin-top: 8px;
  font-family: var(--mono);
  background: rgba(234, 179, 8, 0.15);
  display: inline-block;
  padding: 5px 18px;
  border-radius: 60px;
  letter-spacing: 0.5px;
`;

const IconArea = styled.div`
  margin: 20px 0;
  
  .weatherIcon {
    font-size: 110px;
    display: inline-block;
    animation: ${gentleFloat} 3s ease-in-out infinite;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
  }
  
  .tempValue {
    font-size: 74px;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -3px;
    margin-top: 10px;
    
    span {
      font-size: 28px;
      font-weight: 600;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  }
`;

const ConditionTag = styled.p`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 15px 0 30px;
  text-transform: capitalize;
  display: inline-block;
  padding: 10px 28px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-radius: 60px;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 25px;
`;

const StatItem = styled.div`
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(34, 197, 94, 0.1));
  padding: 16px 12px;
  border-radius: 32px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    
    .label, .value, .unit {
      color: white;
    }
  }
  
  .label {
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 8px;
  }
  
  .value {
    font-size: 22px;
    font-weight: 800;
    color: var(--text);
  }
  
  .unit {
    font-size: 11px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-left: 2px;
  }
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  padding: 14px;
  border-radius: 60px;
  text-align: center;
  font-weight: 500;
  margin-top: 20px;
`;

const LoadingBox = styled.div`
  text-align: center;
  padding: 50px;
  
  .loader {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(14, 165, 233, 0.2);
    border-top: 3px solid var(--accent-3);
    border-right: 3px solid var(--accent-2);
    border-radius: 50%;
    animation: spinRound 0.8s linear infinite;
    margin: 0 auto 15px;
  }
  
  @keyframes spinRound {
    to { transform: rotate(360deg); }
  }
  
  p {
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const API_KEY = 'a0382fa2b6d51c7b0306f5839d9e8099';

// helpers
const getWeatherIcon = (code) => {
  if (!code) return '🌤️';
  const icons = {
    '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return icons[code] || '🌤️';
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};

function Weather() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const loadDefault = async () => {
      setIsFetching(true);
      try {
        const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=Damascus&limit=1&appid=${API_KEY}`);
        const geoData = await geoRes.json();
        if (!geoData.length) return;
        
        const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${API_KEY}&units=metric`);
        const data = await weatherRes.json();
        
        setWeatherInfo({
          name: geoData[0].name,
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          description: data.weather[0].description,
          iconCode: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };
    loadDefault();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsFetching(true);
    setErrMsg(null);
    
    try {
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      if (!geoData.length) throw new Error('City not found');
      
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${API_KEY}&units=metric`);
      const data = await weatherRes.json();
      
      setWeatherInfo({
        name: geoData[0].name,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        iconCode: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      });
      
      setSearchTerm('');
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Header>
          <div className="brand">
            <span className="logoIcon">☀️</span>
            <h1>WeatherWise</h1>
          </div>
        </Header>
        
        <SearchForm onSubmit={handleFormSubmit}>
          <SearchInput
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchBtn type="submit">Search</SearchBtn>
        </SearchForm>
        
        {isFetching && (
          <LoadingBox>
            <div className="loader"></div>
            <p>Loading weather...</p>
          </LoadingBox>
        )}
        
        {errMsg && <ErrorBox>{errMsg}</ErrorBox>}
        
        {weatherInfo && !isFetching && (
          <WeatherDisplay>
            <CityWrapper>
              <h2>{weatherInfo.name}</h2>
              <DateText>{getCurrentDate()}</DateText>
            </CityWrapper>
            
            <IconArea>
              <div className="weatherIcon">{getWeatherIcon(weatherInfo.iconCode)}</div>
              <div className="tempValue">{weatherInfo.temp}<span>°C</span></div>
            </IconArea>
            
            <ConditionTag>{weatherInfo.description}</ConditionTag>
            
            <StatsContainer>
              <StatItem>
                <span className="label">💧 Humidity</span>
                <span className="value">{weatherInfo.humidity}<span className="unit">%</span></span>
              </StatItem>
              <StatItem>
                <span className="label">💨 Wind</span>
                <span className="value">{weatherInfo.windSpeed}<span className="unit">m/s</span></span>
              </StatItem>
              <StatItem>
                <span className="label">🌡️ Feels like</span>
                <span className="value">{weatherInfo.feelsLike}<span className="unit">°C</span></span>
              </StatItem>
            </StatsContainer>
          </WeatherDisplay>
        )}
      </Card>
    </Wrapper>
  );
}

export default Weather;