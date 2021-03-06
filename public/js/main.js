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
          // ?????? ??????
          const x = sx + j;
          const y = sy + i;
          const color = TILE.COLOR.MINO[jobClass.toUpperCase()];
          const img = document.createElement("img");
          const td = element.tile[y][x];

          // ?????? ??????
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

          // ?????? ?????????
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
      "??????",
      "?????????",
      "?????????",
      "????????????",
      "???????????????",
      "?????????",
      "?????????",
      "?????????",
      "?????????",
      "???????????????",
      "???????????????",
      "?????????",
      "??????",
      "??????????????????",
      "???????????????",
      "????????????",
      "?????????",
      "??????",
      "??????",
    ],
    WIZARD: [
      "?????????",
      "?????????(???,???)",
      "?????????(???,???)",
      "?????????",
      "?????????(???,???)",
      "?????????(???,???)",
      "????????????",
      "???????????????(???,???)",
      "???????????????(???,???)",
      "??????",
      "??????????????????",
      "??????",
      "???????????????",
      "????????????",
      "????????????",
      "?????????",
      "??????",
    ],
    ARCHER: [
      "??????",
      "??????",
      "??????",
      "?????????",
      "?????????",
      "???????????????",
      "??????",
      "??????(???????????????)",
      "??????????????????",
      "?????????",
      "???????????????",
      "??????????????????",
      "???????????????",
      "???????????????",
      "??????",
    ],
    THIEF: [
      "??????",
      "?????????",
      "??????",
      "??????",
      "???????????????",
      "???????????????",
      "?????????",
      "???????????????",
      "?????????",
      "???????????????",
      "?????????",
      "??????????????????",
      "???????????????",
      "??????",
      "?????????",
      "??????",
    ],
    PIRATE: [
      "??????",
      "????????????",
      "????????????",
      "????????????",
      "????????????",
      "?????????",
      "??????????????????",
      "?????????",
      "??????",
      "???????????????",
      "???????????????",
      "?????????",
      "??????????????????",
      "??????",
      "??????",
    ],
    XENON: ["??????"],
    MAPLEM: ["?????????M"],
    NOUNION: ["?????????", "????????????", "?????????"],
  },
  EFFECT: {
    ??????: "",
    ?????????: "STR 10/20/40/80/100 ??????",
    ?????????: "STR 10/20/40/80/100 ??????",
    ????????????: "?????? HP 2/3/4/5/6% ??????",
    ???????????????: "STR 10/20/40/80/100 ??????",
    ?????????: "STR 10/20/40/80/100 ??????",
    ?????????: "?????? HP 2/3/4/5/6% ??????",
    ?????????: "STR 10/20/40/80/100 ??????",
    ?????????: "STR 10/20/40/80/100 ??????",
    ???????????????: "?????? HP 2/3/4/5/6% ??????",
    ???????????????: "?????? HP 250/500/1000/2000/2500 ??????",
    ?????????: "?????? HP 250/500/1000/2000/2500 ??????",
    ??????: "??? ?????? ??? 70%??? ????????? ?????? HP??? 2/4/6/8/10% ?????? ?????? ???\n?????? ?????? ????????? ??????????????? ????????? 2??? (10????????? 1???)",
    ??????????????????: "?????? ?????? ?????? ?????? 1/2/3/4/5 ??????",
    ???????????????: "?????? ?????? ??? ????????? 1/2/3/5/6% ??????",
    ????????????: "????????? ?????? 1/2/3/5/6% ??????",
    ?????????: "STR 10/20/40/80/100 ??????",
    ??????: "????????? ????????? 4/6/8/10/12% ??????",
    ??????: "STR 10/20/40/80/100 ??????",

    ?????????: "",
    "?????????(???,???)": "?????? MP 2/3/4/5/6% ??????",
    "?????????(???,???)": "INT 10/20/40/80/100 ??????",
    ?????????: "INT 10/20/40/80/100 ??????",
    "?????????(???,???)": "?????? MP 2/3/4/5/6% ??????",
    "?????????(???,???)": "INT 10/20/40/80/100 ??????",
    ????????????: "INT 10/20/40/80/100 ??????",
    "???????????????(???,???)": "?????? MP 2/3/4/5/6% ??????",
    "???????????????(???,???)": "INT 10/20/40/80/100 ??????",
    ??????: "INT 10/20/40/80/100 ??????",
    ??????????????????: "INT 10/20/40/80/100 ??????",
    ??????: "??? ?????? ??? 70%??? ????????? ?????? MP??? 2/4/6/8/10% ?????? ?????? ???\n?????? ?????? ????????? ??????????????? ????????? 2??? (10????????? 1???)",
    ???????????????: "INT 10/20/40/80/100 ??????",
    ????????????: "INT 10/20/40/80/100 ??????",
    ????????????: "INT 10/20/40/80/100 ??????",
    ?????????: "INT 10/20/40/80/100 ??????",
    ??????: "INT 10/20/40/80/100 ??????",

    ??????: "",
    ??????: "DEX 10/20/40/80/100 ??????",
    ??????: "???????????? ?????? 1/2/3/4/5% ??????",
    ?????????: "DEX 10/20/40/80/100 ??????",
    ?????????: "???????????? ?????? 1/2/3/4/5% ??????",
    ???????????????: "DEX 10/20/40/80/100 ??????",
    ??????: "???????????? ?????? 1/2/3/4/5% ??????",
    "??????(???????????????)": "DEX 10/20/40/80/100 ??????",
    ??????????????????: "DEX 10/20/40/80/100 ??????",
    ?????????: "DEX 10/20/40/80/100 ??????",
    ???????????????: "DEX 10/20/40/80/100 ??????",
    ??????????????????: "DEX 10/20/40/80/100 ??????",
    ???????????????: "?????? ??? 20% ????????? ????????? 4/8/12/16/20% ??????",
    ???????????????: "?????? ????????? ???????????? 2/3/4/5/6% ??????\n(1??? ???????????? ???????????? ??????)",
    ??????: "DEX 10/20/40/80/100 ??????",

    ??????: "",
    ?????????: "???????????? ?????? 1/2/3/4/5% ??????",
    ??????: "LUK 10/20/40/80/100 ??????",
    ??????: "???????????? ?????? 1/2/3/4/5% ??????",
    ???????????????: "LUK 10/20/40/80/100 ??????",
    ???????????????: "???????????? ?????? 1/2/3/4/5% ??????",
    ?????????: "LUK 10/20/40/80/100 ??????",
    ???????????????: "",
    ?????????: "LUK 10/20/40/80/100 ??????",
    ???????????????: "LUK 10/20/40/80/100 ??????",
    ?????????: "LUK 10/20/40/80/100 ??????",
    ??????????????????: "LUK 10/20/40/80/100 ??????",
    ???????????????: "LUK 10/20/40/80/100 ??????",
    ??????: "?????? ????????? 1/2/3/4/5% ??????",
    ?????????: "LUK 10/20/40/80/100 ??????",
    ??????: "LUK 10/20/40/80/100 ??????",

    ??????: "",
    ????????????: "STR 10/20/40/80/100 ??????",
    ????????????: "????????? ?????? ?????? 4/6/8/10/12% ??????",
    ????????????: "STR 10/20/40/80/100 ??????",
    ????????????: "STR 10/20/40/80/100 ??????",
    ?????????: "????????? ?????? ?????? 4/6/8/10/12% ??????",
    ??????????????????: "STR 10/20/40/80/100 ??????",
    ?????????: "STR 10/20/40/80/100 ??????",
    ??????: "????????? ?????? ?????? 4/6/8/10/12% ??????",
    ???????????????: "STR 10/20/40/80/100 ??????",
    ???????????????: "STR 10/20/40/80/100 ??????",
    ?????????: "?????? ?????? ?????? 5/10/15/20/25% ??????",
    ??????????????????: "DEX 10/20/40/80/100 ??????",
    ??????: "???????????? ????????? 1/2/3/5/6% ??????",
    ??????: "STR 10/20/40/80/100 ??????",

    ??????: "STR??DEX??LUK ?????? 5/10/20/40/50 ??????",
    ?????????M: "?????????/?????? 5/10/15/20 ??????",

    ?????????: "",
    ????????????: "",
    ?????????: "",
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
        "?????????",
        `${info.job}???(???) ???????????? ????????? ??? ?????? ???????????????.\n?????????: ${info.name}`
      );
      e.remove();
      return;
    }

    //rank
    let rankStr = "",
      rankIdx = -1;
    if (info.job == "??????") {
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
    } else if (info.job == "?????????M") {
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
    if (info.name == "?????? ") {
      imgTool[0].style.display = "none";
      e.style.order = 97;
    } else if (info.name == "?????????M") {
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
          o.job == "?????????M" ? 97 : (o.element.style.order = o.rankIdx == -1 ? 98 : i))
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
      if (character.infoList[i].job == "?????????M") maxNum = Math.min(character.infoList.length, 43);
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
      union.titleKo = "????????? ????????? ?????????";
      union.titleEn = "GRAND MASTER UNION";

      stats.raidMember[1] = 35 + union.detailLevel;
    } else if (tl >= 5500) {
      union.detailLevel = Math.floor((tl - 5000) / 500);
      union.titleKo = "????????? ?????????";
      union.titleEn = "MASTER UNION";

      stats.raidMember[1] = 26 + union.detailLevel;
    } else if (tl >= 3000) {
      union.detailLevel = Math.floor((tl - 2500) / 500);
      union.titleKo = "????????? ?????????";
      union.titleEn = "VETERAN UNION";

      stats.raidMember[1] = 17 + union.detailLevel;
    } else {
      union.detailLevel = Math.max(Math.floor(tl / 500), 1);
      union.titleKo = "????????? ?????????";
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
        inform.show(inform.DANGER, "???????????? ?????????", "");
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
    // ?????? 0?????? ?????????
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

    // ?????? ???????????? ????????? ??????
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

    // ?????? inform ??????
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
      "??? ?????????",
      "[?????? ?????? ??????]\n????????? ?????????: ??????\n????????? ?????????: ??????\n\n" +
        "[?????? ?????? ?????? ?????? ??????]\n????????? ?????????: ?????? ??????\n????????? ?????????: ?????? ??????\n\n" +
        "[?????????]\n?????? ?????? ????????? ?????? ??? ??????",
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
    const removeZ = character.infoList.find((o) => o.name == "?????? ");
    let prevLv = 0;
    let prevRaid = false;
    if (removeZ) {
      character.remove(removeZ);
      prevLv = removeZ.level;
      prevRaid = removeZ.raid;
    }

    if (prevLv < 250) {
      character.add({
        name: "?????? ",
        level:
          prevLv < 130 ? 130 : prevLv < 160 ? 160 : prevLv < 180 ? 180 : prevLv < 200 ? 200 : 250,
        job: "??????",
        imgUrl: "image/deco/zero-avatar.png",
      });

      const idx = character.infoList.findIndex((o) => o.name == "?????? ");
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
    const removeM = character.infoList.find((o) => o.job == "?????????M");
    let prevLv = 0;
    if (removeM) {
      character.remove(removeM);
      prevLv = removeM.level;
    }

    if (prevLv != 120) {
      character.add({
        name: "?????????M",
        level: prevLv == 0 ? 30 : prevLv == 30 ? 50 : prevLv == 50 ? 70 : 120,
        job: "?????????M",
        imgUrl: "image/deco/maplem-avatar.png",
      });
      character.raid(character.infoList.find((o) => o.job == "?????????M"));
    }
  });
  element.img.sync.addEventListener("click", () => {
    character.infoList.forEach((info) => {
      if (info.jobClass != "maplem" && info.name != "?????? ")
        onImgSyncClick({ target: { alt: info.name } });
    });
  });
  element.img.autoSelect.addEventListener("click", () => {
    const maplemInfo = character.infoList.find((o) => o.job == "?????????M");

    if (element.img.autoSelect.title == "?????? ????????????") {
      character.infoList.filter((info) => info.raid).forEach(character.raid);
      element.img.autoSelect.title = "????????????";
      element.img.autoSelect.alt = "????????????";
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
        element.img.autoSelect.title = "?????? ????????????";
        element.img.autoSelect.alt = "?????? ????????????";
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
    h.innerText = "??????";
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

  // ?????? ??????
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

    // ?????? ??????
    if (rankIdx == 0) tr.appendChild(CreateReset());
    minoTable.appendChild(tr);
  }

  // ?????? ??????
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
      // ?????? ?????? ??? ?????? ??????
      if (map.drawing) TILE.GROUP[hoverPos.g].filter(map.isNotSelected).forEach(map.select);
      else TILE.GROUP[hoverPos.g].filter(map.isSelected).forEach(map.unSelect);

      TILE.GROUP[map.hoverPos.g].forEach(map.unHover);
      TILE.GROUP[hoverPos.g].forEach(map.hover);
    }
  } else {
    if (map.click == 1) {
      // ?????? ?????? ??? ?????? ??????
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

  // ?????? ?????? ??????
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
    // ?????? ????????? ?????? ??????
    if (map.drawing) TILE.GROUP[map.hoverPos.g].filter(map.isNotSelected).forEach(map.select);
    else TILE.GROUP[map.hoverPos.g].filter(map.isSelected).forEach(map.unSelect);

    TILE.GROUP[map.hoverPos.g].filter(map.isNotHover).forEach(map.hover);
  } else {
    // ?????? ????????? ????????? ????????? ?????? ??????
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

    // ?????? ?????? ??????
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
      // ?????? ????????? ?????? ??????
      if (map.drawing) TILE.GROUP[map.hoverPos.g].filter(map.isNotSelected).forEach(map.select);
      else TILE.GROUP[map.hoverPos.g].filter(map.isSelected).forEach(map.unSelect);
    } else {
      // ?????? ????????? ????????? ????????? ?????? ??????
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
      // ?????? ?????? ??? ?????? ??????
      if (map.drawing) TILE.GROUP[hoverPos.g].filter(map.isNotSelected).forEach(map.select);
      else TILE.GROUP[hoverPos.g].filter(map.isSelected).forEach(map.unSelect);
    }
  } else {
    if (map.click == 1) {
      // ?????? ?????? ??? ?????? ??????
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
    element.img.play.setAttribute("alt", "??????");
    element.img.play.setAttribute("title", "??????");
    element.div.map.removeAttribute("style");
    map.tiler.abort = true;
  } else if (element.img.play.className == "map-tool-play") {
    element.img.play.className = "map-tool-stop";
    element.img.play.src = "image/icon/play-stop-o.svg";
    element.img.play.setAttribute("alt", "??????");
    element.img.play.setAttribute("title", "??????");
    element.img.trashMap.src = "image/icon/erase.svg";
    element.div.map.style.borderColor = "rgb(231, 76, 60)";

    // ?????? ?????? ??? ?????? ?????? ????????? ??????
    let rankIdx = 4,
      content = "";
    const jobClassKor = {
        warrior: "??????",
        wizard: "?????????",
        archer: "??????",
        thief: "??????",
        pirate: "??????",
        xenon: "??????",
        maplem: "?????????M",
      },
      rankStrArr = ["B", "A", "S", "SS", "SSS"];

    // SSS
    for (let jobClass in stats.minoCount) {
      if (jobClass == "maplem") continue;

      // ????????? 1??? ?????? ????????? ??????
      if (stats.minoCount[jobClass][rankIdx] > 0) {
        // ?????? "[SSS]" ???????????? ???????????? ????????? ?????? ??????
        if (content.length == 0) content = "[SSS]\n";

        content += `${jobClassKor[jobClass]}(${stats.minoCount[jobClass][rankIdx]})`;
      }
    }

    // SS ~ B
    for (rankIdx--; rankIdx >= 0; rankIdx--) {
      let contentPart = "";
      for (let jobClass in stats.minoCount)
        if (stats.minoCount[jobClass][rankIdx] > 0) {
          // ?????? "[SS~B]" ???????????? ???????????? ????????? ?????? ??????
          if (contentPart.length == 0) contentPart = `[${rankStrArr[rankIdx]}]\n`;
          else contentPart += ", ";

          contentPart += `${jobClassKor[jobClass]}(${stats.minoCount[jobClass][rankIdx]})`;
        }

      // ????????? ?????? ????????? ?????? ????????? ?????? 2??? ?????????
      if (contentPart.length > 0 && content.length > 0) content += "\n\n";
      content += contentPart;
    }
    inform.show(inform.DANGER, "????????? ?????? ?????? ??????", content);
    map.solve = 1;
    map.tiler.solve().then((result) => {
      map.solve = 2;
      if (result.success == -1) return;

      element.img.play.className = "map-tool-play";
      element.img.play.src = "image/icon/play-button-o.svg";
      element.img.play.setAttribute("alt", "??????");
      element.img.play.setAttribute("title", "??????");
      element.div.map.removeAttribute("style");

      if (result.success == 0) {
        map.solve = 0;
        element.img.trashMap.src = "image/icon/trash.svg";
        inform.show(inform.DANGER, "????????? ?????? ?????? ??????", result.message);
      } else if (result.success == 1)
        inform.show(inform.INFO, "????????? ?????? ?????? ??????", result.message, 10000);
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
    inform.show(inform.DANGER, "????????? ?????? ??????", "????????? ?????? ???????????? ??????????????????.");
    return;
  }
  // Already added
  const existsChars = charNames.filter(
    (name) => character.infoList.findIndex((obj2) => obj2.name == name) != -1
  );
  if (existsChars.length) {
    inform.show(inform.DANGER, `?????? ?????? ??? (${existsChars.length})`, existsChars.join(", "));
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", location.href + "apply");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify({ charNames: charNames.join(",") }));
  xhr.addEventListener("load", () => {
    if (xhr.status != 200) inform.show(inform.DANGER, "???????????? ??????", `?????? ??????: ${xhr.status}`);
    else {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      if (data.error) inform.show(inform.DANGER, data.error[0], data.error[1], 5000);
      else {
        // Success POST

        // Info
        if (data.info && data.info.length) {
          inform.show(inform.INFO, "?????? ??????", `${data.info.map((obj) => obj.name).join(", ")}`);

          data.info.forEach(character.add);
          character.sortElement();
        }

        // Sync
        if (data.sync && data.sync.length) {
          inform.show(
            inform.INFO,
            "????????? ???",
            `${data.sync.join(", ")}`,
            inform.DEFAULT_DURATION * 2
          );

          data.sync.forEach(character.addGhost);
        }

        element.txt.applyName.value = "";
      }
    }

    element.btn.apply.removeAttribute("disabled");
    element.btn.apply.textContent = "????????? ??????";
  });

  element.btn.apply.textContent = "???????????? ???...";
  element.btn.apply.setAttribute("disabled", "");
}
function onImgSyncClick(event) {
  if (event.stopPropagation) event.stopPropagation();

  const info = character.infoList.find((o) => o.name == event.target.alt);
  if (
    !info ||
    character.syncList.findIndex((o) => o.name == info.name) != -1 ||
    info.name == "?????? "
  )
    return;
  character.syncList.push(info);

  // POST
  const xhr = new XMLHttpRequest();
  xhr.open("POST", location.href + "sync");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify({ name: info.name }));
  xhr.addEventListener("load", () => {
    if (xhr.status != 200) inform.show(inform.DANGER, "????????? ??????", `?????? ??????: ${xhr.status}`);
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
        inform.show(inform.INFO, "????????? ??????", info.name);
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

  if (data.indexOf("??????/") > -1) {
    // pc
    data = data.split(/\r\n|\n|\r/);
    let idx = data.findIndex((str) => str.indexOf("??? ???") != -1) + 2;
    if (idx >= data.length) return;

    const twistedNames = data[idx].split(data[idx - 1]);
    names.push(twistedNames[0]);
    if (twistedNames.length >= 2)
      for (let i = 1; i < twistedNames.length - 1; i++)
        names.push(twistedNames[i].substr(names[i - 1].length));
  } else if (data.indexOf("?????? ") > -1) {
    // mobile
    data = data.split(/\r\n|\n|\r/);
    let recentName = "";

    for (let i = data.findIndex((str) => str.indexOf("??? ???") != -1) + 1; i < data.length; i++) {
      if (data[i].indexOf("??? ???") != -1 || data[i].indexOf("??? ???") != -1) break;

      const name = data[i].trim();
      if (name.length > 0 && name != recentName) names.push((recentName = name));
    }
  } else return;

  element.txt.applyName.value = names.join("\n");
  event.stopPropagation();
  event.preventDefault();
}

Main();
