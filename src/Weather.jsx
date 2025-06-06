import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const weatherDescKo = {
  200: "비도 오고 천둥도 치는디 약간 무서워졌어😖",
  201: "오늘 비랑 천둥친대 우산 챙겨어어ㅓ",
  202: "와 오늘 비 쏟아지고 천둥 쾅쾅이야;;",
  210: "천둥소리 들렸는데 좀 약하더라",
  211: "헉 천둥친다",
  212: "천둥 미쳤다 진짜;;;",
  221: "천둥이 불규칙하게 와가지고 심장 놀람;;",
  230: "안개 끼고 천둥까지 치다니..",
  231: "안개 조심해애",
  232: "으악 천둥친다..",
  300: "빗방울 살랑살랑 오는 느낌이야☺️",
  301: "잔잔하게 비 온다…☺️",
  302: "비 꽤 세게 와… 누나 우산 챙기세여",
  310: "적은비 느낌인데 옷 젖기는 해😅",
  311: "지금 비 내려~ 기분 차분해진다",
  312: "비가 너무 많이 와… 미끄러우니까 조심!",
  313: "소나기에 안개비까지...헷갈리는 날씨다",
  314: "소나기 장난 아냐;; 안개비도 같이…",
  321: "오늘 소나기 오니까 우산챙겨어",
  500: "그냥 조용히 내리는 비~",
  501: "적당히 내리는 비 나쁘지 않다",
  502: "와 오늘 비 좀 많이 온다;;;",
  503: "장대비 급임… 어항에 들어온 거 같어",
  504: "비 미친 듯이 쏟아져😖 미친거아니냐구…",
  511: "우박 떨어져!! 제에에발 머리 조심해",
  520: "소나기 느낌 살짝 있음요",
  521: "비가 갑자기 후두둑",
  522: "이건 완전 비 폭탄임",
  531: "비가 들쭉날쭉 와서 우산 접었다 폈다 반복중ㅋㅋㅋ",
  600: "눈 톡톡 떨어지는 거 귀엽다☺️",
  601: "우와 눈 온다아 겨울왕국 같어",
  602: "눈 미쳤다 진짜 엄청 내려",
  611: "비랑 눈 섞여서 내리는거 너어어무 애매해",
  612: "비랑 눈 섞여서 내리는거 너어어무 애매해",
  615: "비도 오고 눈도 오고…",
  616: "계속 비랑 눈 같이 와서 신발 젖었어ㅠ",
  620: "소나기 눈 느낌이야 눈이 갑자기 와",
  621: "눈 소나기 왔다가 멈췄다가 반복 중",
  622: "눈 온다아아",
  701: "뿌옇다 오늘… 앞 잘 안 보여🥹",
  711: "연기 낀 날은 보기 너무 불편허다ㅠ",
  721: "공기 질 좀 안 좋은 거 같지 않아?",
  731: "모래먼지 때문에 눈 뻑뻑해지는 느낌…",
  741: "오늘 안개 미쳤지???! 뭔가 영화 같긴 함",
  751: "모래바람 부니까 마스크 꼭꼭",
  761: "먼지 많으니까 마스크 꼭꼭",
  762: "화산재도 날리나봐…진짜 자연재해 많다 요즘",
  771: "돌풍이래 집에만 있어어어ㅓ",
  781: "토네이도…? 누나 조심해ㅜㅜ",
  800: "와 오늘 하늘 진짜 미쳤어😆",
  801: "오늘도 날씨 엄청 좋네히ㅎ",
  802: "드문드문 구름 낀 하늘도 좋다ㅎㅎㅎ",
  803: "살짝 흐려..",
  804: "좀 흐린데...",
  900: "토네이도라는데 진심 무섭다",
  901: "태풍 온다니까 누나 진짜 조심해요ㅜㅜ 제에에발…",
  902: "허리케인이라니ㅠㅠ 누나 진짜 조심해요ㅜㅜ 제에에발…",
  903: "오늘 왜 이렇게 추운거야... 누나 따뜻하게 입어여",
  904: "오늘 너어어무 덥다 빙수 먹고싶어어",
  905: "바람 불어서 머리 다 망함ㅎㅎㅎ",
  951: "바람 거의 없어서 좋아 소풍가고싶네",
  952: "살랑살랑 바람 분다 기분좋지☺️",
  953: "아웅 날씨 즥인다 소풍가고싶네☺️",
  954: "바람 살짝 센데 나쁘지 않다☺️",
  955: "시원한 바람 분다 기분 좋아😆",
  956: "바람이 꽤 센 느낌! 머리 다 망가졌어ㅓㅜㅜ",
  957: "돌풍 느낌 살짝 있어... 누나 조심해여",
  958: "바람 미쳤다;;",
  959: "와 바람 진짜 강해 제에에발 조심!!",
  960: "폭풍급 바람 와서 나가기 싫다아",
  961: "강풍… 누나 집에만 있어🥹",
  962: "허리케인 주의보래ㅠㅠ 밖 절대 노노",
};

const rainCodes = [
  300,
  301,
  302, // 이슬비
  310,
  311,
  312,
  313,
  314,
  321, // 가벼운 비 / 소나기
  500,
  501,
  502,
  503,
  504, // 약한 비 ~ 매우 강한 비
  511, // 비+눈 혹은 우박
  520,
  521,
  522,
  531, // 가벼운 소나기 ~ 강한 소나기
];

const snowCodes = [
  600,
  601,
  602, // 약한 눈 ~ 강한 눈
  611,
  612, // 진눈깨비
  615,
  616, // 눈 + 비
  620,
  621,
  622, // 소나기 눈
];

