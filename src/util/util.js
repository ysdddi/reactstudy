export const calcRank = (value) => {
  const intValue = Number(value);

  switch (intValue) {
    case 800:
      return {
        label: "슈퍼챔피언스",
        image: 0,
      };

    case 900:
      return {
        label: "챔피언스",
        image: 1,
      };

    case 1000:
      return {
        label: "슈퍼챌린지",
        image: 2,
      };

    case 1100:
      return {
        label: "챌린지1",
        image: 3,
      };

    case 1200:
      return {
        label: "챌린지2",
        image: 4,
      };

    case 1300:
      return {
        label: "챌린지3",
        image: 5,
      };

    case 2000:
      return {
        label: "월드클래스1",
        image: 6,
      };

    case 2100:
      return {
        label: "월드클래스2",
        image: 7,
      };

    case 2200:
      return {
        label: "월드클래스3",
        image: 8,
      };

    case 2300:
      return {
        label: "프로1",
        image: 9,
      };

    case 2400:
      return {
        label: "프로2",
        image: 10,
      };

    case 2500:
      return {
        label: "프로3",
        image: 11,
      };

    case 2600:
      return {
        label: "세미프로1",
        image: 12,
      };

    case 2700:
      return {
        label: "세미프로2",
        image: 13,
      };

    case 2800:
      return {
        label: "세미프로3",
        image: 14,
      };

    case 2900:
      return {
        label: "유망주1",
        image: 15,
      };

    case 3000:
      return {
        label: "유망주2",
        image: 16,
      };

    case 3100:
      return {
        label: "유망주3",
        image: 17,
      };

    default:
  }
};

export const rankIcon = (value) => {
  const intValue = Number(value);

  switch (intValue) {
    case 800:
      return 0;

    case 900:
      return 1;

    case 1000:
      return 2;

    case 1100:
      return 3;

    case 1200:
      return 4;

    case 1300:
      return 5;

    case 2000:
      return 6;

    case 2100:
      return 7;

    case 2200:
      return 8;

    case 2300:
      return 9;

    case 2400:
      return 10;

    case 2500:
      return 11;

    case 2600:
      return 12;

    case 2700:
      return 13;

    case 2800:
      return 14;

    case 2900:
      return 15;

    case 3000:
      return 16;

    case 3100:
      return 17;

    default:
  }
};
