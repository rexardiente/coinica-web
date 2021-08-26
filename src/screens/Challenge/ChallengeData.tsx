const data = [
  {
    id: 1,
    user: "John Doe",
    bets: 24,
    payout: 131,
    ratio: 1.9,
    vip_points: 979,
    totalPoints: 23000,
    image: "https://imgur.com/qK06IEz.png",
  },
  {
    id: 2,
    user: "Jane Doe",
    bets: 19,
    payout: 87,
    ratio: 1.8,
    vip_points: 867,
    totalPoints: 12000,
    image: "https://imgur.com/LPHDps7.png",
  },
  {
    id: 3,
    user: "Karan Josh",
    bets: 17,
    payout: 82,
    ratio: 1.8,
    vip_points: 818,
    totalPoints: 9000,
    image: "https://imgur.com/VY5R7gZ.png",
  },
  {
    id: 4,
    user: "Bhusta Rhymes",
    bets: 13,
    payout: 70,
    ratio: 1.5,
    vip_points: 765,
    totalPoints: 9000,
    image: "https://imgur.com/L5ucrTE.png",
  },
];

const rewardSet = [
  {
    id: 1,
    min: "0",
    max: "1000",
  },
  {
    id: 2,
    min: "1,001",
    max: "10,000",
  },
  {
    id: 3,
    min: "10,001",
    max: "50,000",
  },
  {
    id: 4,
    min: "50,000",
    max: "100,000",
  },
  {
    id: 5,
    min: "100,001",
    max: "150,000",
  },
  {
    id: 6,
    min: "150,001",
    max: "250,000",
  },
  {
    id: 7,
    min: "250,001+",
    // max:"250,001"
  },
];

export { data, rewardSet };
