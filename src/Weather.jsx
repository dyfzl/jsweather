import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const weatherDescKo = {
  200: "비도 오고 천둥도 치는디 약간 무서워졌어😖",
  201: "오늘 비랑 천둥친대 우산 챙겨어어ㅓ",
  202: "와 오늘 비 쏟아지고 천둥 쾅쾅이야;;",
  210: "천둥소리 들렸는데 좀 약하더라",
  211: "천둥 구르는데 분위기 묘하네",
  212: "천둥 미쳤다 진짜;;;",
  221: "천둥이 불규칙하게 와가지고 심장 놀람;;",
  230: "흐릿한 연무에 천둥까지…묘하다",
  231: "오늘은 연무랑 천둥 세트로 등장함",
  232: "안개비랑 천둥이랑 같이 와서 분위기 미쳤다",
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
  711: "연기 낀 날은 숨쉬기 불편허다ㅠ",
  721: "공기 질 좀 안 좋은 거 같지 않아?",
  731: "모래먼지 때문에 눈 뻑뻑해지는 느낌…",
  741: "오늘 안개 미쳤지???! 뭔가 영화 같긴 함",
  751: "모래바람 불어서 눈감고 다녔다;;",
  761: "먼지 많으니까 마스크 꼭꼭",
  762: "화산재도 날리나봐…진짜 자연재해 많다 요즘",
  771: "돌풍이래 집에만 있어어어ㅓ",
  781: "토네이도…? 누나 조심해ㅜㅜ",
  800: "와 오늘 하늘 진짜 미쳤어😆",
  801: "오늘도 날씨 엄청 좋네히ㅎ",
  802: "드문드문 구름 낀 하늘, 이런 하늘도 좋다",
  803: "살짝 흐려도 기분은 좋네ㅎㅎ",
  804: "완전 흐린데... 나쁘진 않다아아",
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

const hail = [511, 906]; // 우박

// 바람 종류
const windCalm = [951]; // 바람 거의 없음
const windWeak = [952, 953]; // 약한 바람, 부드러운 바람
const windModerate = [954, 955]; // 중간 세기 바람, 신선한 바람
const windStrong = [956, 957, 958, 959]; // 센 바람, 돌풍에 가까운 센 바람, 돌풍, 심각한 돌풍
const windStorm = [960, 961, 962]; // 폭풍, 강한 폭풍, 허리케인

// 구름 상태
const cloudsFew = [801, 802]; // 약간의 구름, 드문드문 구름
const cloudsScattered = [803]; // 구름이 거의 없음
const cloudsOvercast = [804]; // 흐린 하늘

// 기타 (안개, 먼지 등)
const fog = [701, 741]; // 박무, 안개
const smoke = [711]; // 연기
const dust = [731, 751, 761]; // 모래 먼지, 모래, 먼지
const volcanicAsh = [762]; // 화산재
const tornado = [781, 900]; // 토네이도
const hurricane = [901, 902, 962]; // 태풍, 허리케인

// 온도 관련
const cold = [903]; // 한랭
const hot = [904]; // 고온

// 기타 특수 상태
const windy = [905]; // 바람부는

// 비
const rainCodes = [
  300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511,
  520, 521, 522, 531,
];

//눈
const snowCodes = [600, 601, 602, 611, 612, 615, 616, 620, 621, 622];

// 천둥
const thunderCodes = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];

// 이미지 랜덤 선택 함수
function pickRandomImage(type) {
  const images = {
    rain: ["rain1.png", "rain2.png", "rain3.png"],
    snow: ["snow1.png", "snow2.png", "snow3.png"],
    thunder: ["thunder1.png", "thunder2.png", "thunder3.png"],
  };
  const arr = images[type] || ["default_weather.jpg"];
  return arr[Math.floor(Math.random() * arr.length)];
}

