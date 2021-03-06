const element = {
  div: {
    map: document.querySelector(".map"),
    cardList: document.querySelector(".card-list"),
    cardSpecimen: document.querySelector(".card-list > div:nth-child(2)"),
    tooltip: document.querySelector(".tooltip"),
  },
  img: {
    trashMap: document.querySelector(".map-tool > img:nth-child(1)"),
    help: document.querySelector(".map-tool > img:nth-child(2)"),
    play: document.querySelector(".map-tool-play"),

    scroll: document.querySelector(".card-stats > img:nth-last-child(6)"),
    zero: document.querySelector(".card-stats > img:nth-last-child(5)"),
    maplem: document.querySelector(".card-stats > img:nth-last-child(4)"),
    sync: document.querySelector(".card-stats > img:nth-last-child(3)"),
    autoSelect: document.querySelector(".card-stats > img:nth-last-child(2)"),
    trashCard: document.querySelector(".card-stats > img:nth-last-child(1)"),
    rank: document.querySelector(".stats-level > img"),
    resetStats: undefined,
  },
  txt: {
    tileCount: document.querySelector(".map-tool > h6"),

    cardCount: document.querySelector(".card-stats > h6"),

    unionKo: document.querySelector(".stats > h1"),
    unionEn: document.querySelector(".stats-leaf > h5"),
    totalLevel: document.querySelector(".stats-level > div:nth-child(2) > h1"),
    raidMember: document.querySelector(".stats-level > div:nth-child(3) > h1"),

    applyName: document.querySelector("#apply-name"),
  },
  rad: {
    login: document.querySelectorAll(".input-login-type > input[type=radio]"),
  },
  btn: {
    login: document.querySelector("#login"),
    apply: document.querySelector("#apply"),
  },

  table: document.querySelector(".map > table"),
  tile: new Array(TILE.ROW),
  mino: {
    warrior: [],
    wizard: [],
    archer: [],
    thief: [],
    pirate: [],
    xenon: [],
    maplem: [],
  },
};

