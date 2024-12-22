export const belts = [
  { name: "White", image: "/images/white.png" },
  { name: "Yellow", image: "/images/yellow.png" },
  { name: "Orange", image: "/images/orange.png" },
  { name: "Green", image: "/images/green.png" },
  { name: "Blue", image: "/images/blue.png" },
  { name: "Brown", image: "/images/brown.png" },
  { name: "Black (1st Dan)", image: "/images/black.png" },
  { name: "Black (2nd Dan)", image: "/images/black.png" },
  { name: "Black (3rd Dan)", image: "/images/black.png" },
  { name: "Black (4th Dan)", image: "/images/black.png" },
  { name: "Black (5th Dan)", image: "/images/black.png" },
  { name: "Coral (6th Dan)", image: "/images/coral.png" },
  { name: "Coral (7th Dan)", image: "/images/coral.png" },
  { name: "Coral (8th Dan)", image: "/images/coral8.png" },
  { name: "Red (9th Dan)", image: "/images/red.png" },
  { name: "Red (10th Dan)", image: "/images/red.png" },
];

export const waza = [
  {
    category: "Te-Waza (Hand Techniques)",
    techniques: [
      { name: "Ippon Seoi Nage", description: "One-arm shoulder throw" },
      { name: "Tai Otoshi", description: "Body drop" },
      { name: "Seoi Nage", description: "Shoulder throw" },
      { name: "Morote Seoi Nage", description: "Two-arm shoulder throw" },
      { name: "Kata Guruma", description: "Shoulder wheel" },
      { name: "Sumi Otoshi", description: "Corner drop" },
      { name: "Hiki Otoshi", description: "Pulling drop" },
      { name: "Uki Otoshi", description: "Floating drop" },
      { name: "Obi Otoshi", description: "Belt drop" },
      { name: "Yama Arashi", description: "Mountain storm" },
    ],
  },
  {
    category: "Koshi-Waza (Hip Techniques)",
    techniques: [
      { name: "O-Goshi", description: "Major hip throw" },
      { name: "Uki-Goshi", description: "Floating hip throw" },
      { name: "Harai Goshi", description: "Sweeping hip throw" },
      { name: "Hane Goshi", description: "Spring hip throw" },
      { name: "Koshi Guruma", description: "Hip wheel" },
      { name: "Tsuri Goshi", description: "Lifting hip throw" },
      { name: "Tsurikomi Goshi", description: "Lifting pulling hip throw" },
    ],
  },
  {
    category: "Ashi-Waza (Foot and Leg Techniques)",
    techniques: [
      { name: "Deashi Harai", description: "Advanced foot sweep" },
      { name: "Okuriashi Harai", description: "Sliding foot sweep" },
      { name: "Uchimata", description: "Inner thigh throw" },
      { name: "Osoto Gari", description: "Major outer reap" },
      { name: "Ouchi Gari", description: "Major inner reap" },
      { name: "Kouchi Gari", description: "Minor inner reap" },
      { name: "Kosoto Gari", description: "Minor outer reap" },
    ],
  },
  {
    category: "Sutemi-Waza (Sacrifice Techniques)",
    techniques: [
      { name: "Tomoe Nage", description: "Circular throw" },
      { name: "Hikikomi Gaeshi", description: "Pulling sacrifice throw" },
      { name: "Sumi Gaeshi", description: "Corner reversal" },
      { name: "Yoko Otoshi", description: "Side drop" },
      { name: "Tani Otoshi", description: "Valley drop" },
    ],
  },
  {
    category: "Katame-Waza (Grappling Techniques)",
    subcategories: [
      {
        subcategory: "Osaekomi-Waza (Pinning Techniques)",
        techniques: [
          { name: "Kesa Gatame", description: "Scarf hold" },
          { name: "Yoko Shiho Gatame", description: "Side four-quarter hold" },
          { name: "Tate Shiho Gatame", description: "Vertical four-quarter hold" },
          { name: "Kami Shiho Gatame", description: "Upper four-quarter hold" },
        ],
      },
      {
        subcategory: "Shime-Waza (Choking Techniques)",
        techniques: [
          { name: "Hadaka Jime", description: "Naked choke" },
          { name: "Okuri Eri Jime", description: "Sliding lapel strangle" },
          { name: "Kataha Jime", description: "Single wing choke" },
        ],
      },
      {
        subcategory: "Kansetsu-Waza (Joint Lock Techniques)",
        techniques: [
          { name: "Ude Garami", description: "Arm entanglement" },
          { name: "Juji Gatame", description: "Cross arm lock" },
          { name: "Ude Hishigi Hara Gatame", description: "Stomach arm lock" },
        ],
      },
    ],
  },
];