// 날씨 코드에 따른 이미지 선택 함수
function getWeatherImage(weatherId) {
  if (hail.includes(weatherId)) return "hail.png";

  if (windCalm.includes(weatherId)) return "default_weather.jpg";
  if (windWeak.includes(weatherId)) return "default_weather.jpg";
  if (windModerate.includes(weatherId)) return "default_weather.jpg";
  if (windStrong.includes(weatherId)) return "default_weather.jpg";
  if (windStorm.includes(weatherId)) return "wind_storm.png";

  if (cloudsFew.includes(weatherId)) return "clouds_few.png";
  if (cloudsScattered.includes(weatherId)) return "clouds_scattered.png";
  if (cloudsOvercast.includes(weatherId)) return "default_weather.jpg";

  if (fog.includes(weatherId)) return "fog.png";
  if (smoke.includes(weatherId)) return "smoke.png";
  if (dust.includes(weatherId)) return "dust.png";
  if (volcanicAsh.includes(weatherId)) return "volcanic_ash.png";
  if (tornado.includes(weatherId)) return "tornado.png";
  if (hurricane.includes(weatherId)) return "hurricane.png";

  if (cold.includes(weatherId)) return "cold.png";
  if (hot.includes(weatherId)) return "hot.png";

  if (windy.includes(weatherId)) return "windy.png";

  if (rainCodes.includes(weatherId)) return pickRandomImage("rain");
  if (snowCodes.includes(weatherId)) return pickRandomImage("snow");
  if (thunderCodes.includes(weatherId)) return pickRandomImage("thunder");

  return "default_weather.jpg";
}

function WeatherComponent() {
  const [weather, setWeather] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ko`
        );

        const weatherId = res.data.weather[0].id;
        const weatherKo =
          weatherDescKo[weatherId] || res.data.weather[0].description;
        const weatherIcon = res.data.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        const temp = Math.round(res.data.main.temp);
        const imgSrc = `/weather_images/${getWeatherImage(weatherId)}`;

        setWeather({
          description: weatherKo,
          name: res.data.name,
          temp: temp,
          icon: weatherIconAdrs,
          imgSrc,
        });

        // 현재 시간대 갱신
        setTimeOfDay(getTimeOfDay());
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  const backgroundColors = {
    morning: "#FFFAE5", // 연한 노란빛
    afternoon: "#E5F4FF", // 맑은 하늘색
    evening: "#2C3E50", // 짙은 남색 (밤)
    gray: "#D3D3D3", // 흐림/비용 회색
  };

  // 배경색 변경
  function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    return "evening";
  }

  function getBackgroundColor(weatherId, timeOfDay) {
    const isRainy = rainCodes.includes(weatherId);
    const thunderCodes = rainCodes.includes(weatherId);
    const isCloudy = weatherId === 803;

    if (isRainy || isCloudy || thunderCodes) {
      return backgroundColors.gray;
    }

    return backgroundColors[timeOfDay];
  }

  if (!weather) return <p>Loading...</p>;

  const bgColor = getBackgroundColor(weather.id, timeOfDay);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        padding: "20px",
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          margin: "0 auto",
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* 상단 정보 영역 */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: "5px 0" }}>{weather.name}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src={weather.icon}
              alt={weather.description}
              style={{ width: "60px", height: "60px" }}
            />
            <p style={{ fontSize: "24px", margin: 0 }}>{weather.temp}°</p>
          </div>

          <p style={{ fontSize: "18px", margin: "5px 0" }}>
            {weather.description}
          </p>
        </div>

        {/* 사진 영역 */}
        <div>
          <img
            src={weather.imgSrc}
            alt="날씨 이미지"
            style={{ width: "300px", height: "auto", borderRadius: "10px" }}
          />
        </div>

        {/* 하단 영역 (원하는 경우 내용 추가 가능) */}
        <div style={{ marginTop: "20px" }}>{/* 추가 정보 또는 버튼 등 */}</div>
      </div>
    </div>
  );
}

export default WeatherComponent;
