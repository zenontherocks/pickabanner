import { useState, useRef, useEffect } from 'react';

interface EmojiEntry { emoji: string; name: string }

const EMOJI_LIST: EmojiEntry[] = [
  // Smileys & emotion
  { emoji: '😀', name: 'grinning face' },
  { emoji: '😂', name: 'face with tears of joy' },
  { emoji: '🥲', name: 'smiling face with tear' },
  { emoji: '😍', name: 'smiling face with heart eyes' },
  { emoji: '🤩', name: 'star struck' },
  { emoji: '😎', name: 'smiling face with sunglasses cool' },
  { emoji: '🥳', name: 'partying face celebrate' },
  { emoji: '😴', name: 'sleeping face tired' },
  { emoji: '🤔', name: 'thinking face' },
  { emoji: '😤', name: 'face with steam from nose angry' },
  { emoji: '😭', name: 'loudly crying face sad' },
  { emoji: '😱', name: 'face screaming in fear shocked' },
  { emoji: '🤯', name: 'exploding head mind blown' },
  { emoji: '🥶', name: 'cold face freezing' },
  { emoji: '🥵', name: 'hot face sweating' },
  { emoji: '👻', name: 'ghost spooky' },
  { emoji: '💀', name: 'skull dead' },
  { emoji: '🤖', name: 'robot' },
  { emoji: '👽', name: 'alien extraterrestrial' },
  { emoji: '🎃', name: 'jack o lantern halloween pumpkin' },
  // Hand gestures & people
  { emoji: '👍', name: 'thumbs up like good' },
  { emoji: '👎', name: 'thumbs down dislike bad' },
  { emoji: '✌️', name: 'victory hand peace' },
  { emoji: '🤞', name: 'crossed fingers luck' },
  { emoji: '🤙', name: 'call me hand shaka' },
  { emoji: '👋', name: 'waving hand hello goodbye' },
  { emoji: '🙌', name: 'raising hands celebrate praise' },
  { emoji: '👏', name: 'clapping hands applause' },
  { emoji: '🤝', name: 'handshake deal agreement' },
  { emoji: '🙏', name: 'folded hands please thank you pray' },
  { emoji: '💪', name: 'flexed bicep strong muscle' },
  { emoji: '🫶', name: 'heart hands love' },
  { emoji: '👀', name: 'eyes watching looking' },
  { emoji: '💅', name: 'nail polish fancy' },
  // Animals
  { emoji: '🐶', name: 'dog puppy' },
  { emoji: '🐱', name: 'cat kitten' },
  { emoji: '🦊', name: 'fox' },
  { emoji: '🐺', name: 'wolf' },
  { emoji: '🦁', name: 'lion' },
  { emoji: '🐯', name: 'tiger' },
  { emoji: '🐻', name: 'bear' },
  { emoji: '🐼', name: 'panda' },
  { emoji: '🐨', name: 'koala' },
  { emoji: '🦄', name: 'unicorn' },
  { emoji: '🐸', name: 'frog' },
  { emoji: '🦆', name: 'duck' },
  { emoji: '🦅', name: 'eagle bird' },
  { emoji: '🦋', name: 'butterfly' },
  { emoji: '🐙', name: 'octopus' },
  { emoji: '🦈', name: 'shark' },
  { emoji: '🐊', name: 'crocodile alligator' },
  { emoji: '🦖', name: 'dinosaur t-rex' },
  { emoji: '🐉', name: 'dragon' },
  { emoji: '🦑', name: 'squid' },
  // Food & drink
  { emoji: '🍕', name: 'pizza' },
  { emoji: '🍔', name: 'hamburger burger' },
  { emoji: '🌮', name: 'taco' },
  { emoji: '🍣', name: 'sushi' },
  { emoji: '🍜', name: 'noodles ramen' },
  { emoji: '🍩', name: 'donut doughnut' },
  { emoji: '🍦', name: 'ice cream soft serve' },
  { emoji: '🎂', name: 'birthday cake' },
  { emoji: '🍺', name: 'beer mug' },
  { emoji: '☕', name: 'coffee hot beverage' },
  { emoji: '🧃', name: 'juice box' },
  { emoji: '🌶️', name: 'hot pepper chili spicy' },
  { emoji: '🥑', name: 'avocado' },
  { emoji: '🍓', name: 'strawberry' },
  // Travel & places
  { emoji: '✈️', name: 'airplane flight travel' },
  { emoji: '🚀', name: 'rocket space launch' },
  { emoji: '🏖️', name: 'beach umbrella ocean' },
  { emoji: '🏔️', name: 'mountain snow' },
  { emoji: '🗺️', name: 'world map' },
  { emoji: '🏕️', name: 'camping tent' },
  { emoji: '🗼', name: 'eiffel tower paris' },
  { emoji: '🗽', name: 'statue of liberty new york' },
  { emoji: '🏯', name: 'japanese castle' },
  { emoji: '🌋', name: 'volcano' },
  { emoji: '🏝️', name: 'island desert' },
  { emoji: '🚂', name: 'train locomotive' },
  { emoji: '⛵', name: 'sailboat' },
  { emoji: '🚁', name: 'helicopter' },
  { emoji: '🌍', name: 'earth africa europe globe' },
  { emoji: '🌎', name: 'earth americas globe' },
  { emoji: '🌏', name: 'earth asia globe' },
  // Activities & sports
  { emoji: '⚽', name: 'soccer football' },
  { emoji: '🏀', name: 'basketball' },
  { emoji: '🏈', name: 'american football' },
  { emoji: '⚾', name: 'baseball' },
  { emoji: '🎾', name: 'tennis' },
  { emoji: '🏒', name: 'ice hockey' },
  { emoji: '🎿', name: 'skis skiing' },
  { emoji: '🏄', name: 'surfing' },
  { emoji: '🧗', name: 'climbing' },
  { emoji: '🎮', name: 'video game controller' },
  { emoji: '🎸', name: 'guitar music' },
  { emoji: '🎹', name: 'piano keyboard music' },
  { emoji: '🎨', name: 'palette art painting' },
  { emoji: '📷', name: 'camera photo' },
  { emoji: '🔭', name: 'telescope astronomy' },
  // Objects & symbols
  { emoji: '❤️', name: 'red heart love' },
  { emoji: '🧡', name: 'orange heart' },
  { emoji: '💛', name: 'yellow heart' },
  { emoji: '💚', name: 'green heart' },
  { emoji: '💙', name: 'blue heart' },
  { emoji: '💜', name: 'purple heart' },
  { emoji: '🖤', name: 'black heart' },
  { emoji: '🤍', name: 'white heart' },
  { emoji: '💯', name: 'hundred points perfect' },
  { emoji: '🔥', name: 'fire hot flame' },
  { emoji: '⭐', name: 'star' },
  { emoji: '🌈', name: 'rainbow' },
  { emoji: '⚡', name: 'lightning bolt electric' },
  { emoji: '❄️', name: 'snowflake cold winter' },
  { emoji: '🌊', name: 'wave ocean water' },
  { emoji: '💥', name: 'explosion boom' },
  { emoji: '🎯', name: 'bullseye target' },
  { emoji: '🏆', name: 'trophy winner champion' },
  { emoji: '🎉', name: 'party popper celebrate' },
  { emoji: '💎', name: 'diamond gem' },
  { emoji: '🔑', name: 'key' },
  { emoji: '⚔️', name: 'crossed swords battle' },
  { emoji: '🛡️', name: 'shield defense' },
  { emoji: '☠️', name: 'skull crossbones pirate danger' },
  { emoji: '☮️', name: 'peace symbol' },
  { emoji: '☯️', name: 'yin yang balance' },
  { emoji: '✡️', name: 'star of david jewish' },
  { emoji: '☪️', name: 'star and crescent islam' },
  { emoji: '✝️', name: 'cross christian' },
  { emoji: '🌙', name: 'crescent moon night' },
  { emoji: '☀️', name: 'sun sunny' },
  { emoji: '🌟', name: 'glowing star' },
  { emoji: '🍀', name: 'four leaf clover luck' },
  { emoji: '🌸', name: 'cherry blossom flower' },
  { emoji: '🌺', name: 'hibiscus flower' },
  { emoji: '🌵', name: 'cactus desert' },
  { emoji: '🌴', name: 'palm tree tropical' },
  { emoji: '🍁', name: 'maple leaf autumn canada' },
  { emoji: '🐾', name: 'paw prints animal' },
  { emoji: '👑', name: 'crown king queen royal' },
  { emoji: '🗡️', name: 'dagger knife' },
  { emoji: '🏳️', name: 'white flag surrender' },
  { emoji: '🏴', name: 'black flag pirate' },
  { emoji: '🏁', name: 'checkered flag racing finish' },
  { emoji: '🚩', name: 'red flag triangular' },
  { emoji: '🎌', name: 'crossed flags japan' },
  // Country flags
  { emoji: '🇦🇫', name: 'flag Afghanistan' },
  { emoji: '🇦🇱', name: 'flag Albania' },
  { emoji: '🇩🇿', name: 'flag Algeria' },
  { emoji: '🇦🇩', name: 'flag Andorra' },
  { emoji: '🇦🇴', name: 'flag Angola' },
  { emoji: '🇦🇬', name: 'flag Antigua and Barbuda' },
  { emoji: '🇦🇷', name: 'flag Argentina' },
  { emoji: '🇦🇲', name: 'flag Armenia' },
  { emoji: '🇦🇺', name: 'flag Australia' },
  { emoji: '🇦🇹', name: 'flag Austria' },
  { emoji: '🇦🇿', name: 'flag Azerbaijan' },
  { emoji: '🇧🇸', name: 'flag Bahamas' },
  { emoji: '🇧🇭', name: 'flag Bahrain' },
  { emoji: '🇧🇩', name: 'flag Bangladesh' },
  { emoji: '🇧🇧', name: 'flag Barbados' },
  { emoji: '🇧🇾', name: 'flag Belarus' },
  { emoji: '🇧🇪', name: 'flag Belgium' },
  { emoji: '🇧🇿', name: 'flag Belize' },
  { emoji: '🇧🇯', name: 'flag Benin' },
  { emoji: '🇧🇹', name: 'flag Bhutan' },
  { emoji: '🇧🇴', name: 'flag Bolivia' },
  { emoji: '🇧🇦', name: 'flag Bosnia and Herzegovina' },
  { emoji: '🇧🇼', name: 'flag Botswana' },
  { emoji: '🇧🇷', name: 'flag Brazil' },
  { emoji: '🇧🇳', name: 'flag Brunei' },
  { emoji: '🇧🇬', name: 'flag Bulgaria' },
  { emoji: '🇧🇫', name: 'flag Burkina Faso' },
  { emoji: '🇧🇮', name: 'flag Burundi' },
  { emoji: '🇨🇻', name: 'flag Cabo Verde' },
  { emoji: '🇰🇭', name: 'flag Cambodia' },
  { emoji: '🇨🇲', name: 'flag Cameroon' },
  { emoji: '🇨🇦', name: 'flag Canada' },
  { emoji: '🇨🇫', name: 'flag Central African Republic' },
  { emoji: '🇹🇩', name: 'flag Chad' },
  { emoji: '🇨🇱', name: 'flag Chile' },
  { emoji: '🇨🇳', name: 'flag China' },
  { emoji: '🇨🇴', name: 'flag Colombia' },
  { emoji: '🇰🇲', name: 'flag Comoros' },
  { emoji: '🇨🇩', name: 'flag Congo' },
  { emoji: '🇨🇷', name: 'flag Costa Rica' },
  { emoji: '🇨🇮', name: 'flag Cote d Ivoire' },
  { emoji: '🇭🇷', name: 'flag Croatia' },
  { emoji: '🇨🇺', name: 'flag Cuba' },
  { emoji: '🇨🇾', name: 'flag Cyprus' },
  { emoji: '🇨🇿', name: 'flag Czech Republic Czechia' },
  { emoji: '🇩🇰', name: 'flag Denmark' },
  { emoji: '🇩🇯', name: 'flag Djibouti' },
  { emoji: '🇩🇲', name: 'flag Dominica' },
  { emoji: '🇩🇴', name: 'flag Dominican Republic' },
  { emoji: '🇪🇨', name: 'flag Ecuador' },
  { emoji: '🇪🇬', name: 'flag Egypt' },
  { emoji: '🇸🇻', name: 'flag El Salvador' },
  { emoji: '🇬🇶', name: 'flag Equatorial Guinea' },
  { emoji: '🇪🇷', name: 'flag Eritrea' },
  { emoji: '🇪🇪', name: 'flag Estonia' },
  { emoji: '🇸🇿', name: 'flag Eswatini' },
  { emoji: '🇪🇹', name: 'flag Ethiopia' },
  { emoji: '🇫🇯', name: 'flag Fiji' },
  { emoji: '🇫🇮', name: 'flag Finland' },
  { emoji: '🇫🇷', name: 'flag France' },
  { emoji: '🇬🇦', name: 'flag Gabon' },
  { emoji: '🇬🇲', name: 'flag Gambia' },
  { emoji: '🇬🇪', name: 'flag Georgia' },
  { emoji: '🇩🇪', name: 'flag Germany' },
  { emoji: '🇬🇭', name: 'flag Ghana' },
  { emoji: '🇬🇷', name: 'flag Greece' },
  { emoji: '🇬🇩', name: 'flag Grenada' },
  { emoji: '🇬🇹', name: 'flag Guatemala' },
  { emoji: '🇬🇳', name: 'flag Guinea' },
  { emoji: '🇬🇼', name: 'flag Guinea-Bissau' },
  { emoji: '🇬🇾', name: 'flag Guyana' },
  { emoji: '🇭🇹', name: 'flag Haiti' },
  { emoji: '🇭🇳', name: 'flag Honduras' },
  { emoji: '🇭🇺', name: 'flag Hungary' },
  { emoji: '🇮🇸', name: 'flag Iceland' },
  { emoji: '🇮🇳', name: 'flag India' },
  { emoji: '🇮🇩', name: 'flag Indonesia' },
  { emoji: '🇮🇷', name: 'flag Iran' },
  { emoji: '🇮🇶', name: 'flag Iraq' },
  { emoji: '🇮🇪', name: 'flag Ireland' },
  { emoji: '🇮🇱', name: 'flag Israel' },
  { emoji: '🇮🇹', name: 'flag Italy' },
  { emoji: '🇯🇲', name: 'flag Jamaica' },
  { emoji: '🇯🇵', name: 'flag Japan' },
  { emoji: '🇯🇴', name: 'flag Jordan' },
  { emoji: '🇰🇿', name: 'flag Kazakhstan' },
  { emoji: '🇰🇪', name: 'flag Kenya' },
  { emoji: '🇰🇮', name: 'flag Kiribati' },
  { emoji: '🇽🇰', name: 'flag Kosovo' },
  { emoji: '🇰🇼', name: 'flag Kuwait' },
  { emoji: '🇰🇬', name: 'flag Kyrgyzstan' },
  { emoji: '🇱🇦', name: 'flag Laos' },
  { emoji: '🇱🇻', name: 'flag Latvia' },
  { emoji: '🇱🇧', name: 'flag Lebanon' },
  { emoji: '🇱🇸', name: 'flag Lesotho' },
  { emoji: '🇱🇷', name: 'flag Liberia' },
  { emoji: '🇱🇾', name: 'flag Libya' },
  { emoji: '🇱🇮', name: 'flag Liechtenstein' },
  { emoji: '🇱🇹', name: 'flag Lithuania' },
  { emoji: '🇱🇺', name: 'flag Luxembourg' },
  { emoji: '🇲🇬', name: 'flag Madagascar' },
  { emoji: '🇲🇼', name: 'flag Malawi' },
  { emoji: '🇲🇾', name: 'flag Malaysia' },
  { emoji: '🇲🇻', name: 'flag Maldives' },
  { emoji: '🇲🇱', name: 'flag Mali' },
  { emoji: '🇲🇹', name: 'flag Malta' },
  { emoji: '🇲🇭', name: 'flag Marshall Islands' },
  { emoji: '🇲🇷', name: 'flag Mauritania' },
  { emoji: '🇲🇺', name: 'flag Mauritius' },
  { emoji: '🇲🇽', name: 'flag Mexico' },
  { emoji: '🇫🇲', name: 'flag Micronesia' },
  { emoji: '🇲🇩', name: 'flag Moldova' },
  { emoji: '🇲🇨', name: 'flag Monaco' },
  { emoji: '🇲🇳', name: 'flag Mongolia' },
  { emoji: '🇲🇪', name: 'flag Montenegro' },
  { emoji: '🇲🇦', name: 'flag Morocco' },
  { emoji: '🇲🇿', name: 'flag Mozambique' },
  { emoji: '🇲🇲', name: 'flag Myanmar Burma' },
  { emoji: '🇳🇦', name: 'flag Namibia' },
  { emoji: '🇳🇷', name: 'flag Nauru' },
  { emoji: '🇳🇵', name: 'flag Nepal' },
  { emoji: '🇳🇱', name: 'flag Netherlands Holland' },
  { emoji: '🇳🇿', name: 'flag New Zealand' },
  { emoji: '🇳🇮', name: 'flag Nicaragua' },
  { emoji: '🇳🇪', name: 'flag Niger' },
  { emoji: '🇳🇬', name: 'flag Nigeria' },
  { emoji: '🇲🇰', name: 'flag North Macedonia' },
  { emoji: '🇳🇴', name: 'flag Norway' },
  { emoji: '🇴🇲', name: 'flag Oman' },
  { emoji: '🇵🇰', name: 'flag Pakistan' },
  { emoji: '🇵🇼', name: 'flag Palau' },
  { emoji: '🇵🇦', name: 'flag Panama' },
  { emoji: '🇵🇬', name: 'flag Papua New Guinea' },
  { emoji: '🇵🇾', name: 'flag Paraguay' },
  { emoji: '🇵🇪', name: 'flag Peru' },
  { emoji: '🇵🇭', name: 'flag Philippines' },
  { emoji: '🇵🇱', name: 'flag Poland' },
  { emoji: '🇵🇹', name: 'flag Portugal' },
  { emoji: '🇶🇦', name: 'flag Qatar' },
  { emoji: '🇷🇴', name: 'flag Romania' },
  { emoji: '🇷🇺', name: 'flag Russia' },
  { emoji: '🇷🇼', name: 'flag Rwanda' },
  { emoji: '🇰🇳', name: 'flag Saint Kitts and Nevis' },
  { emoji: '🇱🇨', name: 'flag Saint Lucia' },
  { emoji: '🇻🇨', name: 'flag Saint Vincent and the Grenadines' },
  { emoji: '🇼🇸', name: 'flag Samoa' },
  { emoji: '🇸🇲', name: 'flag San Marino' },
  { emoji: '🇸🇹', name: 'flag Sao Tome and Principe' },
  { emoji: '🇸🇦', name: 'flag Saudi Arabia' },
  { emoji: '🇸🇳', name: 'flag Senegal' },
  { emoji: '🇷🇸', name: 'flag Serbia' },
  { emoji: '🇸🇨', name: 'flag Seychelles' },
  { emoji: '🇸🇱', name: 'flag Sierra Leone' },
  { emoji: '🇸🇬', name: 'flag Singapore' },
  { emoji: '🇸🇰', name: 'flag Slovakia' },
  { emoji: '🇸🇮', name: 'flag Slovenia' },
  { emoji: '🇸🇧', name: 'flag Solomon Islands' },
  { emoji: '🇸🇴', name: 'flag Somalia' },
  { emoji: '🇿🇦', name: 'flag South Africa' },
  { emoji: '🇸🇸', name: 'flag South Sudan' },
  { emoji: '🇪🇸', name: 'flag Spain' },
  { emoji: '🇱🇰', name: 'flag Sri Lanka' },
  { emoji: '🇸🇩', name: 'flag Sudan' },
  { emoji: '🇸🇷', name: 'flag Suriname' },
  { emoji: '🇸🇪', name: 'flag Sweden' },
  { emoji: '🇨🇭', name: 'flag Switzerland' },
  { emoji: '🇸🇾', name: 'flag Syria' },
  { emoji: '🇹🇼', name: 'flag Taiwan' },
  { emoji: '🇹🇯', name: 'flag Tajikistan' },
  { emoji: '🇹🇿', name: 'flag Tanzania' },
  { emoji: '🇹🇭', name: 'flag Thailand' },
  { emoji: '🇹🇱', name: 'flag Timor-Leste' },
  { emoji: '🇹🇬', name: 'flag Togo' },
  { emoji: '🇹🇴', name: 'flag Tonga' },
  { emoji: '🇹🇹', name: 'flag Trinidad and Tobago' },
  { emoji: '🇹🇳', name: 'flag Tunisia' },
  { emoji: '🇹🇷', name: 'flag Turkey Turkiye' },
  { emoji: '🇹🇲', name: 'flag Turkmenistan' },
  { emoji: '🇹🇻', name: 'flag Tuvalu' },
  { emoji: '🇺🇬', name: 'flag Uganda' },
  { emoji: '🇺🇦', name: 'flag Ukraine' },
  { emoji: '🇦🇪', name: 'flag United Arab Emirates UAE' },
  { emoji: '🇬🇧', name: 'flag United Kingdom UK Britain England' },
  { emoji: '🇺🇸', name: 'flag United States USA America' },
  { emoji: '🇺🇾', name: 'flag Uruguay' },
  { emoji: '🇺🇿', name: 'flag Uzbekistan' },
  { emoji: '🇻🇺', name: 'flag Vanuatu' },
  { emoji: '🇻🇦', name: 'flag Vatican City Holy See' },
  { emoji: '🇻🇪', name: 'flag Venezuela' },
  { emoji: '🇻🇳', name: 'flag Vietnam' },
  { emoji: '🇾🇪', name: 'flag Yemen' },
  { emoji: '🇿🇲', name: 'flag Zambia' },
  { emoji: '🇿🇼', name: 'flag Zimbabwe' },
  // Territories & special flags
  { emoji: '🇪🇺', name: 'flag European Union Europe' },
  { emoji: '🇺🇳', name: 'flag United Nations' },
  { emoji: '🇵🇷', name: 'flag Puerto Rico' },
  { emoji: '🇭🇰', name: 'flag Hong Kong' },
  { emoji: '🇬🇮', name: 'flag Gibraltar' },
  { emoji: '🇬🇱', name: 'flag Greenland' },
  { emoji: '🇧🇲', name: 'flag Bermuda' },
  { emoji: '🇨🇾', name: 'flag Cyprus' },
  { emoji: '🇮🇸', name: 'flag Iceland' },
  { emoji: '🇲🇴', name: 'flag Macao' },
  { emoji: '🇵🇸', name: 'flag Palestine' },
  { emoji: '🇦🇶', name: 'flag Antarctica' },
];

