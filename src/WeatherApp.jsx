import React from "react";
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

function WeatherApp({
  weather,
  timeOfDay,
  showBirthday,
  setShowBirthday,
  loadingDelayDone,
  showWeatherUI,
}) {
  const isLateNight = isLateNightHour();
  const bgColor = weather
    ? getBackgroundColor(weather.id, timeOfDay, isLateNight)
    : "#E6E6FA";

  // 생일 화면
  if (showBirthday) {
    return (
      <div
        onClick={() => setShowBirthday(false)}
        style={{
          backgroundColor: "#fff",
          height: "100vh",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          WebkitFontSmoothing: "antialiased",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            fontSize: "6vw",
            fontWeight: "900",
            color: "#e91e63",
            fontFamily:
              "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
            textShadow: "0 0 10px rgba(233, 30, 99, 0.9)",
            lineHeight: 1.1,
            margin: 0,
            userSelect: "none",
          }}
        >
          🎉 누나 생일 축하해☺☺❤🎂
        </p>
        <img
          src="/birthday.png"
          alt="생일 축하"
          style={{
            width: "100%",
            maxWidth: "100vw",
            maxHeight: "70vh",
            objectFit: "contain",
            marginBottom: "1vh",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // 로딩 or 초기 화면
  if (!weather || !loadingDelayDone || !showWeatherUI) {
    return (
      <div
        style={{
          height: "100vh",
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E6E6FA",
          boxSizing: "border-box",
          WebkitFontSmoothing: "antialiased",
          overflow: "hidden",
        }}
      >
        <img
          src="/find.png"
          alt="로딩 중"
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  // 날씨 화면
  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: "100vh",
        minHeight: "100vh",
        width: "100vw",
        padding: "5vw",
        transition: "background-color 0.5s ease, opacity 0.5s ease",
        opacity: showWeatherUI ? 1 : 0,
        boxSizing: "border-box",
        WebkitFontSmoothing: "antialiased",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          userSelect: "none",
        }}
      >
        {isLateNight && (
          <p
            style={{
              fontSize: "clamp(16px, 4vw, 28px)",
              color: "#fff",
              marginBottom: "2vw",
              lineHeight: "1.1",
              fontFamily:
                "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
            }}
          >
            잘 장☺️ 까만 꿈 꿔
          </p>
        )}

        <h1
          style={{
            marginBottom: "2vw",
            lineHeight: "1.15",
            fontSize: "clamp(32px, 8vw, 64px)",
            fontWeight: "800",
            letterSpacing: "0.03em",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            userSelect: "none",
          }}
        >
          {weather.name}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3vw",
            marginBottom: "3vw",
            flexWrap: "wrap",
          }}
        >
          <img
            src={weather.icon}
            alt={weather.description}
            style={{
              width: "15vw",
              height: "15vw",
              minWidth: "60px",
              minHeight: "60px",
              flexShrink: 0,
              objectFit: "contain",
            }}
          />
          <p
            style={{
              fontSize: "clamp(28px, 10vw, 80px)",
              margin: 0,
              fontWeight: "700",
              letterSpacing: "-0.03em",
              textShadow: "1px 1px 3px rgba(0,0,0,0.4)",
            }}
          >
            {weather.temp}°
          </p>
        </div>

        <p
          style={{
            fontSize: "clamp(16px, 5vw, 36px)",
            marginBottom: "4vw",
            lineHeight: "1.2",
            fontFamily:
              "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
            userSelect: "none",
            textShadow: "0 0 3px rgba(0,0,0,0.3)",
          }}
        >
          {getDescriptionWithClouds(weather)}
        </p>

        <img
          src={weather.imgSrc}
          alt="날씨 이미지"
          style={{
            width: "100%",
            maxWidth: "100vw",
            height: "auto",
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}

export default WeatherApp;
