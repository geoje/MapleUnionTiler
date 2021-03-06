const TILE = {
  ROW: 20,
  COL: 22,
  COLOR: {
    GROUP: [
      "rgb(57, 57, 57)",
      "rgb(76, 76, 76)",
      "rgb(57, 57, 57)",
      "rgb(76, 76, 76)",
      "rgb(57, 57, 57)",
      "rgb(76, 76, 76)",
      "rgb(57, 57, 57)",
      "rgb(76, 76, 76)",
      "rgb(34, 34, 34)",
      "rgb(43, 43, 43)",
      "rgb(34, 34, 34)",
      "rgb(43, 43, 43)",
      "rgb(34, 34, 34)",
      "rgb(43, 43, 43)",
      "rgb(34, 34, 34)",
      "rgb(43, 43, 43)",
    ],
    SELECTED: "rgb(170, 150, 129)",
    BOUNDARY: "rgb(200, 200, 200)",
    MINO: {
      WARRIOR: "rgb(155, 37, 69)",
      WIZARD: "rgb(60, 117, 144)",
      ARCHER: "rgb(99, 121, 49)",
      THIEF: "rgb(102, 75, 168)",
      PIRATE: "rgb(85, 85, 85)",
      XENON: "rgb(102, 75, 168)",
      MAPLEM: "rgb(204, 85, 0)",
    },
  },
  GROUP: [
    [
      //int
      { x: 12, y: 9 },
      { x: 13, y: 8 },
      { x: 13, y: 9 },
      { x: 14, y: 7 },
      { x: 14, y: 8 },
      { x: 14, y: 9 },
      { x: 15, y: 6 },
      { x: 15, y: 7 },
      { x: 15, y: 8 },
      { x: 15, y: 9 },
      { x: 16, y: 5 },
      { x: 16, y: 6 },
      { x: 16, y: 7 },
      { x: 16, y: 8 },
      { x: 16, y: 9 },
    ],
    [
      //dex
      { x: 11, y: 9 },
      { x: 11, y: 8 },
      { x: 11, y: 7 },
      { x: 11, y: 6 },
      { x: 11, y: 5 },
      { x: 12, y: 5 },
      { x: 12, y: 6 },
      { x: 12, y: 7 },
      { x: 12, y: 8 },
      { x: 13, y: 5 },
      { x: 13, y: 6 },
      { x: 13, y: 7 },
      { x: 14, y: 5 },
      { x: 14, y: 6 },
      { x: 15, y: 5 },
    ],
    [
      //str
      { x: 6, y: 5 },
      { x: 7, y: 5 },
      { x: 7, y: 6 },
      { x: 8, y: 5 },
      { x: 8, y: 6 },
      { x: 8, y: 7 },
      { x: 9, y: 5 },
      { x: 9, y: 6 },
      { x: 9, y: 7 },
      { x: 9, y: 8 },
      { x: 10, y: 5 },
      { x: 10, y: 6 },
      { x: 10, y: 7 },
      { x: 10, y: 8 },
      { x: 10, y: 9 },
    ],
    [
      //mp
      { x: 5, y: 5 },
      { x: 5, y: 6 },
      { x: 5, y: 7 },
      { x: 5, y: 8 },
      { x: 5, y: 9 },
      { x: 6, y: 6 },
      { x: 6, y: 7 },
      { x: 6, y: 8 },
      { x: 6, y: 9 },
      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 7, y: 9 },
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 9, y: 9 },
    ],
    [
      //hp
      { x: 5, y: 10 },
      { x: 5, y: 11 },
      { x: 5, y: 12 },
      { x: 5, y: 13 },
      { x: 5, y: 14 },
      { x: 6, y: 10 },
      { x: 6, y: 11 },
      { x: 6, y: 12 },
      { x: 6, y: 13 },
      { x: 7, y: 10 },
      { x: 7, y: 11 },
      { x: 7, y: 12 },
      { x: 8, y: 10 },
      { x: 8, y: 11 },
      { x: 9, y: 10 },
    ],
    [
      //ap
      { x: 6, y: 14 },
      { x: 7, y: 13 },
      { x: 7, y: 14 },
      { x: 8, y: 12 },
      { x: 8, y: 13 },
      { x: 8, y: 14 },
      { x: 9, y: 11 },
      { x: 9, y: 12 },
      { x: 9, y: 13 },
      { x: 9, y: 14 },
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
      { x: 10, y: 13 },
      { x: 10, y: 14 },
    ],
    [
      //ad
      { x: 11, y: 10 },
      { x: 11, y: 11 },
      { x: 11, y: 12 },
      { x: 11, y: 13 },
      { x: 11, y: 14 },
      { x: 12, y: 11 },
      { x: 12, y: 12 },
      { x: 12, y: 13 },
      { x: 12, y: 14 },
      { x: 13, y: 12 },
      { x: 13, y: 13 },
      { x: 13, y: 14 },
      { x: 14, y: 13 },
      { x: 14, y: 14 },
      { x: 15, y: 14 },
    ],
    [
      //luk
      { x: 12, y: 10 },
      { x: 13, y: 10 },
      { x: 13, y: 11 },
      { x: 14, y: 10 },
      { x: 14, y: 11 },
      { x: 14, y: 12 },
      { x: 15, y: 10 },
      { x: 15, y: 11 },
      { x: 15, y: 12 },
      { x: 15, y: 13 },
      { x: 16, y: 10 },
      { x: 16, y: 11 },
      { x: 16, y: 12 },
      { x: 16, y: 13 },
      { x: 16, y: 14 },
    ],
    [
      //critical probability
      { x: 17, y: 4 },
      { x: 17, y: 5 },
      { x: 17, y: 6 },
      { x: 17, y: 7 },
      { x: 17, y: 8 },
      { x: 17, y: 9 },
      { x: 18, y: 3 },
      { x: 18, y: 4 },
      { x: 18, y: 5 },
      { x: 18, y: 6 },
      { x: 18, y: 7 },
      { x: 18, y: 8 },
      { x: 18, y: 9 },
      { x: 19, y: 2 },
      { x: 19, y: 3 },
      { x: 19, y: 4 },
      { x: 19, y: 5 },
      { x: 19, y: 6 },
      { x: 19, y: 7 },
      { x: 19, y: 8 },
      { x: 19, y: 9 },
      { x: 20, y: 1 },
      { x: 20, y: 2 },
      { x: 20, y: 3 },
      { x: 20, y: 4 },
      { x: 20, y: 5 },
      { x: 20, y: 6 },
      { x: 20, y: 7 },
      { x: 20, y: 8 },
      { x: 20, y: 9 },
      { x: 21, y: 0 },
      { x: 21, y: 1 },
      { x: 21, y: 2 },
      { x: 21, y: 3 },
      { x: 21, y: 4 },
      { x: 21, y: 5 },
      { x: 21, y: 6 },
      { x: 21, y: 7 },
      { x: 21, y: 8 },
      { x: 21, y: 9 },
    ],
    [
      //experience
      { x: 11, y: 0 },
      { x: 11, y: 1 },
      { x: 11, y: 2 },
      { x: 11, y: 3 },
      { x: 11, y: 4 },
      { x: 12, y: 0 },
      { x: 12, y: 1 },
      { x: 12, y: 2 },
      { x: 12, y: 3 },
      { x: 12, y: 4 },
      { x: 13, y: 0 },
      { x: 13, y: 1 },
      { x: 13, y: 2 },
      { x: 13, y: 3 },
      { x: 13, y: 4 },
      { x: 14, y: 0 },
      { x: 14, y: 1 },
      { x: 14, y: 2 },
      { x: 14, y: 3 },
      { x: 14, y: 4 },
      { x: 15, y: 0 },
      { x: 15, y: 1 },
      { x: 15, y: 2 },
      { x: 15, y: 3 },
      { x: 15, y: 4 },
      { x: 16, y: 0 },
      { x: 16, y: 1 },
      { x: 16, y: 2 },
      { x: 16, y: 3 },
      { x: 16, y: 4 },
      { x: 17, y: 0 },
      { x: 17, y: 1 },
      { x: 17, y: 2 },
      { x: 17, y: 3 },
      { x: 18, y: 0 },
      { x: 18, y: 1 },
      { x: 18, y: 2 },
      { x: 19, y: 0 },
      { x: 19, y: 1 },
      { x: 20, y: 0 },
    ],
    [
      //tolerance
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 5, y: 0 },
      { x: 5, y: 1 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 6, y: 0 },
      { x: 6, y: 1 },
      { x: 6, y: 2 },
      { x: 6, y: 3 },
      { x: 6, y: 4 },
      { x: 7, y: 0 },
      { x: 7, y: 1 },
      { x: 7, y: 2 },
      { x: 7, y: 3 },
      { x: 7, y: 4 },
      { x: 8, y: 0 },
      { x: 8, y: 1 },
      { x: 8, y: 2 },
      { x: 8, y: 3 },
      { x: 8, y: 4 },
      { x: 9, y: 0 },
      { x: 9, y: 1 },
      { x: 9, y: 2 },
      { x: 9, y: 3 },
      { x: 9, y: 4 },
      { x: 10, y: 0 },
      { x: 10, y: 1 },
      { x: 10, y: 2 },
      { x: 10, y: 3 },
      { x: 10, y: 4 },
    ],
    [
      //critical damage
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
      { x: 0, y: 4 },
      { x: 0, y: 5 },
      { x: 0, y: 6 },
      { x: 0, y: 7 },
      { x: 0, y: 8 },
      { x: 0, y: 9 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 1, y: 4 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
      { x: 1, y: 7 },
      { x: 1, y: 8 },
      { x: 1, y: 9 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 2, y: 4 },
      { x: 2, y: 5 },
      { x: 2, y: 6 },
      { x: 2, y: 7 },
      { x: 2, y: 8 },
      { x: 2, y: 9 },
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 3, y: 6 },
      { x: 3, y: 7 },
      { x: 3, y: 8 },
      { x: 3, y: 9 },
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 4, y: 6 },
      { x: 4, y: 7 },
      { x: 4, y: 8 },
      { x: 4, y: 9 },
    ],
    [
      //defense
      { x: 0, y: 10 },
      { x: 0, y: 11 },
      { x: 0, y: 12 },
      { x: 0, y: 13 },
      { x: 0, y: 14 },
      { x: 0, y: 15 },
      { x: 0, y: 16 },
      { x: 0, y: 17 },
      { x: 0, y: 18 },
      { x: 0, y: 19 },
      { x: 1, y: 10 },
      { x: 1, y: 11 },
      { x: 1, y: 12 },
      { x: 1, y: 13 },
      { x: 1, y: 14 },
      { x: 1, y: 15 },
      { x: 1, y: 16 },
      { x: 1, y: 17 },
      { x: 1, y: 18 },
      { x: 2, y: 10 },
      { x: 2, y: 11 },
      { x: 2, y: 12 },
      { x: 2, y: 13 },
      { x: 2, y: 14 },
      { x: 2, y: 15 },
      { x: 2, y: 16 },
      { x: 2, y: 17 },
      { x: 3, y: 10 },
      { x: 3, y: 11 },
      { x: 3, y: 12 },
      { x: 3, y: 13 },
      { x: 3, y: 14 },
      { x: 3, y: 15 },
      { x: 3, y: 16 },
      { x: 4, y: 10 },
      { x: 4, y: 11 },
      { x: 4, y: 12 },
      { x: 4, y: 13 },
      { x: 4, y: 14 },
      { x: 4, y: 15 },
    ],
    [
      //buff
      { x: 1, y: 19 },
      { x: 2, y: 18 },
      { x: 2, y: 19 },
      { x: 3, y: 17 },
      { x: 3, y: 18 },
      { x: 3, y: 19 },
      { x: 4, y: 16 },
      { x: 4, y: 17 },
      { x: 4, y: 18 },
      { x: 4, y: 19 },
      { x: 5, y: 15 },
      { x: 5, y: 16 },
      { x: 5, y: 17 },
      { x: 5, y: 18 },
      { x: 5, y: 19 },
      { x: 6, y: 15 },
      { x: 6, y: 16 },
      { x: 6, y: 17 },
      { x: 6, y: 18 },
      { x: 6, y: 19 },
      { x: 7, y: 15 },
      { x: 7, y: 16 },
      { x: 7, y: 17 },
      { x: 7, y: 18 },
      { x: 7, y: 19 },
      { x: 8, y: 15 },
      { x: 8, y: 16 },
      { x: 8, y: 17 },
      { x: 8, y: 18 },
      { x: 8, y: 19 },
      { x: 9, y: 15 },
      { x: 9, y: 16 },
      { x: 9, y: 17 },
      { x: 9, y: 18 },
      { x: 9, y: 19 },
      { x: 10, y: 15 },
      { x: 10, y: 16 },
      { x: 10, y: 17 },
      { x: 10, y: 18 },
      { x: 10, y: 19 },
    ],
    [
      //stance
      { x: 11, y: 15 },
      { x: 11, y: 16 },
      { x: 11, y: 17 },
      { x: 11, y: 18 },
      { x: 11, y: 19 },
      { x: 12, y: 15 },
      { x: 12, y: 16 },
      { x: 12, y: 17 },
      { x: 12, y: 18 },
      { x: 12, y: 19 },
      { x: 13, y: 15 },
      { x: 13, y: 16 },
      { x: 13, y: 17 },
      { x: 13, y: 18 },
      { x: 13, y: 19 },
      { x: 14, y: 15 },
      { x: 14, y: 16 },
      { x: 14, y: 17 },
      { x: 14, y: 18 },
      { x: 14, y: 19 },
      { x: 15, y: 15 },
      { x: 15, y: 16 },
      { x: 15, y: 17 },
      { x: 15, y: 18 },
      { x: 15, y: 19 },
      { x: 16, y: 15 },
      { x: 16, y: 16 },
      { x: 16, y: 17 },
      { x: 16, y: 18 },
      { x: 16, y: 19 },
      { x: 17, y: 16 },
      { x: 17, y: 17 },
      { x: 17, y: 18 },
      { x: 17, y: 19 },
      { x: 18, y: 17 },
      { x: 18, y: 18 },
      { x: 18, y: 19 },
      { x: 19, y: 18 },
      { x: 19, y: 19 },
      { x: 20, y: 19 },
    ],
    [
      //boss
      { x: 17, y: 10 },
      { x: 17, y: 11 },
      { x: 17, y: 12 },
      { x: 17, y: 13 },
      { x: 17, y: 14 },
      { x: 17, y: 15 },
      { x: 18, y: 10 },
      { x: 18, y: 11 },
      { x: 18, y: 12 },
      { x: 18, y: 13 },
      { x: 18, y: 14 },
      { x: 18, y: 15 },
      { x: 18, y: 16 },
      { x: 19, y: 10 },
      { x: 19, y: 11 },
      { x: 19, y: 12 },
      { x: 19, y: 13 },
      { x: 19, y: 14 },
      { x: 19, y: 15 },
      { x: 19, y: 16 },
      { x: 19, y: 17 },
      { x: 20, y: 10 },
      { x: 20, y: 11 },
      { x: 20, y: 12 },
      { x: 20, y: 13 },
      { x: 20, y: 14 },
      { x: 20, y: 15 },
      { x: 20, y: 16 },
      { x: 20, y: 17 },
      { x: 20, y: 18 },
      { x: 21, y: 10 },
      { x: 21, y: 11 },
      { x: 21, y: 12 },
      { x: 21, y: 13 },
      { x: 21, y: 14 },
      { x: 21, y: 15 },
      { x: 21, y: 16 },
      { x: 21, y: 17 },
      { x: 21, y: 18 },
      { x: 21, y: 19 },
    ],
  ],
  MINO_POS: [
    [[2]], // 0 // B // All
    [[2, 2]], // 1 // A // All
    [
      [2, 1], // 2 // S // Warrior, Pirate
      [1, 0],
    ],
    [[1, 2, 1]], // 3 // S // Wizard, Archer, Thief, Maplem
    [
      [2, 2], // 4 // SS // Warrior
      [2, 2],
    ],
    [
      [1, 2, 1], // 5 // SS // Wizard
      [0, 1, 0],
    ],
    [[1, 2, 2, 1]], // 6 // SS // Archer, Maplem
    [
      [1, 2, 1], // 7 // SS // Thief
      [0, 0, 1],
    ],
    [
      [0, 1], // 8 // SS // Pirate
      [2, 2],
      [1, 0],
    ],
    [
      [2, 1, 1], // 9 // SSS // Warrior
      [1, 1, 0],
    ],
    [
      [0, 1, 0], // 10 // SSS // Wizard
      [1, 2, 1],
      [0, 1, 0],
    ],
    [[1, 1, 2, 1, 1]], // 11 // SSS // Archer
    [
      [0, 0, 1], // 12 // SSS // Thief
      [1, 2, 1],
      [0, 0, 1],
    ],
    [
      [0, 1], // 13 // SSS // Pirate
      [0, 1],
      [2, 1],
      [1, 0],
    ],
    [
      [1, 0, 0], // 14 // SSS // Xenon
      [1, 2, 1],
      [0, 0, 1],
    ],
  ],
  MINO_INDEX: {
    WARRIOR: [0, 1, 2, 4, 9],
    WIZARD: [0, 1, 3, 5, 10],
    ARCHER: [0, 1, 3, 6, 11],
    THIEF: [0, 1, 3, 7, 12],
    PIRATE: [0, 1, 2, 8, 13],
    XENON: [0, 1, 3, 7, 14],
    MAPLEM: [0, 1, 3, 6],
  },
};
Array.Copy2d = (arr2d) => {
  let result = [];
  arr2d.forEach((arr1d) => result.push(arr1d.slice()));
  return result;
};