let map = {
  solve: 0,
  drawing: true, // true: draw, false: erase
  click: 0, // 0: none click, 1: single, 2: double

  doubleClickPos: { x: -1, y: -1 },
  doubleClickTid: 0,
  doubleClickDuration: 500,

  hoverPos: { x: -1, y: -1, g: -1 },
  selectedPos: [],

  tiler: undefined,
  tileCount: 0,

  findSelectedIndex: (pos) => map.selectedPos.findIndex((p) => p.x == pos.x && p.y == pos.y),
  findGroupIndex: (pos) =>
    TILE.GROUP.findIndex((area) => area.findIndex((p) => p.x == pos.x && p.y == pos.y) != -1),

  hover: (pos) => {
    if (map.solve) return;

    const div = document.createElement("div");
    div.className = "tile-hover";
    div.style.zIndex = 1;
    div.style.background = TILE.COLOR.HOVER;
    element.tile[pos.y][pos.x].appendChild(div);
  },
  isHover: (pos) => pos.x == map.hoverPos.x && pos.y == map.hoverPos.y,
  isNotHover: (pos) => pos.x != map.hoverPos.x || pos.y != map.hoverPos.y,
  unHover: (pos) => {
    if (pos.x == -1) return;
    element.tile[pos.y][pos.x].childNodes.forEach((e) => {
      if (e.className == "tile-hover") e.remove();
    });
  },

  select: (pos) => {
    if (map.solve) return;

    element.tile[pos.y][pos.x].style.backgroundColor = TILE.COLOR.SELECTED;
    map.selectedPos.push({ x: pos.x, y: pos.y });
    map.updateTileCount();
  },
  isSelected: (pos) => !map.isNotSelected(pos),
  isNotSelected: (pos) => map.findSelectedIndex(pos) == -1,
  unSelect: (pos) => {
    if (map.solve) return;

    element.tile[pos.y][pos.x].style.backgroundColor = "";
    map.selectedPos.splice(map.findSelectedIndex(pos), 1);
    map.updateTileCount();
  },
  updateTileCount: () => {
    map.tileCount = stats.tileableCount - map.selectedPos.length;
    element.txt.tileCount.innerText = map.tileCount;

    if (map.tileCount < 0) element.txt.tileCount.style.color = "rgb(231, 76, 60)";
    else element.txt.tileCount.style.color = "";
  },

  place: (pos, shape, jobClass) => {
    let sx = pos.x;
    let sy = pos.y;
    let noIcon = true;

    for (let i = 0, row = shape.matrix.length; i < row; i++)
      for (let j = 0, col = shape.matrix[0].length; j < col; j++) {
        if (shape.matrix[i][j] > 0) {
          // 초기 세팅
          const x = sx + j;
          const y = sy + i;
          const color = TILE.COLOR.MINO[jobClass.toUpperCase()];
          const img = document.createElement("img");
          const td = element.tile[y][x];

          // 일반 타일
          td.style.backgroundColor = color;
          if (i > 0 && shape.matrix[i - 1][j] > 0) {
            td.style.borderTopColor = color;
          } else if (y > 1) element.tile[y - 1][x].style.borderBottomColor = TILE.COLOR.BOUNDARY;
          if (j > 0 && shape.matrix[i][j - 1] > 0) {
            td.style.borderLeftColor = color;
          } else if (x > 1) element.tile[y][x - 1].style.borderRightColor = TILE.COLOR.BOUNDARY;
          td.style.borderBottomColor =
            i < row - 1 && shape.matrix[i + 1][j] > 0 ? color : TILE.COLOR.BOUNDARY;
          td.style.borderRightColor =
            j < col - 1 && shape.matrix[i][j + 1] > 0 ? color : TILE.COLOR.BOUNDARY;

          // 중심 아이콘
          if (noIcon && shape.matrix[i][j] == 2) {
            img.src = character.getMinoIconSrc(jobClass);
            td.appendChild(img);
            noIcon = false;
          }
        }
      }
  },
};
let character = {
  infoList: [],
  syncList: [],
  JOB: {
    WARRIOR: [
      "검사",
      "파이터",
      "페이지",
      "스피어맨",
      "크루세이더",
      "나이트",
      "버서커",
      "히어로",
      "팔라딘",
      "다크나이트",
      "소울마스터",
      "미하일",
      "아란",
      "데몬슬레이어",
      "데몬어벤져",
      "블래스터",
      "카이저",
      "제로",
      "아델",
    ],
    WIZARD: [
      "매지션",
      "위자드(불,독)",
      "위자드(썬,콜)",
      "클레릭",
      "메이지(불,독)",
      "메이지(썬,콜)",
      "프리스트",
      "아크메이지(불,독)",
      "아크메이지(썬,콜)",
      "비숍",
      "플레임위자드",
      "에반",
      "배틀메이지",
      "루미너스",
      "키네시스",
      "일리움",
      "라라",
    ],
    ARCHER: [
      "아처",
      "헌터",
      "사수",
      "레인저",
      "저격수",
      "보우마스터",
      "신궁",
      "아처(패스파인더)",
      "에인션트아처",
      "체이서",
      "패스파인더",
      "윈드브레이커",
      "와일드헌터",
      "메르세데스",
      "카인",
    ],
    THIEF: [
      "로그",
      "어쌔신",
      "시프",
      "허밋",
      "시프마스터",
      "나이트로드",
      "섀도어",
      "세미듀어러",
      "듀어러",
      "듀얼마스터",
      "슬래셔",
      "듀얼블레이더",
      "나이트워커",
      "팬텀",
      "카데나",
      "호영",
    ],
    PIRATE: [
      "해적",
      "인파이터",
      "건슬링거",
      "캐논슈터",
      "버커니어",
      "발키리",
      "캐논블래스터",
      "바이퍼",
      "캡틴",
      "캐논마스터",
      "스트라이커",
      "메카닉",
      "엔젤릭버스터",
      "은월",
      "아크",
    ],
    XENON: ["제논"],
    MAPLEM: ["메이플M"],
    NOUNION: ["초보자", "노블레스", "시티즌"],
  },
  EFFECT: {
    검사: "",
    파이터: "STR 10/20/40/80/100 증가",
    페이지: "STR 10/20/40/80/100 증가",
    스피어맨: "최대 HP 2/3/4/5/6% 증가",
    크루세이더: "STR 10/20/40/80/100 증가",
    나이트: "STR 10/20/40/80/100 증가",
    버서커: "최대 HP 2/3/4/5/6% 증가",
    히어로: "STR 10/20/40/80/100 증가",
    팔라딘: "STR 10/20/40/80/100 증가",
    다크나이트: "최대 HP 2/3/4/5/6% 증가",
    소울마스터: "최대 HP 250/500/1000/2000/2500 증가",
    미하일: "최대 HP 250/500/1000/2000/2500 증가",
    아란: "적 타격 시 70%의 확률로 순수 HP의 2/4/6/8/10% 회복 발동 시\n다음 발동 확률이 감소하지만 효과가 2배 (10초마다 1번)",
    데몬슬레이어: "모든 상태 이상 저항 1/2/3/4/5 증가",
    데몬어벤져: "보스 공격 시 데미지 1/2/3/5/6% 증가",
    블래스터: "방어율 무시 1/2/3/5/6% 증가",
    카이저: "STR 10/20/40/80/100 증가",
    제로: "경험치 획득량 4/6/8/10/12% 증가",
    아델: "STR 10/20/40/80/100 증가",

    매지션: "",
    "위자드(불,독)": "최대 MP 2/3/4/5/6% 증가",
    "위자드(썬,콜)": "INT 10/20/40/80/100 증가",
    클레릭: "INT 10/20/40/80/100 증가",
    "메이지(불,독)": "최대 MP 2/3/4/5/6% 증가",
    "메이지(썬,콜)": "INT 10/20/40/80/100 증가",
    프리스트: "INT 10/20/40/80/100 증가",
    "아크메이지(불,독)": "최대 MP 2/3/4/5/6% 증가",
    "아크메이지(썬,콜)": "INT 10/20/40/80/100 증가",
    비숍: "INT 10/20/40/80/100 증가",
    플레임위자드: "INT 10/20/40/80/100 증가",
    에반: "적 타격 시 70%의 확률로 순수 MP의 2/4/6/8/10% 회복 발동 시\n다음 발동 확률이 감소하지만 효과가 2배 (10초마다 1번)",
    배틀메이지: "INT 10/20/40/80/100 증가",
    루미너스: "INT 10/20/40/80/100 증가",
    키네시스: "INT 10/20/40/80/100 증가",
    일리움: "INT 10/20/40/80/100 증가",
    라라: "INT 10/20/40/80/100 증가",

    아처: "",
    헌터: "DEX 10/20/40/80/100 증가",
    사수: "크리티컬 확률 1/2/3/4/5% 증가",
    레인저: "DEX 10/20/40/80/100 증가",
    저격수: "크리티컬 확률 1/2/3/4/5% 증가",
    보우마스터: "DEX 10/20/40/80/100 증가",
    신궁: "크리티컬 확률 1/2/3/4/5% 증가",
    "아처(패스파인더)": "DEX 10/20/40/80/100 증가",
    에인션트아처: "DEX 10/20/40/80/100 증가",
    체이서: "DEX 10/20/40/80/100 증가",
    패스파인더: "DEX 10/20/40/80/100 증가",
    윈드브레이커: "DEX 10/20/40/80/100 증가",
    와일드헌터: "공격 시 20% 확률로 데미지 4/8/12/16/20% 증가",
    메르세데스: "스킬 재사용 대기시간 2/3/4/5/6% 감소\n(1초 미만으로 줄어들지 않음)",
    카인: "DEX 10/20/40/80/100 증가",

    로그: "",
    어쌔신: "크리티컬 확률 1/2/3/4/5% 증가",
    시프: "LUK 10/20/40/80/100 증가",
    허밋: "크리티컬 확률 1/2/3/4/5% 증가",
    시프마스터: "LUK 10/20/40/80/100 증가",
    나이트로드: "크리티컬 확률 1/2/3/4/5% 증가",
    섀도어: "LUK 10/20/40/80/100 증가",
    세미듀어러: "",
    듀어러: "LUK 10/20/40/80/100 증가",
    듀얼마스터: "LUK 10/20/40/80/100 증가",
    슬래셔: "LUK 10/20/40/80/100 증가",
    듀얼블레이더: "LUK 10/20/40/80/100 증가",
    나이트워커: "LUK 10/20/40/80/100 증가",
    팬텀: "메소 획득량 1/2/3/4/5% 증가",
    카데나: "LUK 10/20/40/80/100 증가",
    호영: "LUK 10/20/40/80/100 증가",

    해적: "",
    인파이터: "STR 10/20/40/80/100 증가",
    건슬링거: "소환수 지속 시간 4/6/8/10/12% 증가",
    캐논슈터: "STR 10/20/40/80/100 증가",
    버커니어: "STR 10/20/40/80/100 증가",
    발키리: "소환수 지속 시간 4/6/8/10/12% 증가",
    캐논블래스터: "STR 10/20/40/80/100 증가",
    바이퍼: "STR 10/20/40/80/100 증가",
    캡틴: "소환수 지속 시간 4/6/8/10/12% 증가",
    캐논마스터: "STR 10/20/40/80/100 증가",
    스트라이커: "STR 10/20/40/80/100 증가",
    메카닉: "버프 지속 시간 5/10/15/20/25% 증가",
    엔젤릭버스터: "DEX 10/20/40/80/100 증가",
    은월: "크리티컬 데미지 1/2/3/5/6% 증가",
    아크: "STR 10/20/40/80/100 증가",

    제논: "STR·DEX·LUK 각각 5/10/20/40/50 증가",
    메이플M: "공격력/마력 5/10/15/20 증가",

    초보자: "",
    노블레스: "",
    시티즌: "",
  },

  getMinoIconSrc: (jobClass) => `image/job/${jobClass.toLowerCase()}.svg`,
  getEffect: (job, rankIdx) => {
    if (rankIdx == -1) return "";

    const reg = /(\d+\/)+\d+/g;
    const effect = character.EFFECT[job];
    const value = reg.exec(effect)[0].split("/")[rankIdx];
    return effect.replace(reg, value);
  },
  add: (info) => {
    // info: { name, level, job, imgUrl }
    const e = element.div.cardSpecimen.cloneNode(true);
    e.style = "";

    // job icon
    let jobClass = "";
    for (jobClass in character.JOB) {
      if (character.JOB[jobClass].indexOf(info.job) != -1) {
        jobClass = jobClass.toLowerCase();
        if (jobClass == "nounion") break;
        e.querySelector(".card-name > img").src = `image/job/${jobClass}.svg`;
        break;
      }
    }

    // no union
    if (jobClass != "maplem" && jobClass == "nounion") {
      inform.show(
        inform.DANGER,
        "제거됨",
        `${info.job}은(는) 유니온에 포함될 수 없는 직업입니다.\n닉네임: ${info.name}`
      );
      e.remove();
      return;
    }

    //rank
    let rankStr = "",
      rankIdx = -1;
    if (info.job == "제로") {
      if (info.level >= 250) {
        rankStr = "SSS";
        rankIdx = 4;
      } else if (info.level >= 200) {
        rankStr = "SS";
        rankIdx = 3;
      } else if (info.level >= 180) {
        rankStr = "S";
        rankIdx = 2;
      } else if (info.level >= 160) {
        rankStr = "A";
        rankIdx = 1;
      } else if (info.level >= 130) {
        rankStr = "B";
        rankIdx = 0;
      }
    } else if (info.job == "메이플M") {
      if (info.level >= 120) {
        rankStr = "SS";
        rankIdx = 3;
      } else if (info.level >= 70) {
        rankStr = "S";
        rankIdx = 2;
      } else if (info.level >= 50) {
        rankStr = "A";
        rankIdx = 1;
      } else if (info.level >= 30) {
        rankStr = "B";
        rankIdx = 0;
      }
    } else {
      if (info.level >= 250) {
        rankStr = "SSS";
        rankIdx = 4;
      } else if (info.level >= 200) {
        rankStr = "SS";
        rankIdx = 3;
      } else if (info.level >= 140) {
        rankStr = "S";
        rankIdx = 2;
      } else if (info.level >= 100) {
        rankStr = "A";
        rankIdx = 1;
      } else if (info.level >= 60) {
        rankStr = "B";
        rankIdx = 0;
      }
    }
    const hRank = e.querySelector(".card-rank > h2");
    hRank.innerText = rankStr;
    if (rankIdx <= 1) hRank.style.color = "rgb(222, 222, 222)";
    if (rankIdx == -1) e.classList.add("young");

    // level
    e.querySelector(".card-rank > h6").innerText = info.level;

    // sync event
    const imgTool = e.querySelectorAll(".card-rank > img");
    if (info.name == "제로 ") {
      imgTool[0].style.display = "none";
      e.style.order = 97;
    } else if (info.name == "메이플M") {
      imgTool[0].style.display = "none";
      e.style.order = 98;
    } else {
      imgTool[0].addEventListener("click", onImgSyncClick);
      imgTool[0].alt = info.name;
    }

    // remove event
    imgTool[1].alt = info.name;
    imgTool[1].addEventListener("click", (event) => {
      event.stopPropagation();

      info = character.infoList.find((o) => o.name == event.target.alt);
      if (info) {
        character.remove(info);
      }
    });

    // char img
    const imgChar = e.querySelector(".card-image > img");
    imgChar.src = info.imgUrl;

    // job string
    e.querySelector("p").innerText = info.job;

    // name
    e.querySelector(".card-name > h6").innerText = info.name;

    if (rankIdx >= 0) {
      // raid event
      e.addEventListener("click", () => {
        const idx = character.infoList.findIndex((o) => o.name == info.name);
        if (idx == -1) return;
        character.raid(character.infoList[idx]);
      });

      // tooltip event
      e.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        element.div.tooltip.innerText = character.getEffect(info.job, info.rankIdx);
        element.div.tooltip.style.display = "block";
        element.div.tooltip.style.left = e.x + 16 + "px";
        element.div.tooltip.style.top = e.y + "px";
      });
      e.addEventListener("mouseleave", (e) => {
        e.stopPropagation();
        element.div.tooltip.removeAttribute("style");
        element.div.innerText = "";
      });
      e.addEventListener("mousemove", (e) => {
        e.stopPropagation();
        element.div.tooltip.style.left = e.x + 16 + "px";
        element.div.tooltip.style.top = e.y + "px";
      });
    }

    // update info
    info = {
      ...info,
      jobClass,
      rankIdx,
      raid: false,
      element: e,
    };
    let i = 0;
    for (; i < character.infoList.length; i++)
      if (info.level > character.infoList[i].level) {
        character.infoList.splice(i, 0, info);
        break;
      }
    if (i == character.infoList.length) character.infoList.push(info);
    stats.updateLevel();

    // add element
    element.div.cardList.appendChild(e);
    element.txt.cardCount.innerText = character.infoList.filter((o) => o.level).length;

    // save info
    localStorage.infoList = JSON.stringify(character.infoList);
  },
  addGhost: (name) => {
    const e = element.div.cardSpecimen.cloneNode(true);
    e.style = "";
    e.style.order = "99";

    // rank
    e.querySelector(".card-rank > h2").innerHTML = "&nbsp;";

    // level
    e.querySelector(".card-rank > h6").innerHTML = "&nbsp;";

    // sync button click
    const imgSync = e.querySelector(".card-rank > img");
    imgSync.alt = name;

    // job string
    e.querySelector("p").innerHTML = "&nbsp;";

    // name
    e.querySelector(".card-name > h6").innerText = name;

    // update info
    element.div.cardList.append(e);
    character.infoList.push({
      name,
      level: 0,
      job: "",
      jobClass: "",
      rankIdx: -1,
      raid: false,
      element: e,
    });
    onImgSyncClick({ target: imgSync });
  },
  remove: (info) => {
    info.element.remove();
    character.infoList.splice(
      character.infoList.findIndex((o) => o.name == info.name),
      1
    );
    element.txt.cardCount.innerText = character.infoList.filter((o) => o.level).length;
    if (info.raid) stats.unsetRaid(info.rankIdx, info.jobClass);
    stats.updateLevel();

    // save info
    localStorage.infoList = JSON.stringify(character.infoList);
  },
  removeGhost: (name) => {
    const idx = character.infoList.findIndex((o) => o.name == name);
    if (idx == -1) return;

    character.infoList[idx].element.remove();
    character.infoList.splice(idx, 1);
  },
  raid: (info) => {
    if (info.raid) {
      stats.unsetRaid(info.rankIdx, info.jobClass);
      info.element.classList.remove("raid");
      info.raid = false;
    } else {
      if (stats.setRaid(info.rankIdx, info.jobClass)) {
        info.element.classList.add("raid");
        info.raid = true;
      }
    }
    localStorage.infoList = JSON.stringify(character.infoList);
  },
  sortElement: () => {
    character.infoList.forEach(
      (o, i) =>
        (o.element.style.order =
          o.job == "메이플M" ? 97 : (o.element.style.order = o.rankIdx == -1 ? 98 : i))
    );
  },
};
let stats = {
  totalLevel: 0,
  externalLevel: 0,
  raidMember: [0, 9],
  tileableCount: 0,
  minoCount: {
    warrior: [0, 0, 0, 0, 0],
    wizard: [0, 0, 0, 0, 0],
    archer: [0, 0, 0, 0, 0],
    thief: [0, 0, 0, 0, 0],
    pirate: [0, 0, 0, 0, 0],
    xenon: [0, 0, 0, 0, 0],
    maplem: [0, 0, 0, 0],
  },

  updateLevel: () => {
    // Set level
    let tl = 0;
    let maxNum = Math.min(character.infoList.length, 42);
    for (let i = 0; i < maxNum; i++) {
      if (character.infoList[i].job == "메이플M") maxNum = Math.min(character.infoList.length, 43);
      else {
        if (character.infoList[i].level < 60) break;
        tl += character.infoList[i].level;
      }
    }
    stats.totalLevel = tl;
    element.txt.totalLevel.innerText = tl.toString();

    // External level and area
    const newEL = Math.min(Math.max(0, Math.floor((tl - 1000) / 1000)), 5);
    if (stats.externalLevel != newEL) {
      stats.externalLevel = newEL;
      RedrawBoard();
    }

    // Classify by level
    let union = { titleKo: "", titleEn: "", detailLevel: 0, imgSrc: "" };

    if (tl >= 8000) {
      union.detailLevel = Math.min(5, Math.floor((tl - 7500) / 500));
      union.titleKo = "그랜드 마스터 유니온";
      union.titleEn = "GRAND MASTER UNION";

      stats.raidMember[1] = 35 + union.detailLevel;
    } else if (tl >= 5500) {
      union.detailLevel = Math.floor((tl - 5000) / 500);
      union.titleKo = "마스터 유니온";
      union.titleEn = "MASTER UNION";

      stats.raidMember[1] = 26 + union.detailLevel;
    } else if (tl >= 3000) {
      union.detailLevel = Math.floor((tl - 2500) / 500);
      union.titleKo = "베테랑 유니온";
      union.titleEn = "VETERAN UNION";

      stats.raidMember[1] = 17 + union.detailLevel;
    } else {
      union.detailLevel = Math.max(Math.floor(tl / 500), 1);
      union.titleKo = "노비스 유니온";
      union.titleEn = "NOVICE UNION";

      stats.raidMember[1] = 8 + union.detailLevel;
    }
    union.imgSrc = `image/rank/${union.titleEn.toLowerCase().replace(/\s/g, "-")}-${
      union.detailLevel
    }.png`;

    let romeNum = " I";
    if (union.detailLevel == 5) romeNum = " V";
    else if (union.detailLevel == 4) romeNum = " IV";
    else if (union.detailLevel == 3) romeNum = " III";
    else if (union.detailLevel == 2) romeNum = " II";
    union.titleKo += romeNum;
    union.titleEn += romeNum;

    // Set element
    element.txt.unionKo.innerText = union.titleKo;
    element.txt.unionEn.innerText = union.titleEn;
    element.img.rank.src = union.imgSrc;
    element.txt.raidMember.innerText = `${stats.raidMember[0]}/${stats.raidMember[1]}`;
  },

  setRaid: (rankIdx, jobClass, force = false) => {
    if (jobClass != "maplem") {
      if (!force && stats.raidMember[0] >= stats.raidMember[1]) {
        inform.show(inform.DANGER, "공격대원 가득참", "");
        return false;
      }
      element.txt.raidMember.innerText = `${++stats.raidMember[0]}/${stats.raidMember[1]}`;
    }
    stats.increaseMino(rankIdx, jobClass);
    return true;
  },
  unsetRaid: (rankIdx, jobClass) => {
    if (jobClass != "maplem")
      element.txt.raidMember.innerText = `${--stats.raidMember[0]}/${stats.raidMember[1]}`;
    stats.decreaseMino(rankIdx, jobClass);
  },
  increaseMino: (rankIdx, jobClass) => {
    if (rankIdx != -1) {
      if (jobClass == "xenon" || jobClass == "maplem") {
        const mino = element.mino[jobClass][0];
        mino.querySelectorAll("table:not(.invisible)").forEach((e) => (e.className = "invisible"));
        mino.querySelectorAll("table")[rankIdx].className = "";
        mino.querySelector("h6").innerText = ++stats.minoCount[jobClass][rankIdx];
        mino.className = "";
      } else {
        element.mino[jobClass][rankIdx].className = "";
        element.mino[jobClass][rankIdx].querySelector("h6").innerText = ++stats.minoCount[jobClass][
          rankIdx
        ];
      }
      stats.tileableCount += rankIdx + 1;
      map.updateTileCount();
    }
  },
  decreaseMino: (rankIdx, jobClass) => {
    if (rankIdx != -1) {
      if (jobClass == "xenon" || jobClass == "maplem") {
        const mino = element.mino[jobClass][0];
        mino.querySelectorAll("table:not(.invisible)").forEach((e) => (e.className = "invisible"));
        mino.querySelectorAll("table")[0].className = "";
        element.mino[jobClass][0].className = "disable";
        element.mino[jobClass][0].querySelector("h6").innerText = --stats.minoCount[jobClass][
          rankIdx
        ];
      } else {
        const count = --stats.minoCount[jobClass][rankIdx];
        if (count == 0) element.mino[jobClass][rankIdx].className = "disable";
        element.mino[jobClass][rankIdx].querySelector("h6").innerText = count;
      }
    }
    stats.tileableCount -= rankIdx + 1;
    map.updateTileCount();
  },
  resetMinoByInfoList: () => {
    // 모두 0으로 초기화
    for (jobClass in element.mino)
      element.mino[jobClass].forEach((mino, rankIdx) => {
        if (jobClass == "xenon" || jobClass == "maplem") {
          mino
            .querySelectorAll("table:not(.invisible)")
            .forEach((e) => (e.className = "invisible"));
          mino.querySelectorAll("table")[0].className = "";
          stats.minoCount[jobClass] = stats.minoCount[jobClass].map((c) => 0);
        } else stats.minoCount[jobClass][rankIdx] = 0;
        mino.className = "disable";
        mino.querySelector("h6").innerText = 0;
      });

    stats.raidMember[0] = 0;
    stats.tileableCount = 0;
    map.updateTileCount();
    element.txt.raidMember.innerText = `${stats.raidMember[0]}/${stats.raidMember[1]}`;

    // 모든 공격대원 레이드 추가
    character.infoList
      .filter((info) => info.raid)
      .forEach((info) => {
        info.raid = false;
        character.raid(info);
      });
  },
};
let inform = {
  INFO: 1,
  DANGER: 2,
  DEFAULT_DURATION: 3000,

  list: [
    // { type, title, text, removing, element}
  ],

  show: (type, title, text, duration = inform.DEFAULT_DURATION) => {
    const div = document.createElement("div");
    const hDiv = document.createElement("div");
    const img = document.createElement("img");
    const h4 = document.createElement("h4");

    div.className = "inform";
    if (type)
      img.src = `image/icon/${
        type == inform.INFO ? "info" : type == inform.DANGER ? "danger" : "info"
      }.svg`;
    h4.innerText = title;

    hDiv.appendChild(img);
    hDiv.appendChild(h4);
    div.appendChild(hDiv);
    if (text) {
      const p = document.createElement("p");
      p.innerText = text;
      div.appendChild(p);
    }

    div.style.visibility = "hidden";
    document.body.appendChild(div);
    div.style.top = `-${div.offsetHeight + 8}px`;
    setTimeout(() => (div.style.top = "20px"), 100);
    div.style.visibility = "";
    div.addEventListener("click", (event) =>
      inform.remove(event.path.find((e) => e.className == "inform"))
    );

    if (duration) setTimeout(inform.remove, duration, div);

    // 기존 inform 제거
    inform.list
      .filter((o) => o.type == type && o.title == title && o.text == text && !o.removing)
      .forEach((o) => inform.remove(o.element));
    inform.list.push({ type, title, text, removing: false, element: div });
    return div;
  },
  remove: (element) => {
    element.style.opacity = "0";
    setTimeout(() => {
      const idx = inform.list.findIndex((o) => o.element == element);
      if (idx != -1) inform.list.splice(idx, 1);
      element.remove();
    }, 300);
  },
};