interface CharacterPickerProps {
  value: string;
  onChange: (char: string) => void;
}

export default function CharacterPicker({ value, onChange }: CharacterPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pasteInput, setPasteInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = search.trim()
    ? EMOJI_LIST.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    : EMOJI_LIST;

  function selectEmoji(emoji: string) {
    onChange(emoji);
    setPasteInput('');
    setOpen(false);
    setSearch('');
  }

  function handlePaste(e: React.ChangeEvent<HTMLInputElement>) {
    const segments = [...new Intl.Segmenter().segment(e.target.value)];
    const first = segments[0]?.segment ?? '';
    setPasteInput(first);
    onChange(first);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Dropdown picker */}
      <div ref={dropdownRef} className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Choose an icon</label>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <span className="flex items-center gap-2">
            {value ? <span className="text-xl">{value}</span> : <span className="text-gray-400">Browse emoji &amp; flags…</span>}
          </span>
          <span className="text-gray-400 text-xs">{open ? '▲' : '▼'}</span>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-2 border-b border-gray-100">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search…"
                className="w-full text-sm px-2 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                autoFocus
              />
            </div>
            <div className="grid grid-cols-8 gap-0.5 p-2 max-h-52 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="col-span-8 text-center text-xs text-gray-400 py-4">No results</div>
              )}
              {filtered.map(e => (
                <button
                  key={e.emoji}
                  type="button"
                  title={e.name}
                  onClick={() => selectEmoji(e.emoji)}
                  className={`text-2xl p-1 rounded hover:bg-indigo-50 transition-colors ${value === e.emoji ? 'bg-indigo-100 ring-2 ring-indigo-400' : ''}`}
                >
                  {e.emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className="flex-1 h-px bg-gray-200" />
        or
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Paste input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Copy/paste your own</label>
        <input
          type="text"
          value={pasteInput}
          onChange={handlePaste}
          placeholder="Paste any emoji or character…"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <p className="text-xs text-gray-400 mt-1 text-center">
          <a href="https://emojipedia.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Emojipedia</a>
          {' '}has a huge list to browse.
        </p>
      </div>
    </div>
  );
}
