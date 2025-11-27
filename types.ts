export interface BibleCharacter {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or generic icon placeholder
}

export const CHARACTERS: BibleCharacter[] = [
  { id: 'jesus', name: 'Jesus', description: 'The Savior, often depicted in humble robes.', icon: '✝️' },
  { id: 'moses', name: 'Moses', description: 'Prophet who parted the Red Sea, holding a staff.', icon: '🌊' },
  { id: 'david', name: 'King David', description: 'The shepherd king, perhaps with a harp or sling.', icon: '👑' },
  { id: 'mary', name: 'Virgin Mary', description: 'Mother of Jesus, gentle and serene.', icon: '🙏' },
  { id: 'peter', name: 'Peter', description: 'The fisherman and apostle, holding keys.', icon: '🗝️' },
  { id: 'paul', name: 'Paul', description: 'The apostle to the Gentiles, holding a scroll.', icon: '📜' },
  { id: 'noah', name: 'Noah', description: 'Builder of the Ark, with a dove.', icon: '🕊️' },
  { id: 'esther', name: 'Queen Esther', description: 'The courageous queen of Persia.', icon: '👸' },
];

export interface GeneratedImageState {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}