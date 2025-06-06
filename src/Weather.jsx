import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherApp from "./WeatherApp"; // 상대경로 조정 필요
import {
  weatherDescKo,
  rainCodes,
  snowCodes,
  disasterCodes,
  windCodes,
  cloudyCodes,
  sunnyCodes,
  dustCodes,
  coldCodes,
  hotCodes,
  pickRandomSunnyImage,
  getWeatherImage,
  getTimeOfDay,
  isLateNightHour,
  backgroundColors,
  getBackgroundColor,
  getDescriptionWithClouds,
} from "./weatherUtils";

const API_KEY = import.meta.env.VITE_API_KEY;

// 시간 조건 판단
const now = new Date();
const hour = now.getHours();

function App() {
  const [weather, setWeather] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [showBirthday, setShowBirthday] = useState(false);
  const [loadingDelayDone, setLoadingDelayDone] = useState(false);
  const [showWeatherUI, setShowWeatherUI] = useState(false);

  useEffect(() => {
    // 홈 화면에서 실행된 경우 새로고침 (단 1회만)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      const hasRefreshed = sessionStorage.getItem("hasRefreshed");
      if (!hasRefreshed) {
        sessionStorage.setItem("hasRefreshed", "true");
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDelayDone(true);
    }, 1500); // 최소 2초

    return () => clearTimeout(timer);
  }, []);

  // 6월 6일 여부 체크 및 초기 showBirthday 상태 설정
  useEffect(() => {
    const today = new Date();
    setShowBirthday(today.getMonth() === 5 && today.getDate() === 6);
  }, []);

  useEffect(() => {
    if (weather && loadingDelayDone) {
      const timeout = setTimeout(() => {
        setShowWeatherUI(true);
      }, 100); // 100ms 뒤에 실제 날씨 UI 등장 (자연스럽게)
      return () => clearTimeout(timeout);
    }
  }, [weather, loadingDelayDone]);

  useEffect(() => {
    console.log("weather:", weather);
  }, [weather]);

  useEffect(() => {
    console.log("loadingDelayDone:", loadingDelayDone);
  }, [loadingDelayDone]);

  useEffect(() => {
    console.log("showWeatherUI:", showWeatherUI);
  }, [showWeatherUI]);

  // 날씨 요청 함수 분리
  const fetchWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = response.data;
            const weatherId = data.weather[0].id;

            setWeather({
              id: weatherId,
              name: data.name,
              temp: Math.round(data.main.temp),
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              description:
                weatherDescKo[weatherId] || data.weather[0].description,
              imgSrc: getWeatherImage(weatherId),
              clouds: data.clouds.all, // 구름 양 추가
            });
          } catch (error) {
            console.error("날씨 정보 가져오기 실패:", error);
          }
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error);
        },
        {
          enableHighAccuracy: false, // 고정밀 GPS 비활성화 → Wi-Fi나 기지국 기반
          timeout: 5000, // 최대 5초 내 응답 없으면 실패 처리
          maximumAge: 0, // 캐시된 위치 정보는 사용하지 않음
        }
      );
    }
  };

  // showBirthday가 false가 될 때 날씨 재요청
  useEffect(() => {
    if (!showBirthday) {
      fetchWeather();
    }
  }, [showBirthday]);

  // 시간대 변경 감지 (30분마다 갱신)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WeatherApp
      weather={weather}
      timeOfDay={timeOfDay}
      showBirthday={showBirthday}
      setShowBirthday={setShowBirthday}
      loadingDelayDone={loadingDelayDone}
      showWeatherUI={showWeatherUI}
    />
  );
}

export default App;