function Main() {
  // Draw board & stats
  for (let i = 0; i < element.tile.length; i++) element.tile[i] = new Array(TILE.COL);
  DrawBoard();
  DrawStatsMino();

  // Tiler
  map.tiler = new Tiler();

  // Map event
  element.table.addEventListener("mouseleave", () => {
    if (map.click == 2) TILE.GROUP[map.hoverPos.g].forEach(map.unHover);
    else map.unHover(map.hoverPos);
    map.click = 0;
    map.hoverPos = { x: -1, y: -1, g: -1 };

    // Save map.selectedPos
    localStorage.selectedPos = JSON.stringify(map.selectedPos);
  });
  element.table.addEventListener("touchstart", onTableTouchStart);
  element.table.addEventListener("touchmove", onTableTouchMove);
  element.table.addEventListener("touchend", () => (map.click = 0));

  // Input text event
  element.txt.applyName.addEventListener("paste", onTxtClipboardPaste);

  // Map tool event
  element.img.trashMap.addEventListener("click", () => {
    if (map.solve == 2) {
      element.img.trashMap.src = "image/icon/trash.svg";
      RedrawBoard();
      map.solve = 0;
    } else map.selectedPos.slice().forEach(map.unSelect);
  });
  element.img.help.addEventListener("click", () =>
    inform.show(
      inform.INFO,
      "키 가이드",
      "[클릭 또는 터치]\n타일이 없으면: 생성\n타일이 있으면: 삭제\n\n" +
        "[더블 클릭 또는 연속 터치]\n타일이 없으면: 영역 생성\n타일이 있으면: 영역 삭제\n\n" +
        "[드래그]\n하나 또는 영역을 생성 및 삭제",
      0
    )
  );
  element.img.play.addEventListener("click", onPlay);
  element.div.cardList.addEventListener("wheel", (event) => {
    element.div.cardList.scrollLeft += event.deltaY / 2;
  });

  // Card tool event
  element.img.scroll.addEventListener("click", () => {
    if (element.div.cardList.classList.toggle("vertical"))
      element.img.scroll.src = "image/icon/arrows-shrink-h.svg";
    else element.img.scroll.src = "image/icon/arrows-shrink-v.svg";
  });
  element.img.zero.addEventListener("click", () => {
    const removeZ = character.infoList.find((o) => o.name == "제로 ");
    let prevLv = 0;
    let prevRaid = false;
    if (removeZ) {
      character.remove(removeZ);
      prevLv = removeZ.level;
      prevRaid = removeZ.raid;
    }

    if (prevLv < 250) {
      character.add({
        name: "제로 ",
        level:
          prevLv < 130 ? 130 : prevLv < 160 ? 160 : prevLv < 180 ? 180 : prevLv < 200 ? 200 : 250,
        job: "제로",
        imgUrl: "image/deco/zero-avatar.png",
      });

      const idx = character.infoList.findIndex((o) => o.name == "제로 ");
      if (idx == -1) return;
      info = character.infoList[idx];
      if (prevRaid && stats.setRaid(info.rankIdx, info.jobClass)) {
        info.element.classList.add("raid");
        info.raid = true;
      }
      character.sortElement();
    }
  });
  element.img.maplem.addEventListener("click", () => {
    const removeM = character.infoList.find((o) => o.job == "메이플M");
    let prevLv = 0;
    if (removeM) {
      character.remove(removeM);
      prevLv = removeM.level;
    }

    if (prevLv != 120) {
      character.add({
        name: "메이플M",
        level: prevLv == 0 ? 30 : prevLv == 30 ? 50 : prevLv == 50 ? 70 : 120,
        job: "메이플M",
        imgUrl: "image/deco/maplem-avatar.png",
      });
      character.raid(character.infoList.find((o) => o.job == "메이플M"));
    }
  });
  element.img.sync.addEventListener("click", () => {
    character.infoList.forEach((info) => {
      if (info.jobClass != "maplem" && info.name != "제로 ")
        onImgSyncClick({ target: { alt: info.name } });
    });
  });
  element.img.autoSelect.addEventListener("click", () => {
    const maplemInfo = character.infoList.find((o) => o.job == "메이플M");

    if (element.img.autoSelect.title == "전체 선택해제") {
      character.infoList.filter((info) => info.raid).forEach(character.raid);
      element.img.autoSelect.title = "자동선택";
      element.img.autoSelect.alt = "자동선택";
    } else {
      character.infoList.filter((info) => info.raid).forEach(character.raid);
      character.infoList.forEach((info) => {
        if (stats.raidMember[0] < stats.raidMember[1] && info.job.length > 0) character.raid(info);
        else return;
      });
      if (maplemInfo && !maplemInfo.raid) character.raid(maplemInfo);

      if (
        stats.raidMember[0] == stats.raidMember[1] ||
        character.infoList.filter((o) => o.job).findIndex((o) => !o.raid) == -1
      ) {
        element.img.autoSelect.title = "전체 선택해제";
        element.img.autoSelect.alt = "전체 선택해제";
      }
    }
  });
  element.img.trashCard.addEventListener("click", () => {
    character.infoList.slice().forEach(character.remove);
    stats.updateLevel();
  });

  // Load user data - character
  if (localStorage.infoList) {
    const infoList = JSON.parse(localStorage.infoList);
    if (Array.isArray(infoList) && infoList.length) {
      infoList.forEach(character.add);
      const raidNames = infoList.filter((o) => o.raid).map((o) => o.name);
      character.infoList
        .filter((info) => {
          let idx = raidNames.indexOf(info.name);
          if (idx == -1) return false;
          raidNames.splice(idx, 1);
          return true;
        })
        .forEach(character.raid);
      character.sortElement();
    }
  }

  // Load user data - map
  if (localStorage.selectedPos) {
    const selectedPos = JSON.parse(localStorage.selectedPos);
    selectedPos.forEach(map.select);
  }

  // Preload images
  [
    "image/deco/card-raid-0.svg",
    "image/deco/card-raid-1.svg",
    "image/deco/card-raid-2.svg",
    "image/deco/card-raid-3.svg",
  ].forEach((arg) => (new Image().src = arg)); // Preload images
}