let board; // 0: ??? ???, 1: ??????, 2: ?????? ??????, 3: ?????? ??????

class Mino {
  constructor(jobClass, rankIdx, count) {
    this.jobClass = jobClass;
    this.rankIdx = rankIdx;
    this.count = count;
    this.shapes = [];

    // jobClass, rankIdx??? ?????? ????????? ??? ?????? ?????? ????????? ??????
    // ??????
    const minoIdx = TILE.MINO_INDEX[this.jobClass.toUpperCase()][this.rankIdx];
    this.shapes = [{ matrix: TILE.MINO_POS[minoIdx] }];
    let row = this.shapes[0].matrix.length;
    let col = this.shapes[0].matrix[0].length;
    let matrix;

    // ?????? ??????
    if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
      matrix = Array.Copy2d(this.shapes[0].matrix);
      this.shapes.push({ matrix: matrix.reverse() });
    }

    // ??????????????? 90deg ??????
    matrix = Array.from(Array(col), () => new Array(row));
    if ([1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = this.shapes[0].matrix[j][col - i - 1];
      this.shapes.push({ matrix: matrix });

      // ?????? ??????
      if ([7, 8, 9, 13, 14].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        this.shapes.push({ matrix: matrix.map((r) => r.reverse()) });
      }
    }

    // ??????????????? 180deg ??????
    matrix = Array.Copy2d(this.shapes[0].matrix);
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      matrix.forEach((r) => r.reverse());
      this.shapes.push({ matrix: matrix.reverse() });

      // ?????? ??????
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        this.shapes.push({ matrix: matrix.reverse() });
      }
    }

    // ??????????????? 270deg ??????
    matrix = Array.from(Array(col), () => new Array(row));
    if ([2, 5, 7, 9, 12, 13].indexOf(minoIdx) != -1) {
      for (let i = 0; i < col; i++)
        for (let j = 0; j < row; j++) matrix[i][j] = this.shapes[0].matrix[row - j - 1][i];
      this.shapes.push({ matrix: matrix });

      // ?????? ??????
      if ([7, 9, 13].indexOf(minoIdx) != -1) {
        matrix = Array.Copy2d(matrix);
        this.shapes.push({ matrix: matrix.map((r) => r.reverse()) });
      }
    }

    // ?????? ?????? ??????
    for (let i = 0; i < this.shapes.length; i++)
      for (let y = 0; y < this.shapes[i].matrix.length; y++)
        for (let x = 0; x < this.shapes[i].matrix[0].length; x++)
          if (this.shapes[i].matrix[y][x] == 2) {
            this.shapes[i].center = new Point(x, y);
            y = this.shapes[i].matrix.length;
            break;
          }
  }

  // shapes[shapeIdx] ???????????? x, y??? ????????? ?????? ??? ????????? ??? ???????????? ??????
  // return: Point()[]
  getArroundSpot(point, shapeIdx) {
    let x = point.x;
    let y = point.y;
    let points = [];

    // ?????? ????????? ?????? ??????
    this.shapes[shapeIdx].matrix.forEach((row) => {
      row.forEach((num) => {
        if (num) {
          if (x > 0 && board[y][x - 1] == 1) points.push(new Point(x - 1, y));
          if (y > 0 && board[y - 1][x] == 1) points.push(new Point(x, y - 1));
          if (x < TILE.COL - 1 && board[y][x + 1] == 1) points.push(new Point(x + 1, y));
          if (y < TILE.ROW - 1 && board[y + 1][x] == 1) points.push(new Point(x, y + 1));
        }
        x++;
      });
      x = point.x;
      y++;
    });

    // ?????? ??????
    points = points.filter(
      (p1, index, arr) => index == arr.findIndex((p2) => p1.x == p2.x && p1.y == p2.y)
    );
    return points;
  }

  // shapes[shapeIdx] ???????????? x, y??? ????????? ??? ?????????
  // ?????? ?????? ????????? ?????? direction??? ????????? ??? ????????? offset??? ????????? shape ?????? ????????? ????????? ??? ??????
  // return: { able: [true or false], point: Point() }
  // Have to modify
  isPlaceable(point, shapeIdx) {
    let offsets = [];
    const shape = this.shapes[shapeIdx];
    const row = shape.matrix.length;
    const col = shape.matrix[0].length;
    const dir = point.getDirection();

    // ????????? ?????? offset ??????
    if (dir | 1) for (let i = 0, x = 0, y = 0; i < row; i++, y--) offsets.push({ x, y });
    if (dir | 2) for (let i = 0, x = 0, y = -row + 1; i < col; i++, x--) offsets.push({ x, y });
    if (dir | 4) for (let i = 0, x = -col + 1, y = 0; i < row; i++, y--) offsets.push({ x, y });
    if (dir | 8) for (let i = 0, x = 0, y = 0; i < col; i++, x--) offsets.push({ x, y });

    // ?????? ??????
    offsets = offsets.filter(
      (p1, index, arr) => index == arr.findIndex((p2) => p1.x == p2.x && p1.y == p2.y)
    );

    let able, x, y;
    for (let offset of offsets) {
      able = true;
      x = point.x + offset.x;
      y = point.y + offset.y;
      if (x < 0 || y < 0 || x > TILE.COL - col || y > TILE.ROW - row) continue;

      for (let i = 0; i < row; i++)
        for (let j = 0; j < col; j++)
          if (shape.matrix[i][j] > 0 && board[y + i][x + j] != 1) {
            able = false;
            i = row;
            break;
          }

      if (able) return { able: true, point: new Point(x, y) };
    }
    return { able: false };
  }

  // ????????? x, y ????????? shapes[shapeIdx]??? ?????? board ??????
  // return: ????????? Point()[]
  //
  // ????????? headOffset 3?????? ????????? ????????? ????????? ???????????? ?????????
  // ????????? ????????? ???????????? ?????? ???????????? ???????????? ?????? ???????????? ???????????? ??????!
  place(point, shapeIdx) {
    let { x, y } = point;
    let points = [];

    this.shapes[shapeIdx].matrix.forEach((row) => {
      row.forEach((num) => {
        if (num) {
          board[y][x] = num == 2 ? 3 : 2;
          points.push(new Point(x, y));
        }
        x++;
      });
      x = point.x;
      y++;
    });

    return points;
  }
  unPlace(point, shapeIdx) {
    let { x, y } = point;
    let points = [];

    this.shapes[shapeIdx].matrix.forEach((row) => {
      row.forEach((num) => {
        if (num) {
          board[y][x] = 1;
          points.push(new Point(x, y));
        }
        x++;
      });
      x = point.x;
      y++;
    });

    return points;
  }
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.adj = 0;
  }

  updateAdjacent() {
    this.adj = 0;
    if (this.x > 0 && board[this.y][this.x - 1] == 1) this.adj++;
    if (this.y > 0 && board[this.y - 1][this.x] == 1) this.adj++;
    if (this.x < TILE.COL - 1 && board[this.y][this.x + 1] == 1) this.adj++;
    if (this.y < TILE.ROW - 1 && board[this.y + 1][this.x] == 1) this.adj++;
    return this.adj;
  }

  getDirection() {
    let dir = 0;
    if (this.x < TILE.COL - 1 && board[this.y][this.x + 1] == 1) dir += 1; // ???
    if (this.y > 0 && board[this.y - 1][this.x] == 1) dir += 2; // ???
    if (this.x > 0 && board[this.y][this.x - 1] == 1) dir += 4; // ???
    if (this.y < TILE.ROW - 1 && board[this.y + 1][this.x] == 1) dir += 8; // ???
    return dir;
  }
}
class Spot {
  constructor() {
    this.points = [];
    this.minoIdx = 0;
    this.shapeIdx = 0;
  }
}
class Node {
  constructor(spotName, point, minoIdx, shapeIdx) {
    this.spotName = spotName;
    this.point = point;
    this.minoIdx = minoIdx;
    this.shapeIdx = shapeIdx;
  }
}

