
import React, { useMemo, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';

const SYMBOLS = ['☽', '✦', '✷', '♆', '♁'];
const SPIRIT_PATHS = {
  Frog: { 
    trait: 'Transformation, healing, rebirth', 
    color: '#22c55e',
    evolved: 'Crystal Frog',
    final: 'Cosmic Shaman Frog',
    imgBase: 'https://yourwebsite.com', 
    imgEvolved: 'https://yourwebsite.com', 
    imgFinal: 'https://yourwebsite.com' 
  },
  Wolf: { 
    trait: 'Instinct, loyalty, survival', 
    color: '#8b5cf6',
    evolved: 'Shadow Wolf',
    final: 'Cosmic Alpha Wolf',
    imgBase: 'https://yourwebsite.com', 
    imgEvolved: 'https://yourwebsite.com', 
    imgFinal: 'https://yourwebsite.com' 
  },
  Owl: { 
    trait: 'Wisdom, hidden truth, vision', 
    color: '#60a5fa',
    evolved: 'Crystal Owl',
    final: 'Cosmic Veiled Owl',
    imgBase: 'https://yourwebsite.com', 
    imgEvolved: 'https://yourwebsite.com', 
    imgFinal: 'https://yourwebsite.com' 
  },
};
const TAROT_CARDS = [
  { name: 'The Moon', meaning: 'Something hidden is active. Trust intuition, but move carefully.' },
  { name: 'The Star', meaning: 'Hope, healing, and alignment are returning to your path.' },
  { name: 'Death', meaning: 'A cycle is ending so something stronger can begin.' },
  { name: 'The Sun', meaning: 'Clarity, joy, and confidence are breaking through.' },
  { name: 'The Tower', meaning: 'A false structure is falling. Truth is clearing the ground.' },
  { name: 'Strength', meaning: 'Soft power, patience, and self-control are your win right now.' },
  { name: 'The Hermit', meaning: 'Solitude is not punishment. It is where wisdom is growing.' },
  { name: 'Wheel of Fortune', meaning: 'Energy is shifting. Stay ready for changes in your favor.' },
  { name: 'Justice', meaning: 'Truth and consequences are balancing out.' },
  { name: 'The High Priestess', meaning: 'You already know more than you are admitting to yourself.' },
];

const HOROSCOPE_LINES = [
  'Today your intuition is stronger than your fear. Trust your first hit.',
  'Something hidden is trying to show itself. Watch patterns and repeats.',
  'The energy today favors bold choices, but only if they come from clarity.',
  'Your emotions are loud right now. Slow down before making a final move.',
  'A message around money says patience now prevents regret later.',
  'Love energy says stop chasing confusion. What is real should feel steady.',
  'Your path is shifting. A small decision today matters more than it seems.',
];
const ORB_VISIONS = [
  "A golden thread connecting you to an unexpected email or message within 48 hours.",
  "Shadows parting around an old misunderstanding. Someone is preparing to speak truth.",
  "An aura of green surrounding your financial house. A slow block is finally clearing away.",
  "A mirror symbol. The behavior flashing around you right now is reflecting your own hidden growth.",
  "A bird flying backward. You must revisit a decision made three weeks ago to reclaim lost energy.",
  "A sudden spark of music or a specific song layout holding the exact answer to your morning dilemma."
];

const AURAS = [
  { color: '#38bdf8', name: 'Electric Cyan', vibe: 'High communicative clarity, acute reception, and fast decision patterns.' },
  { color: '#f43f5e', name: 'Crimson Ember', vibe: 'Raw physical grounding, heavy boundary protection, and deep ancestral shifts.' },
  { color: '#fbbf24', name: 'Solar Amber', vibe: 'Manifestation engine active, intense solar-plexus expansion, and raw creative alignment.' },
  { color: '#ec4899', name: 'Cosmic Magenta', vibe: 'Deep heart healing, extreme relational empathy, and spiritual timeline resets.' }
];

const MONETIZATION_TIERS = [
  { id: 'tier_mini', title: 'Cosmic Spark Pack', price: '$1.99', items: '🪙 50 Coins + ⚡ 2 Energy Shards' },
  { id: 'tier_med', title: 'Aura Expansion Kit', price: '$4.99', items: '🪙 150 Coins + ⚡ Full Energy Refill' },
  { id: 'tier_high', title: 'Mystic Adept Bundle', price: '$19.99', items: '🪙 700 Coins + 👑 Permanent Max Energy Upgrade (+5)' },
  { id: 'tier_god', title: 'Astral Overlord Ultimate Bundle', price: '$99.99', items: '🔥 5000 Coins + 🛸 Infinite Max Energy + Instant Unlock All Accessories & Features' }
];

const ACCESSORY_SHOP = [
  { id: 'acc_wings', title: 'Cosmic Star-Wings', cost: 15, premium: true, desc: 'Equips glowing celestial wings to your animal canvas view.' },
  { id: 'acc_crown', title: 'Aura Crown of Light', cost: 25, premium: true, desc: 'Gives your guardian spirit animal a pulsing gold crown asset.' },
  { id: 'feat_portal', title: 'Secret Past-Life Portal', cost: 45, premium: true, desc: 'Permanently unlocks the premium past life memory scanner view.' }
];
const STORY_SCENES = {
  start: {
    id: 'start', chapter: 1, title: 'The Awakening',
    text: 'It starts with a feeling you cannot shake. The room is quiet, but your chest feels electric. A whisper brushes the edge of your mind, like something calling you from just beyond the dark.',
    image: 'https://unsplash.com',
    choices: [
      { text: 'Follow the whisper', next: 'forest_entry', xp: 5, coins: 3 },
      { text: 'Ignore it and stay still', next: 'stay_still', xp: 2, coins: 1 },
    ],
  },
  stay_still: {
    id: 'stay_still', chapter: 1, title: 'Stillness',
    text: 'You try to ignore it, but the silence grows heavier. The feeling does not leave. Instead, it settles deeper into you, waiting.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Give in and follow the feeling', next: 'forest_entry', xp: 4, coins: 2 }],
  },
  forest_entry: {
    id: 'forest_entry', chapter: 1, title: 'Into the Forest',
    text: 'The world shifts. You are no longer where you were. Trees lean inward like witnesses. Ahead, water moves over stone.',
    image: 'https://unsplash.com',
    choices: [
      { text: 'Move toward the water', next: 'frog_scene', xp: 6, coins: 3 },
      { text: 'Step into the shadow', next: 'wolf_scene', xp: 6, coins: 3 },
    ],
  },
  frog_scene: {
    id: 'frog_scene', chapter: 1, title: 'The Frog Path',
    text: 'A frog rises from the pond. You feel transformation and rebirth. This path will change you by force if needed.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Accept the Frog as your guide', next: 'chapter2_start', xp: 8, coins: 4, spirit: 'Frog' }],
  },
  wolf_scene: {
    id: 'wolf_scene', chapter: 1, title: 'The Wolf Path',
    text: 'A wolf fixes its eyes on you. You feel instinct, loyalty, and danger sharpen. This path will teach you to trust your gut.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Accept the Wolf as your guide', next: 'chapter2_start', xp: 8, coins: 4, spirit: 'Wolf' }],
  },
  chapter2_start: {
    id: 'chapter2_start', chapter: 2, title: 'The Signs Awaken',
    text: 'The initial shift is over. Now, the magic begins spilling into your everyday life via repeating numbers.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Look closely at the numbers around you', next: 'numbers_path', xp: 4, coins: 2 }],
  },
  numbers_path: {
    id: 'numbers_path', chapter: 2, title: 'The Numbers Speak',
    text: '111. 222. 333. They appear on clocks and screens. The only question left is what they want from you.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Trust the pattern and dream', next: 'dream_gate', xp: 8, coins: 4 }],
  },
  dream_gate: {
    id: 'dream_gate', chapter: 2, title: 'The Dream Gate',
    text: 'A door made of light stands in a dark field. You know if you cross it, you stop being who you were before.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Open the door', next: 'chapter3_start', xp: 9, coins: 4 }],
  },
  chapter3_start: {
    id: 'chapter3_start', chapter: 3, title: 'Chapter 3: Trusting Intuition',
    text: 'You are no longer guessing. The problem is whether you trust it enough to act before proof arrives.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Lean fully into your first feeling', next: 'intuition_test', xp: 7, coins: 3 }],
  },
  intuition_test: {
    id: 'intuition_test', chapter: 3, title: 'The Split Second',
    text: 'A choice comes fast. Just a pulse in your chest that says now. Your future bends under intuition.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Act immediately', next: 'chapter4_start', xp: 10, coins: 5 }],
  },
  chapter4_start: {
    id: 'chapter4_start', chapter: 4, title: 'Chapter 4: Spirit Contact',
    text: 'The line gets thinner. Energy does not feel abstract. You understand intuition may be contact.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Open yourself to contact', next: 'contact_scene', xp: 8, coins: 4 }],
  },
  contact_scene: {
    id: 'contact_scene', chapter: 4, title: 'Contact Verified',
    text: 'The room changes emotionally. Pressure. Warmth. Presence. Something has answered your signal.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Stay open and advance', next: 'chapter5_start', xp: 10, coins: 5 }],
  },
  chapter5_start: {
    id: 'chapter5_start', chapter: 5, title: 'Chapter 5: Shadow Lessons',
    text: 'Awakening does not only reveal light. It reveals what you buried. The shadow is here because you are strong.',
    image: 'https://unsplash.com',
    choices: [{ text: 'Face the shadow', next: 'chapter6_start', xp: 12, coins: 6 }],
  },
  chapter6_start: {
    id: 'chapter6_start', chapter: 6, title: 'Chapter 6: The Higher Council',
    text: 'Your third-eye portal expands. You sit before the ethereal architects. They ask: “Will you govern your gift, or let it rule you?”',
    image: 'https://unsplash.com',
    choices: [
      { text: 'Vow to govern with mastery', next: 'chapter7_start', xp: 14, coins: 6 },
      { text: 'Surrender to the flow entirely', next: 'chapter7_start', xp: 12, coins: 8 }
    ]
  },
  chapter7_start: {
    id: 'chapter7_start', chapter: 7, title: 'Chapter 7: Astral Splitting',
    text: 'The physical anchor drops away. You wake up floating above your bed, looking down at your skin. A silver cord keeps you bound.',
    image: 'https://unsplash.com',
    choices: [
      { text: 'Fly upward into the stars', next: 'chapter8_start', xp: 16, coins: 7 },
      { text: 'Explore the hidden rooms of earth', next: 'chapter8_start', xp: 15, coins: 7 }
    ]
  },
  chapter8_start: {
    id: 'chapter8_start', chapter: 8, title: 'Chapter 8: The Akashic Records',
    text: 'You reach an endless library made of pure crystal code. Every thought, name, and timeline you have ever breathed is cataloged here.',
    image: 'https://unsplash.com',
    choices: [
      { text: 'Open your premium past-life register', next: 'chapter9_start', xp: 18, coins: 8 },
      { text: 'Scan your ultimate future map', next: 'chapter9_start', xp: 18, coins: 8 }
    ]
  },
  chapter9_start: {
    id: 'chapter9_start', chapter: 9, title: 'Chapter 9: The Final Threshold',
    text: 'The matrix cracks open. A blinding storm of geometric colors forces you to declare your true cosmic purpose before the infinite.',
    image: 'https://unsplash.com',
    choices: [
      { text: 'I am a healer of timelines', next: 'chapter10_final', xp: 22, coins: 10 },
      { text: 'I am a master builder of matrices', next: 'chapter10_final', xp: 25, coins: 10 }
    ]
  },
  chapter10_final: {
    id: 'chapter10_final', chapter: 10, title: 'Chapter 10: The Infinite Self',
    text: 'Initiation is complete. You walk through your day-to-day life completely awake to the threads of reality. Your grid is fully synchronized.',
    image: 'https://unsplash.com',
    choices: [
      { text: 'Seal your matrix and start fresh', next: 'start', xp: 30, coins: 15 }
    ]
  }
};
function getSpiritReply(input) {
  const q = input.trim().toLowerCase();
  if (!q) return 'Type a name, question, or feeling first.';
  if (q.includes('jake')) return "Jake’s energy feels loud, loyal, and watchful. Stop carrying guilt that was never yours. Honor him by living bigger, not smaller.";
  if (q.includes('teddy')) return "Teddy’s energy feels heavy but protective. The message here is unfinished truth, deep love, and the need to trust what you already know in your gut.";
  if (q.includes('gary')) return "Gary’s energy feels hard, proud, and still guiding. Strength through storms is the message here.";
  if (q.includes('mom') || q.includes('mother')) return 'The energy around your mother feels tired but loving. Comfort, patience, and tenderness matter right now.';
  if (q.includes('love') || q.includes('relationship')) return 'Love energy says stop chasing what confuses you. What is real should feel deep, not constantly chaotic.';
  if (q.includes('money') || q.includes('job') || q.includes('work')) return 'Money energy says growth is possible, but not through panic. Stack one real move at a time.';
  if (q.includes('future') || q.includes('book') || q.includes('music') || q.includes('app')) return 'This path is not closed. Momentum comes from consistency. Keep building, even when it feels slow.';
  return 'The energy around this feels real but unclear. Slow down, trust your first feeling, and pay attention to what keeps repeating.';
}