function DrawBoard() {
  //base
  let x = 0,
    y = 0;
  for (y = 0; y < TILE.ROW; y++) {
    const tr = document.createElement("tr");
    for (x = 0; x < TILE.COL; x++) {
      const td = document.createElement("td");
      element.tile[y][x] = td;
      td.addEventListener("mouseenter", onTileMouseEnter);
      td.addEventListener("mousedown", onTileMouseDown);
      td.addEventListener("mouseup", onTileMouseUp);
      tr.appendChild(td);
    }
    element.table.appendChild(tr);
  }
  RedrawBoard();
}
function RedrawBoard() {
  // clear
  element.tile.forEach((row) =>
    row.forEach((e) => {
      e.style = "";
      e.innerHTML = "";
    })
  );

  // select background
  map.selectedPos.forEach(
    (p) => (element.tile[p.y][p.x].style.backgroundColor = TILE.COLOR.SELECTED)
  );

  // group background
  TILE.GROUP.forEach((g, gidx) => {
    let c = TILE.COLOR.GROUP[gidx];
    g.forEach((p) => (element.tile[p.y][p.x].style.color = c));
  });

  // inner boundary
  for (x = 5, y = [4, 14]; x <= 16; x++)
    y.forEach((yy) => (element.tile[yy][x].style.borderBottomColor = TILE.COLOR.BOUNDARY));
  for (y = 5, x = [4, 16]; y <= 14; y++)
    x.forEach((xx) => (element.tile[y][xx].style.borderRightColor = TILE.COLOR.BOUNDARY));

  // outer boundary
  const offset = 5 - stats.externalLevel;
  if (offset > 0 && offset < 5) {
    for (x = offset, y = [offset - 1, 19 - offset]; x < TILE.COL - offset; x++)
      y.forEach((yy) => (element.tile[yy][x].style.borderBottomColor = TILE.COLOR.BOUNDARY));
    for (y = offset, x = [offset - 1, 21 - offset]; y < TILE.ROW - offset; y++)
      x.forEach((xx) => (element.tile[y][xx].style.borderRightColor = TILE.COLOR.BOUNDARY));
  }

  // axis
  for (x = offset, y = TILE.ROW / 2 - 1; x < TILE.COL - offset; x++)
    element.tile[y][x].style.borderBottomColor = TILE.COLOR.BOUNDARY;
  for (y = offset, x = TILE.COL / 2 - 1; y < TILE.ROW - offset; y++)
    element.tile[y][x].style.borderRightColor = TILE.COLOR.BOUNDARY;

  // stair
  for (x = 1 + offset, y = [offset, 18 - offset]; x < 10; x++, y[0]++, y[1]--)
    y.forEach((yy) => (element.tile[yy][x].style.borderBottomColor = TILE.COLOR.BOUNDARY));
  for (x = 20 - offset, y = [offset, 18 - offset]; x > 11; x--, y[0]++, y[1]--)
    y.forEach((yy) => (element.tile[yy][x].style.borderBottomColor = TILE.COLOR.BOUNDARY));

  for (y = offset, x = [offset, 20 - offset]; y < 10; y++, x[0]++, x[1]--)
    x.forEach((xx) => (element.tile[y][xx].style.borderRightColor = TILE.COLOR.BOUNDARY));
  for (y = 19 - offset, x = [offset, 20 - offset]; y > 9; y--, x[0]++, x[1]--)
    x.forEach((xx) => (element.tile[y][xx].style.borderRightColor = TILE.COLOR.BOUNDARY));

  //
}
function DrawStatsMino() {
  const basicJobs = ["warrior", "wizard", "archer", "thief", "pirate"];
  const specialJobs = ["xenon", "maplem"];
  const minoTable = document.querySelector(".stats-mino");

  const CreateMino = (posSet, jobClass) => {
    const table = document.createElement("table");
    let noIcon = true;
    for (let y = 0; y < posSet.length; y++) {
      const tr = document.createElement("tr");
      for (let x = 0; x < posSet[0].length; x++) {
        const td = document.createElement("td");
        if (posSet[y][x]) {
          td.style.backgroundColor = TILE.COLOR.MINO[jobClass.toUpperCase()];
          if (noIcon && posSet[y][x] == 2) {
            const img = document.createElement("img");
            img.src = character.getMinoIconSrc(jobClass);
            td.appendChild(img);
            noIcon = false;
          }
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  };
  const CreateTd = (mino, rankIdx, jobClass) => {
    const td = document.createElement("td");
    const h = document.createElement("h6");
    h.innerText = "0";
    td.className = "disable";
    if (Array.isArray(mino)) mino.forEach((e) => td.appendChild(e));
    else td.appendChild(mino);
    td.appendChild(h);
    if (specialJobs.indexOf(jobClass) == -1)
      td.addEventListener("click", () => {
        stats.setRaid(rankIdx, jobClass, true);
        if (element.img.resetStats.className.length) element.img.resetStats.className = "";
      });
    return td;
  };
  const CreateReset = () => {
    const td = document.createElement("td");
    const img = document.createElement("img");
    const h = document.createElement("h6");
    img.src = "image/icon/sync.svg";
    h.innerText = "리셋";
    h.style.cursor = "pointer";
    td.className = "invisible";
    element.img.resetStats = td;

    td.appendChild(img);
    td.appendChild(h);
    td.addEventListener("click", () => {
      stats.resetMinoByInfoList();
      td.className = "invisible";
    });
    return td;
  };

  // 일반 직업
  const row = TILE.MINO_INDEX[basicJobs[0].toUpperCase()].length;
  for (let rankIdx = 0; rankIdx < row; rankIdx++) {
    const tr = document.createElement("tr");
    basicJobs.forEach((jobClass) => {
      const td = CreateTd(
        CreateMino(TILE.MINO_POS[TILE.MINO_INDEX[jobClass.toUpperCase()][rankIdx]], jobClass),
        rankIdx,
        jobClass
      );
      element.mino[jobClass].push(td);
      tr.appendChild(td);
    });

    // 리셋 버튼
    if (rankIdx == 0) tr.appendChild(CreateReset());
    minoTable.appendChild(tr);
  }

  // 특수 직업
  for (let i = 0; i < specialJobs.length; i++) {
    const minoIndexArr = TILE.MINO_INDEX[specialJobs[i].toUpperCase()];

    const minos = [CreateMino(TILE.MINO_POS[minoIndexArr[0]], specialJobs[i])];
    for (let j = 1; j < minoIndexArr.length; j++) {
      const mino = CreateMino(TILE.MINO_POS[minoIndexArr[j]], specialJobs[i]);
      mino.className = "invisible";
      minos.push(mino);
    }

    const td = CreateTd(minos, -1, specialJobs[i]);
    element.mino[specialJobs[i]].push(td);
    minoTable.childNodes[row - 1 - i].appendChild(td);
  }
}
function DrawSolution() {
  RedrawBoard();
  map.tiler.stack.forEach((node) => {
    map.place(
      node.point,
      map.tiler.minos[node.minoIdx].shapes[node.shapeIdx],
      map.tiler.minos[node.minoIdx].jobClass
    );
  });
}

function onTileMouseEnter(event) {
  event.stopPropagation();

  const hoverPos = {
    x: event.target.cellIndex,
    y: event.target.parentElement.rowIndex,
    g: -1,
  };

  if (map.click == 2) {
    hoverPos.g = map.findGroupIndex(hoverPos);
    if (hoverPos.g != map.hoverPos.g) {
      // 더블 클릭 때 타일 변화
      if (map.drawing) TILE.GROUP[hoverPos.g].filter(map.isNotSelected).forEach(map.select);
      else TILE.GROUP[hoverPos.g].filter(map.isSelected).forEach(map.unSelect);

      TILE.GROUP[map.hoverPos.g].forEach(map.unHover);
      TILE.GROUP[hoverPos.g].forEach(map.hover);
    }
  } else {
    if (map.click == 1) {
      // 싱글 클릭 때 타일 변화
      if (map.drawing) {
        if (map.isNotSelected(hoverPos)) map.select(hoverPos);
      } else if (map.isSelected(hoverPos)) map.unSelect(hoverPos);
    }
    map.unHover(map.hoverPos);
    map.hover(hoverPos);
  }

  map.hoverPos = hoverPos;
}
function onTileMouseDown(event) {
  if (event.button != 0) return;

  // 더블 클릭 체크
  map.click = 1;
  if (map.doubleClickTid == 0) {
    map.doubleClickPos = { x: map.hoverPos.x, y: map.hoverPos.y };
    map.doubleClickTid = setTimeout(() => (map.doubleClickTid = 0), map.doubleClickDuration);
  } else if (map.doubleClickPos.x == map.hoverPos.x && map.doubleClickPos.y == map.hoverPos.y) {
    map.hoverPos.g = map.findGroupIndex(map.hoverPos);
    map.click = 2;

    clearTimeout(map.doubleClickTid);
    map.doubleClickTid = 0;
  }

  if (map.click == 2) {
    // 더블 클릭에 타일 변화
    if (map.drawing) TILE.GROUP[map.hoverPos.g].filter(map.isNotSelected).forEach(map.select);
    else TILE.GROUP[map.hoverPos.g].filter(map.isSelected).forEach(map.unSelect);

    TILE.GROUP[map.hoverPos.g].filter(map.isNotHover).forEach(map.hover);
  } else {
    // 싱글 클릭에 드로잉 설정과 타일 변화
    if (map.isNotSelected(map.hoverPos)) {
      map.drawing = true;
      map.select(map.hoverPos);
    } else {
      map.drawing = false;
      map.unSelect(map.hoverPos);
    }
  }
}
function onTileMouseUp(event) {
  if (event.button != 0) return;

  if (map.click == 2) TILE.GROUP[map.hoverPos.g].filter(map.isNotHover).forEach(map.unHover);
  map.click = 0;

  // Save map.selectedPos
  localStorage.selectedPos = JSON.stringify(map.selectedPos);
}
function onTableTouchStart(event) {
  if (event.cancelable && map.solve == 0) {
    event.preventDefault();
    map.click = 1;

    const x = event.touches[0].pageX;
    const y = event.touches[0].pageY;
    const sx = element.table.offsetLeft;
    const sy = element.table.offsetTop;
    const ex = sx + element.table.offsetWidth;
    const ey = sy + element.table.offsetHeight;
    if (x < sx || x >= ex || y < sy || y >= ey) return;

    const sizeX = (ex - sx) / TILE.COL;
    const sizeY = (ey - sy) / TILE.ROW;
    map.hoverPos = {
      x: Math.floor((x - sx) / sizeX),
      y: Math.floor((y - sy) / sizeY),
      g: -1,
    };

    // 연속 터치 체크
    if (map.doubleClickTid == 0) {
      map.doubleClickPos = { x: map.hoverPos.x, y: map.hoverPos.y };
      map.doubleClickTid = setTimeout(() => (map.doubleClickTid = 0), map.doubleClickDuration);
    } else if (map.doubleClickPos.x == map.hoverPos.x && map.doubleClickPos.y == map.hoverPos.y) {
      map.hoverPos.g = map.findGroupIndex(map.hoverPos);
      map.click = 2;

      clearTimeout(map.doubleClickTid);
      map.doubleClickTid = 0;
    }

    if (map.click == 2) {
      // 연속 터치에 타일 변화
      if (map.drawing) TILE.GROUP[map.hoverPos.g].filter(map.isNotSelected).forEach(map.select);
      else TILE.GROUP[map.hoverPos.g].filter(map.isSelected).forEach(map.unSelect);
    } else {
      // 싱글 클릭에 드로잉 설정과 타일 변화
      if (map.isNotSelected(map.hoverPos)) {
        map.drawing = true;
        map.select(map.hoverPos);
      } else {
        map.drawing = false;
        map.unSelect(map.hoverPos);
      }
    }
  }
}
function onTableTouchMove(event) {
  const x = event.touches[0].pageX;
  const y = event.touches[0].pageY;
  const sx = element.table.offsetLeft;
  const sy = element.table.offsetTop;
  const ex = sx + element.table.offsetWidth;
  const ey = sy + element.table.offsetHeight;
  if (x < sx || x >= ex || y < sy || y >= ey) return;

  const sizeX = (ex - sx) / TILE.COL;
  const sizeY = (ey - sy) / TILE.ROW;
  const hoverPos = {
    x: Math.floor((x - sx) / sizeX),
    y: Math.floor((y - sy) / sizeY),
    g: -1,
  };
  if (hoverPos.x == map.hoverPos.x && hoverPos.y == map.hoverPos.y) return;

  if (map.click == 2) {
    hoverPos.g = map.findGroupIndex(hoverPos);
    if (hoverPos.g != map.hoverPos.g) {
      // 더블 클릭 때 타일 변화
      if (map.drawing) TILE.GROUP[hoverPos.g].filter(map.isNotSelected).forEach(map.select);
      else TILE.GROUP[hoverPos.g].filter(map.isSelected).forEach(map.unSelect);
    }
  } else {
    if (map.click == 1) {
      // 싱글 클릭 때 타일 변화
      if (map.drawing) {
        if (map.isNotSelected(hoverPos)) map.select(hoverPos);
      } else if (map.isSelected(hoverPos)) map.unSelect(hoverPos);
    }
  }

  map.hoverPos = hoverPos;
}
function onPlay(event) {
  if (!map.selectedPos.length) return;

  if (
    element.img.play.className == "map-tool-stop" ||
    (event.message && event.message.length > 0)
  ) {
    element.img.play.className = "map-tool-play";
    element.img.play.src = "image/icon/play-button-o.svg";
    element.img.play.setAttribute("alt", "시작");
    element.img.play.setAttribute("title", "시작");
    element.div.map.removeAttribute("style");
    map.tiler.abort = true;
  } else if (element.img.play.className == "map-tool-play") {
    element.img.play.className = "map-tool-stop";
    element.img.play.src = "image/icon/play-stop-o.svg";
    element.img.play.setAttribute("alt", "중지");
    element.img.play.setAttribute("title", "중지");
    element.img.trashMap.src = "image/icon/erase.svg";
    element.div.map.style.borderColor = "rgb(231, 76, 60)";

    // 계산 시작 시 타일 요약 메세지 내용
    let rankIdx = 4,
      content = "";
    const jobClassKor = {
        warrior: "전사",
        wizard: "마법사",
        archer: "궁수",
        thief: "도적",
        pirate: "해적",
        xenon: "제논",
        maplem: "메이플M",
      },
      rankStrArr = ["B", "A", "S", "SS", "SSS"];

    // SSS
    for (let jobClass in stats.minoCount) {
      if (jobClass == "maplem") continue;

      // 타일이 1개 이상 존재할 경우
      if (stats.minoCount[jobClass][rankIdx] > 0) {
        // 아직 "[SSS]" 타이틀이 들어가지 않았을 경우 추가
        if (content.length == 0) content = "[SSS]\n";

        content += `${jobClassKor[jobClass]}(${stats.minoCount[jobClass][rankIdx]})`;
      }
    }

    // SS ~ B
    for (rankIdx--; rankIdx >= 0; rankIdx--) {
      let contentPart = "";
      for (let jobClass in stats.minoCount)
        if (stats.minoCount[jobClass][rankIdx] > 0) {
          // 아직 "[SS~B]" 타이틀이 들어가지 않았을 경우 추가
          if (contentPart.length == 0) contentPart = `[${rankStrArr[rankIdx]}]\n`;
          else contentPart += ", ";

          contentPart += `${jobClassKor[jobClass]}(${stats.minoCount[jobClass][rankIdx]})`;
        }

      // 내용이 이미 존재할 경우 분리를 위해 2번 줄바꿈
      if (contentPart.length > 0 && content.length > 0) content += "\n\n";
      content += contentPart;
    }
    inform.show(inform.DANGER, "점령대 배치 계산 시작", content);
    map.solve = 1;
    map.tiler.solve().then((result) => {
      map.solve = 2;
      if (result.success == -1) return;

      element.img.play.className = "map-tool-play";
      element.img.play.src = "image/icon/play-button-o.svg";
      element.img.play.setAttribute("alt", "시작");
      element.img.play.setAttribute("title", "시작");
      element.div.map.removeAttribute("style");

      if (result.success == 0) {
        map.solve = 0;
        element.img.trashMap.src = "image/icon/trash.svg";
        inform.show(inform.DANGER, "점령대 배치 계산 실패", result.message);
      } else if (result.success == 1)
        inform.show(inform.INFO, "점령대 배치 계산 성공", result.message, 10000);
    });
  }
}

function onBtnApplyClick() {
  let charNames = element.txt.applyName.value.replace(/ /g, "").split("\n");
  for (let i = charNames.length - 1; i > 0; i--)
    if (charNames[i].length == 0) charNames.splice(i, 1);
  element.txt.applyName.value = charNames.join("\n");

  // Empty character names
  if (charNames.length == 0 || charNames[0].length == 0) {
    inform.show(inform.DANGER, "캐릭터 이름 없음", "캐릭터 이름 리스트를 입력해주세요.");
    return;
  }
  // Already added
  const existsChars = charNames.filter(
    (name) => character.infoList.findIndex((obj2) => obj2.name == name) != -1
  );
  if (existsChars.length) {
    inform.show(inform.DANGER, `이미 등록 됨 (${existsChars.length})`, existsChars.join(", "));
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", location.href + "apply");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify({ charNames: charNames.join(",") }));
  xhr.addEventListener("load", () => {
    if (xhr.status != 200) inform.show(inform.DANGER, "가져오기 실패", `응답 코드: ${xhr.status}`);
    else {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      if (data.error) inform.show(inform.DANGER, data.error[0], data.error[1], 5000);
      else {
        // Success POST

        // Info
        if (data.info && data.info.length) {
          inform.show(inform.INFO, "등록 완료", `${data.info.map((obj) => obj.name).join(", ")}`);

          data.info.forEach(character.add);
          character.sortElement();
        }

        // Sync
        if (data.sync && data.sync.length) {
          inform.show(
            inform.INFO,
            "동기화 중",
            `${data.sync.join(", ")}`,
            inform.DEFAULT_DURATION * 2
          );

          data.sync.forEach(character.addGhost);
        }

        element.txt.applyName.value = "";
      }
    }

    element.btn.apply.removeAttribute("disabled");
    element.btn.apply.textContent = "캐릭터 등록";
  });

  element.btn.apply.textContent = "등록하는 중...";
  element.btn.apply.setAttribute("disabled", "");
}
function onImgSyncClick(event) {
  if (event.stopPropagation) event.stopPropagation();

  const info = character.infoList.find((o) => o.name == event.target.alt);
  if (
    !info ||
    character.syncList.findIndex((o) => o.name == info.name) != -1 ||
    info.name == "제로 "
  )
    return;
  character.syncList.push(info);

  // POST
  const xhr = new XMLHttpRequest();
  xhr.open("POST", location.href + "sync");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify({ name: info.name }));
  xhr.addEventListener("load", () => {
    if (xhr.status != 200) inform.show(inform.DANGER, "동기화 실패", `응답 코드: ${xhr.status}`);
    else {
      const data = JSON.parse(xhr.responseText);
      if (data.error) {
        if (data.error[2] == 1) info.element.classList.remove("sync");
        else character.removeGhost(info.name);
        inform.show(inform.DANGER, data.error[0], data.error[1], 5000);
      } else {
        character.remove(info);
        character.add(data);
        if (info.raid) character.raid(character.infoList[character.infoList.length - 1]);

        character.sortElement();
        stats.updateLevel();

        element.txt.applyName.value = "";
        inform.show(inform.INFO, "동기화 완료", info.name);
      }
    }

    character.syncList.splice(
      character.syncList.findIndex((o) => o.name == info.name),
      1
    );
    info.element.classList.remove("sync");
  });
  info.element.classList.add("sync");
}
function onTxtClipboardPaste(event) {
  let data = (event.clipboardData || window.clipboardData).getData("Text");
  let names = [];

  if (data.indexOf("월드/") > -1) {
    // pc
    data = data.split(/\r\n|\n|\r/);
    let idx = data.findIndex((str) => str.indexOf("터 선") != -1) + 2;
    if (idx >= data.length) return;

    const twistedNames = data[idx].split(data[idx - 1]);
    names.push(twistedNames[0]);
    if (twistedNames.length >= 2)
      for (let i = 1; i < twistedNames.length - 1; i++)
        names.push(twistedNames[i].substr(names[i - 1].length));
  } else if (data.indexOf("월드 ") > -1) {
    // mobile
    data = data.split(/\r\n|\n|\r/);
    let recentName = "";

    for (let i = data.findIndex((str) => str.indexOf("터 선") != -1) + 1; i < data.length; i++) {
      if (data[i].indexOf("표 캐") != -1 || data[i].indexOf("플 핸") != -1) break;

      const name = data[i].trim();
      if (name.length > 0 && name != recentName) names.push((recentName = name));
    }
  } else return;

  element.txt.applyName.value = names.join("\n");
  event.stopPropagation();
  event.preventDefault();
}

Main();