class Tiler {
  constructor() {}

  // ????????? ???????????? ?????? Mino() ????????? ????????? ????????? ????????? ?????? 2???????????? map??? ??????
  init() {
    board = [];

    this.iteration = 0;
    this.abort = false;

    this.minos = [];
    this.stack = [];
    this.spots = { restricted: new Spot(), normal: new Spot() };
    this.centerSpots = new Spot();

    // board ?????????
    board = Array.from(Array(TILE.ROW), () => Array(TILE.COL).fill(0));
    map.selectedPos.forEach((p) => (board[p.y][p.x] = 1));

    // this.minos ?????????
    for (let jobClass in stats.minoCount)
      stats.minoCount[jobClass].forEach((count, rankIdx) => {
        if (count) this.minos.push(new Mino(jobClass, rankIdx, count));
      });
    this.minos.sort((a, b) => b.rankIdx - a.rankIdx);

    // this.spots ?????????
    for (let y = 0; y < TILE.ROW; y++)
      for (let x = 0; x < TILE.COL; x++) {
        if (board[y][x] == 1) {
          let point = new Point(x, y);
          this.spots.normal.points.push(point);
          if (point.updateAdjacent() <= 1) this.spots.restricted.points.push(point);
        }
      }

    // this.centerSpots ?????????
    const cx = TILE.COL / 2;
    const cy = TILE.ROW / 2;
    for (let p of [
      [cx - 1, cy - 1],
      [cx, cy - 1],
      [cx - 1, cy],
      [cx, cy],
    ])
      if (board[p[1]][p[0]]) this.centerSpots.points.push(new Point(p[0], p[1]));
  }
  // ?????? ?????? 4??? ??? ????????? ??? ???????????? ?????????
  isCenterValid(final = false) {
    return (
      this.centerSpots.points.findIndex(
        (p) => board[p.y][p.x] == 3 || (!final && board[p.y][p.x] == 1)
      ) != -1
    );
  }
  getDurationStr(startTime) {
    let str = "";
    let ms = +new Date() - startTime;

    if (ms < 1000) return `0.${ms}???`;

    if (ms >= 60000) {
      str += `${Math.floor(ms / 60000)}??? `;
      ms = ms % 60000;
    }
    str += `${Math.floor(ms / 1000)}???`;

    return str;
  }