function getThreeCards() {
  const copy = [...TAROT_CARDS];
  const picks = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * copy.length);
    picks.push(copy[index]);
    copy.splice(index, 1);
  }
  return picks;
}

function lifePathNumber(dob) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  const digits = dob.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9) {
    if (sum === 11 || sum === 22 || sum === 33) {
      break;
    }
    sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

function lifePathMeaning(num) {
  const map = {
    1: 'Initiator: independence, leadership, and bold beginnings.',
    2: 'Peacemaker: sensitivity, partnership, and emotional intelligence.',
    3: 'Creator: expression, voice, and playful energy.',
    4: 'Builder: structure, consistency, and grounded growth.',
    5: 'Explorer: change, freedom, and restless evolution.',
    6: 'Guardian: love, loyalty, family, and responsibility.',
    7: 'Seeker: depth, truth, mystery, and inner knowing.',
    8: 'Power: ambition, strength, and material mastery.',
    9: 'Healer: endings, compassion, wisdom, and release.',
    11: 'Visionary: intuition, spiritual sensitivity, and inspiration.',
    22: 'Master Builder: big purpose, practical greatness, and impact.',
    33: 'Master Teacher: service, compassion, and elevated guidance.',
  };
  return map[num] || '';
}

function xpNeededForLevel(level) {
  return 10 + (level - 1) * 5;
}
export default function App() {
  const [tab, setTab] = useState('home');
  const [coins, setCoins] = useState(25);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [selectedSpirit, setSelectedSpirit] = useState('Frog');
  const [energyMessage, setEnergyMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [spiritMessage, setSpiritMessage] = useState('');
  const [lastConnectedQuestion, setLastConnectedQuestion] = useState('');
  const [horoscope, setHoroscope] = useState('');
  const [cards, setCards] = useState([]);
  const [hiddenIndex, setHiddenIndex] = useState(Math.floor(Math.random() * SYMBOLS.length));
  const [gameResult, setGameResult] = useState('');
  const [dob, setDob] = useState('');
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [storySceneId, setStorySceneId] = useState('start');

  const [energy, setEnergy] = useState(10);
  const [maxEnergy, setMaxEnergy] = useState(10);
  const [isInfiniteEnergy, setIsInfiniteEnergy] = useState(false);
  const [orbVisionText, setOrbVisionText] = useState('');
  const [activeAuraIndex, setActiveAuraIndex] = useState(-1);
  const [purchasedFeatures, setPurchasedFeatures] = useState([]);
  const [spiritConnectCount, setSpiritConnectCount] = useState(0);
  const [luckyNumberOutput, setLuckyNumberOutput] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      if (isInfiniteEnergy) return;
      setEnergy(currentEnergy => {
        if (currentEnergy < maxEnergy) {
          return currentEnergy + 1;
        }
        return currentEnergy;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [maxEnergy, isInfiniteEnergy]);

  const current = SPIRIT_PATHS[selectedSpirit] || SPIRIT_PATHS.Frog;
  const currentScene = STORY_SCENES[storySceneId] || STORY_SCENES.start;
  const lifePath = useMemo(() => lifePathNumber(dob), [dob]);

  const achievementsList = useMemo(() => {
    return [
      { id: 'ach_1', title: '👁️ Third-Eye Open', desc: 'Reach a Psychic Score of 50+', unlocked: score >= 50 },
      { id: 'ach_2', title: '🕊️ Spirit Channeler', desc: 'Perform 5 medium connections', unlocked: spiritConnectCount >= 5 },
      { id: 'ach_3', title: '🦁 Cosmic Shifter', desc: 'Unlock Star-Wings or Crown assets', unlocked: purchasedFeatures.includes('acc_wings') || purchasedFeatures.includes('acc_crown') },
      { id: 'ach_4', title: '👑 Astral Overlord', desc: 'Complete Chapter 10 of story mode', unlocked: currentScene.chapter >= 10 }
    ];
  }, [score, spiritConnectCount, purchasedFeatures, currentScene]);
  function gainXP(amount) {
    let newXp = xp + amount;
    let newLevel = level;
    while (newXp >= xpNeededForLevel(newLevel)) {
      newXp -= xpNeededForLevel(newLevel);
      newLevel += 1;
    }
    setXp(newXp);
    setLevel(newLevel);
  }

  function consumeEnergyUnit() {
    if (isInfiniteEnergy) return true;
    if (energy <= 0) {
      setEnergyMessage('⚠️ Aura Energy exhausted! Refill or wait for recharges.');
      setTab('connect');
      return false;
    }
    setEnergy(e => e - 1);
    return true;
  }

  function claimDailyReward() {
    if (dailyClaimed) {
      setEnergyMessage('Daily reward already claimed.');
      return;
    }
    setCoins(v => v + 10);
    gainXP(8);
    setDailyClaimed(true);
    setEnergyMessage('Daily reward claimed: +10 coins, +8 XP');
  }

  function pullDailyHoroscope() {
    if (!consumeEnergyUnit()) return;
    const line = HOROSCOPE_LINES[Math.floor(Math.random() * HOROSCOPE_LINES.length)];
    setHoroscope(line);
    setCoins(v => v + 2);
    gainXP(2);
  }

  function levelUpSpirit() {
    const cost = 10;
    if (xp < cost) {
      setEnergyMessage(`You need ${cost} XP to level up right now.`);
      return;
    }
    setXp(v => v - cost);
    setLevel(v => v + 1);
    setCoins(v => v + 2);
    setEnergyMessage(`${renderForm()} leveled up.`);
  }

  function chooseSpirit(name) {
    if (SPIRIT_PATHS[name]) {
      setSelectedSpirit(name);
      setEnergyMessage(`Spirit path changed to ${name}.`);
    }
  }
  function connectSpirit() {
    if (!consumeEnergyUnit()) return;
    const cleaned = question.trim();
    setSpiritMessage(getSpiritReply(cleaned));
    if (cleaned && cleaned !== lastConnectedQuestion) {
      setCoins(v => v + 4);
      gainXP(6);
      setSpiritConnectCount(c => c + 1);
      setLastConnectedQuestion(cleaned);
    }
  }

  function pullTarot() {
    if (!consumeEnergyUnit()) return;
    const three = getThreeCards();
    setCards(three);
    setCoins(v => v + 3);
    gainXP(4);
  }

  function playRound(picked) {
    if (!consumeEnergyUnit()) return;
    if (picked === hiddenIndex) {
      setGameResult(`Correct. Hidden symbol was ${SYMBOLS[hiddenIndex]}.`);
      setScore(v => v + 10);
      setStreak(v => v + 1);
      setCoins(v => v + 3);
      gainXP(5);
    } else {
      setGameResult(`Wrong. Hidden symbol was ${SYMBOLS[hiddenIndex]}.`);
      setStreak(0);
      setScore(v => (v > 0 ? v - 2 : 0));
    }
    setHiddenIndex(Math.floor(Math.random() * SYMBOLS.length));
  }

  function makeStoryChoice(choice) {
    if (choice.coins) setCoins(v => v + choice.coins);
    if (choice.xp) gainXP(choice.xp);
    if (choice.spirit) setSelectedSpirit(choice.spirit);
    setStorySceneId(choice.next);
  }

  function renderForm() {
    if (level >= 15) return current.final;
    if (level >= 8) return current.evolved;
    return selectedSpirit;
  }

  function handleReadClairvoyantOrb() {
    if (!consumeEnergyUnit()) return;
    const vision = ORB_VISIONS[Math.floor(Math.random() * ORB_VISIONS.length)];
    setOrbVisionText(vision);
    gainXP(4);
  }

  function handleScanAuraField() {
    if (!consumeEnergyUnit()) return;
    const nextIdx = Math.floor(Math.random() * AURAS.length);
    setActiveAuraIndex(nextIdx);
    setCoins(v => v + 1);
    gainXP(3);
  }

  function handleGenerateLuckyVector() {
    if (!dob) {
      Alert.alert('Missing Date', 'Please enter your date of birth under Tarot first.');
      return;
    }
    const seed = Math.floor(Math.random() * 900) + 100;
    setLuckyNumberOutput(`🎯 Daily Vector: #${seed} • Lucky Frequency: ${(Math.random() * 500 + 400).toFixed(2)}Hz`);
    gainXP(5);
  }

  function handleProcessPurchase(tier) {
    if (tier.id === 'tier_mini') {
      setCoins(v => v + 50);
      setEnergy(e => Math.min(maxEnergy, e + 2));
    }
    if (tier.id === 'tier_med') {
      setCoins(v => v + 150);
      setEnergy(maxEnergy);
    }
    if (tier.id === 'tier_high') {
      setCoins(v => v + 700);
      setMaxEnergy(m => m + 5);
      setEnergy(e => e + 5);
    }
    if (tier.id === 'tier_god') {
      setCoins(v => v + 5000);
      setIsInfiniteEnergy(true);
      setPurchasedFeatures(['acc_wings', 'acc_crown', 'feat_portal']);
    }
    setEnergyMessage(`Transaction verified! Unlocked rewards.`);
  }

  function handleBuyAccessoryItem(item) {
    if (purchasedFeatures.includes(item.id)) {
      setEnergyMessage(`You already own ${item.title}!`);
      return;
    }
    if (coins < item.cost) {
      setEnergyMessage(`Insufficient Aura Coins. Need ${item.cost - coins} more.`);
      return;
    }
    setCoins(v => v - item.cost);
    setPurchasedFeatures(prev => [...prev, item.id]);
    setEnergyMessage(`Equipped: ${item.title}!`);
  }

  function labelForTab(name) {
    const map = { home: 'Hub', story: 'Story', game: 'Psychic', tarot: 'Tarot', spirit: 'Spirit', connect: 'Store' };
    return map[name];
  }

  function getCompanionImageUri() {
    if (level >= 15) return current.imgFinal;
    if (level >= 8) return current.imgEvolved;
    return current.imgBase;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SpiritLink Pro</Text>
      <Text style={styles.sub}>Google Play Active Edition • Infinite Regeneration Matrix</Text>

      <View style={styles.statsRow}>
        <View style={styles.statPill}><Text style={styles.statText}>Coins: {coins}</Text></View>
        <View style={styles.statPill}><Text style={styles.statText}>XP: {xp}</Text></View>
        <View style={styles.statPill}><Text style={styles.statText}>Level: {level}</Text></View>
        <View style={styles.statPill}><Text style={styles.statText}>Score: {score}</Text></View>
        <View style={[styles.statPill, { borderColor: '#a855f7' }]}>
          <Text style={styles.statText}>⚡ Energy: {isInfiniteEnergy ? '∞' : `${energy}/${maxEnergy}`}</Text>
        </View>
      </View>

      <View style={styles.tabRow}>
        {['home', 'story', 'game', 'tarot', 'spirit', 'connect'].map(name => (
          <Pressable key={name} onPress={() => setTab(name)} style={[styles.tabBtn, tab === name && styles.activeTab]}>
            <Text style={styles.tabText}>{labelForTab(name)}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {energyMessage ? <Text style={styles.toastMessage}>{energyMessage}</Text> : null}
        
        {tab === 'home' && (
          <View style={styles.card}>
            <Text style={styles.header}>✨ The Psychic Awakenings Registry</Text>
            <View style={styles.innerCard}>
              <Text style={styles.bodyStrong}>🔮 YOUR COSMIC MISSION</Text>
              <Text style={styles.body}>You are an Initiate born onto a shifting energy matrix. Train your third-eye frequency through daily focus exercises.</Text>
              <Text style={[styles.body, { marginTop: 8 }]}>📜 QUICK START GUIDE:</Text>
              <Text style={styles.body}>• Use the <Text style={{fontWeight:'700'}}>Psychic tab</Text> to predict hidden seals and build your streak score.</Text>
              <Text style={styles.body}>• Navigate <Text style={{fontWeight:'700'}}>Story Mode</Text> to complete your 10-chapter awakening.</Text>
              <Text style={styles.body}>• High psychic actions exhaust your <Text style={{color: '#a855f7', fontWeight:'700'}}>⚡ Energy</Text>, which recharges automatically over time or via Store packs.</Text>
              <Text style={styles.body}>• Earn Coins to purchase permanent <Text style={{color: '#38bdf8', fontWeight:'700'}}>💎 Vault Accessories</Text> for your animal companion.</Text>
            </View>

            <Pressable style={styles.bigBtn} onPress={pullDailyHoroscope}><Text style={styles.bigBtnText}>🌙 Pull Daily Horoscope</Text></Pressable>
            {!!horoscope && <View style={styles.innerCard}><Text style={styles.body}>{horoscope}</Text></View>}
            <Pressable style={styles.bigBtn} onPress={claimDailyReward}><Text style={styles.bigBtnText}>🎁 Claim Daily Reward</Text></Pressable>

            <View style={[styles.innerCard, { alignItems: 'center', backgroundColor: '#090d1a', borderColor: current.color || '#7c3aed', borderWidth: 2 }]}>
              <Text style={[styles.header, { color: 'white', marginBottom: 12 }]}>🐾 CURRENT GUARDIAN CHARACTER</Text>
              
              {purchasedFeatures.includes('acc_crown') && <Text style={{fontSize: 24, marginBottom: 4}}>👑 Aura Crown Active</Text>}
              
              <Image 
                source={{ uri: getCompanionImageUri() }} 
                style={{ width: 140, height: 140, borderRadius: 14, marginVertical: 10, backgroundColor: '#1e293b' }}
                resizeMode="contain"
              />

              {purchasedFeatures.includes('acc_wings') && <Text style={{color: '#38bdf8', fontWeight: '700', marginTop: 4}}>✨ Star-Wings Equipped 🪽</Text>}

              <Text style={[styles.bodyStrong, { marginTop: 10 }]}>Guardian: {selectedSpirit}</Text>
              <Text style={[styles.body, { color: '#94a3b8' }]}>Form Status: {renderForm()}</Text>
              <Text style={[styles.body, { fontStyle: 'italic', fontSize: 13, textAlign: 'center', marginTop: 4, color: current.color }]}>"{current.trait}"</Text>
            </View>

            <Pressable style={[styles.bigBtn, { backgroundColor: current.color || '#7c3aed' }]} onPress={levelUpSpirit}>
              <Text style={styles.bigBtnText}>⬆ Evolve Companion Aura (10 XP)</Text>
            </Pressable>

            <Text style={[styles.header, { marginTop: 20 }]}>🏆 Soul Achievements</Text>
            {achievementsList.map(ach => (
              <View key={ach.id} style={styles.achRow}>
                <Text style={[styles.bodyStrong, { color: ach.unlocked ? '#10b981' : '#64748b' }]}>{ach.title}</Text>
                <Text style={[styles.body, { fontSize: 13, color: '#94a3b8' }]}>{ach.desc} {ach.unlocked ? '🔓' : '🔒'}</Text>
              </View>
            ))}
          </View>
        )}

        {tab === 'story' && (
          <View style={styles.card}>
            <Text style={styles.header}>Infinite Story Arc</Text>
            <Text style={styles.chapterTag}>Chapter {currentScene.chapter}</Text>
            {!!currentScene.image && <Image source={{ uri: currentScene.image }} style={styles.storyImage} resizeMode="cover" />}
            <View style={styles.innerCard}>
              <Text style={styles.bodyStrong}>{currentScene.title}</Text>
              <Text style={styles.body}>{currentScene.text}</Text>
            </View>
            {currentScene.choices.map((choice, index) => (
              <Pressable key={index} style={styles.bigBtn} onPress={() => makeStoryChoice(choice)}>
                <Text style={styles.bigBtnText}>{choice.text}</Text>
              </Pressable>
            ))}
          </View>
        )}
        {tab === 'game' && (
          <View style={styles.card}>
            <Text style={styles.header}>U r Psychic Matrix</Text>
            
            {/* MINI-GAME QUICK MANUAL */}
            <View style={[styles.innerCard, { backgroundColor: '#131b2e', marginBottom: 12 }]}>
              <Text style={[styles.body, { fontSize: 14, color: '#94a3b8' }]}>🎮 HOW TO PLAY: Tap one of the 5 ancient vectors below. If your choice aligns with the system's hidden seed generation vector, you secure +10 Points and build your streak score!</Text>
            </View>

            <Text style={styles.body}>Streak Level: {streak}</Text>
            <View style={styles.symbolRow}>
              {SYMBOLS.map((symbol, index) => (
                <Pressable key={index} style={styles.symbolBtn} onPress={() => playRound(index)}>
                  <Text style={styles.symbolText}>{symbol}</Text>
                </Pressable>
              ))}
            </View>
            {!!gameResult && <View style={styles.innerCard}><Text style={styles.body}>{gameResult}</Text></View>}

            <Text style={[styles.header, { marginTop: 20 }]}>🔮 Clairvoyant Sight Orb</Text>
            <Pressable style={styles.bigBtn} onPress={handleReadClairvoyantOrb}><Text style={styles.bigBtnText}>👁️ Peer Into Unseen Timelines</Text></Pressable>
            {!!orbVisionText && <View style={styles.innerCard}><Text style={[styles.body, { fontStyle: 'italic' }]}>"{orbVisionText}"</Text></View>}

            <Text style={[styles.header, { marginTop: 20 }]}>🎯 Astral Vector Lookups</Text>
            <Pressable style={styles.bigBtn} onPress={handleGenerateLuckyVector}><Text style={styles.bigBtnText}>🎲 Read Lucky Vectors</Text></Pressable>
            {!!luckyNumberOutput && <View style={styles.innerCard}><Text style={styles.body}>{luckyNumberOutput}</Text></View>}
          </View>
        )}

        {tab === 'tarot' && (
          <View style={styles.card}>
            <Text style={styles.header}>Tarot Readings</Text>
            <Pressable style={styles.bigBtn} onPress={pullTarot}><Text style={styles.bigBtnText}>🃏 Pull 3 Alignment Cards</Text></Pressable>
            {cards.length > 0 && (
              <View style={styles.innerCard}>
                {cards.map((card, i) => (
                  <View key={i} style={{ marginBottom: 10 }}>
                    <Text style={styles.bodyStrong}>{card.name}</Text>
                    <Text style={styles.body}>{card.meaning}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={[styles.header, { marginTop: 14 }]}>🔢 Numerology Calculations</Text>
            <TextInput placeholder="Birthdate YYYY-MM-DD" placeholderTextColor="#94a3b8" value={dob} onChangeText={setDob} style={styles.input} />
            {lifePath && (
              <View style={styles.innerCard}>
                <Text style={styles.bodyStrong}>Life Path Arcana: {lifePath}</Text>
                <Text style={styles.body}>{lifePathMeaning(lifePath)}</Text>
              </View>
            )}

            <Text style={[styles.header, { marginTop: 14 }]}>🌈 Frequency Aura Scanners</Text>
            <Pressable style={styles.bigBtn} onPress={handleScanAuraField}><Text style={styles.bigBtnText}>⚡ Scan Current Aura Shield</Text></Pressable>
            {activeAuraIndex >= 0 && (
              <View style={[styles.innerCard, { borderColor: AURAS[activeAuraIndex].color, borderWidth: 1 }]}>
                <Text style={[styles.bodyStrong, { color: AURAS[activeAuraIndex].color }]}>Active Aura: {AURAS[activeAuraIndex].name}</Text>
                <Text style={styles.body}>{AURAS[activeAuraIndex].vibe}</Text>
              </View>
            )}
          </View>
        )}
        {tab === 'spirit' && (
          <View style={styles.card}>
            <Text style={styles.header}>Choose Your Spirit Path</Text>
            <View style={styles.choiceRow}>
              {Object.keys(SPIRIT_PATHS).map(name => (
                <Pressable key={name} onPress={() => chooseSpirit(name)} style={[styles.choiceBtn, selectedSpirit === name && { borderColor: SPIRIT_PATHS[name].color, backgroundColor: '#161f38' }]}>
                  <Text style={styles.choiceText}>{name}</Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.innerCard}>
              <Text style={styles.bodyStrong}>Active Companion Channel: {selectedSpirit}</Text>
              <Text style={styles.body}>{current.trait}</Text>
              <Text style={styles.body}>Evolution Matrix Status: {renderForm()}</Text>
            </View>
          </View>
        )}

        {tab === 'connect' && (
          <View style={styles.card}>
            <Text style={styles.header}>Spirit Connection Channel</Text>
            <TextInput placeholder="Jake, Teddy, love, money, future..." placeholderTextColor="#94a3b8" value={question} onChangeText={setQuestion} style={styles.input} />
            <Pressable style={styles.bigBtn} onPress={connectSpirit}><Text style={styles.bigBtnText}>✨ Connect Channel</Text></Pressable>
            {!!spiritMessage && <View style={styles.innerCard}><Text style={styles.body}>{spiritMessage}</Text></View>}

            <Text style={[styles.header, { marginTop: 22 }]}>🚪 Locked Past-Life Chamber</Text>
            {purchasedFeatures.includes('feat_portal') ? (
              <View style={styles.innerCard}>
                <Text style={styles.bodyStrong}>✨ Chamber Status: Unlocked</Text>
                <Text style={styles.body}>Your soul anchor is vibrating on a timeline from 1742. Your gift was geometric acoustics.</Text>
              </View>
            ) : (
              <View style={styles.innerCard}>
                <Text style={[styles.body, { color: '#ef4444', fontWeight: 'bold' }]}>🔒 Access Restrained</Text>
                <Text style={styles.body}>Unlock this portal in the store drawer below to read your past matrices.</Text>
              </View>
            )}

            <Text style={[styles.header, { marginTop: 22 }]}>🛍️ Guardian Vault Store (Premium Accessories)</Text>
            {ACCESSORY_SHOP.map(item => {
              const owned = purchasedFeatures.includes(item.id);
              return (
                <View key={item.id} style={styles.shopRow}>
                  <View style={{ flex: 1, paddingRight: 6 }}>
                    <Text style={styles.bodyStrong}>{item.title} {owned && '✅'}</Text>
                    <Text style={[styles.body, { fontSize: 13, color: '#94a3b8' }]}>{item.desc}</Text>
                  </View>
                  <Pressable style={[styles.shopBuyBtn, owned && { backgroundColor: '#475569' }]} onPress={() => handleBuyAccessoryItem(item)} disabled={owned}>
                    <Text style={styles.shopBuyBtnText}>{owned ? 'Owned' : `${item.cost} 🪙`}</Text>
                  </Pressable>
                </View>
              );
            })}

            <Text style={[styles.header, { marginTop: 26 }]}>💎 Pack Purchases (Store Tiers)</Text>
            {MONETIZATION_TIERS.map((tier) => (
              <View key={tier.id} style={styles.shopRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bodyStrong}>{tier.title}</Text>
                  <Text style={[styles.body, { color: '#94a3b8', fontSize: 13 }]}>{tier.items}</Text>
                </View>
                <Pressable style={[styles.shopBuyBtn, { backgroundColor: '#10b981' }]} onPress={() => handleProcessPurchase(tier)}>
                  <Text style={styles.shopBuyBtnText}>{tier.price}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050816', padding: 14 },
  title: { color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 4 },
  sub: { color: '#94a3b8', marginBottom: 14, fontSize: 15 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  statPill: { backgroundColor: '#1f2937', borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderColor: '#334155' },
  statText: { color: 'white', fontWeight: '600' },
  tabRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 },
  tabBtn: { backgroundColor: '#2f3545', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 12, minWidth: 70, alignItems: 'center' },
  activeTab: { backgroundColor: '#6d28d9' },
  tabText: { color: 'white', fontSize: 14, fontWeight: '600' },
  card: { backgroundColor: '#0f172a', borderRadius: 18, padding: 16, marginBottom: 16 },
  innerCard: { backgroundColor: '#162033', borderRadius: 14, padding: 14, marginTop: 14 },
  header: { color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  body: { color: 'white', fontSize: 16, lineHeight: 24 },
  bodyStrong: { color: 'white', fontSize: 17, fontWeight: '700', marginBottom: 4 },
  bigBtn: { backgroundColor: '#7c3aed', borderRadius: 18, paddingVertical: 18, paddingHorizontal: 16, marginTop: 14 },
  bigBtnText: { color: 'white', fontSize: 17, fontWeight: '700' },
  input: { marginTop: 12, backgroundColor: '#1e293b', color: 'white', borderRadius: 14, padding: 14, fontSize: 16 },
  choiceRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginTop: 8 },
  choiceBtn: { flex: 1, backgroundColor: '#1f2937', borderRadius: 14, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  choiceText: { color: 'white', fontWeight: '600' },
  symbolRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14, justifyContent: 'space-between' },
  symbolBtn: { backgroundColor: '#1f2937', borderRadius: 14, paddingVertical: 18, width: '18%', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  symbolText: { color: 'white', fontSize: 22, fontWeight: '700' },
  storyImage: { width: '100%', height: 190, borderRadius: 16, marginBottom: 12 },
  chapterTag: { color: '#c4b5fd', marginBottom: 10, fontWeight: '700' },
  shopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#162033', borderRadius: 14, padding: 14, marginTop: 12 },
  shopBuyBtn: { backgroundColor: '#a855f7', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 14 },
  shopBuyBtnText: { color: 'white', fontSize: 15, fontWeight: '700' },
  toastMessage: { backgroundColor: '#7f1d1d', color: '#fca5a5', textAlign: 'center', padding: 12, borderRadius: 14, marginBottom: 14, overflow: 'hidden', fontWeight: '700' },
  accessoryTag: { color: '#38bdf8', fontSize: 14, fontWeight: '700', marginTop: 4 },
  achRow: { backgroundColor: '#09090b', padding: 12, borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: '#27272a' },
});