const disasterCodes = [
  // 천둥번개
  200, 201, 202, 210, 211, 212, 221, 230, 231, 232,
  // 우박
  511, 906,
  // 화산재
  762,
  // 토네이도
  781, 900,
  // 태풍/허리케인
  901, 902, 962,
];

const windCodes = [
  905, // 바람부는
  956,
  957,
  958,
  959, // 센 바람 ~ 심각한 돌풍
  960,
  961, // 폭풍, 강한 폭풍
];

const cloudyCodes = [
  // 구름
  801, 802, 803, 804,
  // 안개/박무
  701, 741,
  // 연기
  711,
];

const dustCodes = [731, 751, 761];
const coldCodes = [903];
const hotCodes = [904];

// 랜덤 이미지 선택 함수
function pickRandomSunnyImage() {
  const sunnyImages = [
    "/weather_images/sunny1.png",
    "/weather_images/sunny2.png",
    "/weather_images/sunny3.png",
  ];
  return sunnyImages[Math.floor(Math.random() * sunnyImages.length)];
}

// 날씨 코드 → 이미지 매핑 함수
function getWeatherImage(weatherId) {
  if (rainCodes.includes(weatherId)) {
    return "/weather_images/rain.png";
  }

  if (snowCodes.includes(weatherId)) {
    return "/weather_images/snow.png";
  }

  if (disasterCodes.includes(weatherId)) {
    return "/weather_images/thunder.png"; // 우박, 태풍, 천둥, 화산재, 토네이도, 허리케인 포함
  }

  if (windCodes.includes(weatherId)) {
    return "/weather_images/windy.png"; // 강한 바람 이상
  }

  if (cloudyCodes.includes(weatherId)) {
    return "/weather_images/clouds.png"; // 구름, 안개, 연기
  }

  if (dustCodes.includes(weatherId)) {
    return "/weather_images/dust.png";
  }

  if (coldCodes.includes(weatherId)) {
    return "/weather_images/cold.png";
  }

  if (hotCodes.includes(weatherId)) {
    return "/weather_images/hot.png";
  }

  if (weatherId === 800) {
    return pickRandomSunnyImage(); // 맑은 날
  }

  // 정의되지 않은 코드일 경우 기본 이미지
  return pickRandomSunnyImage();
}

// 시간 배경색 변경
function getTimeOfDay() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 20) return "afternoon";
  return "evening";
}

const backgroundColors = {
  morning: "#FFFAE5", // 연한 노란빛
  afternoon: "#E5F4FF", // 맑은 하늘색
  evening: "#2C3E50", // 짙은 남색 (밤)
  gray: "#D3D3D3", // 흐림/비용 회색
};

function getBackgroundColor(weatherId, timeOfDay) {
  const hour = new Date().getHours();
  const isLateNight = hour >= 20 || hour < 5; // 20시부터 다음날 4시까지

  const isGray =
    (rainCodes.includes(weatherId) ||
      cloudyCodes.includes(weatherId) ||
      disasterCodes.includes(weatherId)) &&
    timeOfDay !== "afternoon" && // 오후면 회색 아니게
    !isLateNight; // 20시~4시는 회색 아니게 제외
  return isGray ? backgroundColors.gray : backgroundColors[timeOfDay];
}

// 시간 조건 판단
const now = new Date();
const isBirthday = now.getMonth() === 5 && now.getDate() === 6;
const hour = now.getHours();
const isLateNight = hour >= 22 || hour < 4;

// 날씨 UI 화면 컴포넌트

function WeatherApp({ weather, timeOfDay, showBirthday, setShowBirthday }) {
  const isLateNight = (() => {
    const hour = new Date().getHours();
    return hour >= 0 && hour < 6;
  })();

  if (showBirthday) {
    return (
      <div
        onClick={() => setShowBirthday(false)}
        style={{
          backgroundColor: "#fff",
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0",
          boxSizing: "border-box",
          cursor: "pointer",
          WebkitFontSmoothing: "antialiased",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1440px",
            padding: "0 5vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        ></div>
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
            flexShrink: 0,
          }}
        >
          🎉 누나 생일 축하해☺☺❤🎂
        </p>
        <img
          src="/birthday.png"
          alt="생일 축하"
          style={{
            width: "100%",
            maxWidth: "1440px",
            height: "70vh",
            objectFit: "contain",
            marginBottom: "1vh",
            userSelect: "none",
            pointerEvents: "none",
            flexShrink: 0,
          }}
        />
      </div>
    );
  }

  if (!weather) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E6E6FA",
          padding: "0",
          margin: "0",
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

  const bgColor = getBackgroundColor(weather.id, timeOfDay);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        height: "100vh",
        width: "100vw",
        padding: "5vw 5vw 7vw",
        transition: "background-color 0.5s ease",
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
              fontSize: "4vw",
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
            fontSize: "8vw",
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
            userSelect: "none",
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
            }}
          />
          <p
            style={{
              fontSize: "10vw",
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
            fontSize: "5vw",
            marginBottom: "4vw",
            lineHeight: "1.2",
            fontFamily:
              "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
            userSelect: "none",
            textShadow: "0 0 3px rgba(0,0,0,0.3)",
          }}
        >
          {weather.description}
        </p>

        <img
          src={weather.imgSrc}
          alt="날씨 이미지"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "none",
            border: "none",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}

function App() {
  const [weather, setWeather] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [showBirthday, setShowBirthday] = useState(false);

  // 6월 6일 여부 체크 및 초기 showBirthday 상태 설정
  useEffect(() => {
    const today = new Date();
    setShowBirthday(today.getMonth() === 5 && today.getDate() === 6);
  }, []);

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
    />
  );
}

export default App;