  async solve(batchSize = 40000) {
    // ?????? ??????
    this.init();
    const startTime = +new Date();
    let valid = true;

    const log = (...args) => {
      return;
      console.log(...args);
    };

    // ??????
    while (!this.abort) {
      if (valid) {
        // ????????? ??????
        // await new Promise((resolve) => setTimeout(resolve, 0));
        // const _sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        // DrawSolution();
        // await _sleep(40);

        for (let spotName in this.spots) {
          // log(`>>> Start ${spotName} >>>`);
          let spot = this.spots[spotName];
          if (spot.points.length) {
            if (
              spot.minoIdx < this.minos.length &&
              spot.shapeIdx < this.minos[spot.minoIdx].shapes.length
            ) {
              // log(
              //   `[Searching-${spotName}] (${spot.points[0].x}, ${spot.points[0].y}) ${spot.minoIdx}-${spot.shapeIdx}`,
              //   this.minos[spot.minoIdx].jobClass,
              //   this.minos[spot.minoIdx].shapes[spot.shapeIdx].matrix
              // );

              // ?????? ???????????? adj??? 0??? ??? ?????? ????????? 1???????????? ????????? invalid
              if (
                spot.points[0].adj == 0 &&
                !this.minos.find((mino) => mino.rankIdx == 0 && mino.count)
              ) {
                valid = false;
                break;
              }

              // ?????? ?????? ??????
              let placeable = { able: this.minos[spot.minoIdx].count > 0 };
              if (placeable.able)
                placeable = this.minos[spot.minoIdx].isPlaceable(spot.points[0], spot.shapeIdx);
              if (placeable.able) {
                // log(
                //   `[Place-${spotName}] ${placeable.point.x}, ${placeable.point.y} / ${
                //     this.minos[spot.minoIdx].jobClass
                //   }`,
                //   this.minos[spot.minoIdx].shapes[spot.shapeIdx]
                // );

                // ?????? ??? ???????????? ????????? ????????? ??????
                const placedPoints = this.minos[spot.minoIdx].place(placeable.point, spot.shapeIdx);
                let findIdx;
                placedPoints.forEach((pp) => {
                  for (let innerSpotName in this.spots)
                    if (
                      (findIdx = this.spots[innerSpotName].points.findIndex(
                        (p) => p.x == pp.x && p.y == pp.y
                      )) != -1
                    ) {
                      // log(`[removePoint-${innerSpotName}] ${pp.x}, ${pp.y}`);
                      this.spots[innerSpotName].points.splice(findIdx, 1);
                    }
                });

                // ????????? ?????? ?????? ?????? adj ??? ????????????
                this.minos[spot.minoIdx]
                  .getArroundSpot(placeable.point, spot.shapeIdx)
                  .forEach((pp) => {
                    // ?????? ?????? ????????????
                    let point = this.spots.normal.points.find((p) => p.x == pp.x && p.y == pp.y);
                    if (point) point.updateAdjacent();

                    // ?????? ?????? ????????????
                    point = this.spots.restricted.points.find((p) => p.x == pp.x && p.y == pp.y);
                    if (point) point.updateAdjacent();
                    // ?????? ????????? ?????? ????????? ?????? adj??? ???????????? ???????????? ??????
                    else if (pp.updateAdjacent() <= 1) {
                      this.spots.restricted.points.push(pp);
                    }
                  });

                // ????????? ????????? ????????? ?????? ????????? ????????? ?????? ?????????
                this.spots.restricted.points.sort((a, b) => a.adj - b.adj);
                // log("[RestrictedPoints]", this.spots.restricted.points);
                // log("[NormalPoints]", this.spots.normal.points);

                // ????????? ?????? ??????, ?????? ?????? ??????, ?????? ????????? ?????? ?????? ?????? ?????????
                this.stack.push(new Node(spotName, placeable.point, spot.minoIdx, spot.shapeIdx));
                this.minos[spot.minoIdx].count--;
                this.spots.restricted.shapeIdx = 0;
                this.spots.restricted.minoIdx = 0;
                this.spots.normal.shapeIdx = 0;
                this.spots.normal.minoIdx = 0;

                // ?????? ??? ?????? ???????????? ?????????????????? ??????
                if (!this.isCenterValid()) valid = false;
                // ?????? ?????? ?????? ?????? ??? ?????? ????????? ?????? ????????? ?????? ?????? ?????? ?????? ??? ??? ??? ?????? ??????
                else if (
                  this.minos.findIndex((mino) => mino.count) == -1 &&
                  this.isCenterValid(true)
                ) {
                  DrawSolution();
                  return {
                    success: 1,
                    message: `?????? ??????: ${this.getDurationStr(startTime)}\n?????? ??????: ${
                      this.iteration
                    }`,
                  };
                }
              }
              // ????????? ????????? ??? ??????
              else {
                // ????????? ??????
                if (++spot.shapeIdx == this.minos[spot.minoIdx].shapes.length) {
                  spot.shapeIdx = 0;
                  spot.minoIdx++;
                }
                if (spot.minoIdx == this.minos.length) valid = false;

                // ????????? ????????? ????????? ??????
                if (this.minos.findIndex((mino) => mino.count) == -1) {
                  DrawSolution();
                  return {
                    success: 1,
                    message: `?????? ??????: ${this.getDurationStr(startTime)}\n?????? ??????: ${
                      this.iteration
                    }`,
                  };
                }
              }
            }
            // ?????? ?????? ??????????????? ????????? ????????? ?????? ?????????
            else valid = false;
            // log("[EndSummary]", valid, this.minos, spot);
            break;
          }

          // ?????? ??? ?????? ?????? ?????? ????????? ??? ????????? ?????? ??????
          if (spotName == "normal") {
            DrawSolution();
            return {
              success: 1,
              message: `?????? ??????: ${this.getDurationStr(startTime)}\n?????? ??????: ${this.iteration}`,
            };
          }
        }
      } else {
        // ????????????
        if (this.stack.length) {
          // ???????????? pop?????? index??? ??????
          valid = true;
          const node = this.stack.pop();
          const spot = this.spots[node.spotName];
          spot.minoIdx = node.minoIdx;
          spot.shapeIdx = node.shapeIdx;
          this.minos[spot.minoIdx].count++;
          // log(`[Backtracking-${node.spotName}]`, node);

          // adj ?????????????????? ????????? ???????????? ??????
          let needUpdateAdjPoints = this.minos[spot.minoIdx].getArroundSpot(
            node.point,
            spot.shapeIdx
          );
          needUpdateAdjPoints = needUpdateAdjPoints.concat(
            this.minos[spot.minoIdx].unPlace(node.point, spot.shapeIdx)
          );

          // ?????? ????????? ???????????? ??????
          needUpdateAdjPoints.forEach((up) => {
            let sp = this.spots.normal.points.find((p) => p.x == up.x && p.y == up.y);
            if (sp) sp.updateAdjacent();
            else {
              up.updateAdjacent();
              this.spots.normal.points.push(up);
            }
          });

          // ?????? ??? ????????? ??????????????? ??????
          let v;
          this.spots.normal.points.sort((a, b) => ((v = a.y - b.y) ? v : (v = a.x - b.x)));

          // ????????? ?????? ?????? ??????
          this.spots.restricted.points = this.spots.normal.points.filter((p) => p.adj <= 1);
          // log("[RestrictedPoints]", this.spots.restricted.points);
          // log("[NormalPoints]", this.spots.normal.points.slice());

          // ???????????? ???????????? ??????????????? ????????? ??????
          if (++spot.shapeIdx == this.minos[spot.minoIdx].shapes.length) {
            spot.shapeIdx = 0;
            spot.minoIdx++;
          }
          if (spot.minoIdx == this.minos.length) valid = false;
        }
        // ?????? ?????????
        else {
          DrawSolution();
          return {
            success: 0,
            message: `????????? ????????? ???????????? ????????????.\n\n?????? ??????: ${this.getDurationStr(
              startTime
            )}\n?????? ??????: ${this.iteration}`,
          };
        }
      }

      if (this.iteration++ % batchSize == 0) {
        DrawSolution();
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    // ????????? ??????
    DrawSolution();
    inform.show(
      inform.INFO,
      "????????? ?????? ?????? ??????",
      `?????? ??????: ${this.getDurationStr(startTime)}\n?????? ??????: ${this.iteration}`
    );
    return { success: -1 };
  }
}
