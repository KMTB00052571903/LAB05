export interface Character {
    id: string;
    name: string;
    image: string;
    votes: number;
    description?: string;
  }
  
  export interface Fight {
    id: string;
    title: string;
    date?: Date;
    characters: [Character, Character];
    category?: string;
  }
  
  export interface AppState {
    fights: Fight[];
    totalVotes: number;
    lastUpdated?: Date;
  }
  
  // Tipos para los eventos del store
  export type StoreEvent = 'state-changed' | 'vote-registered';
  
  // Callback para suscriptores del store
  export type StoreCallback = (state: AppState) => void;
  
  // Tipo para las opciones de inicialización del store
  export interface StoreConfig {
    enableLogging?: boolean;
    persistToLocalStorage?: boolean;
  }