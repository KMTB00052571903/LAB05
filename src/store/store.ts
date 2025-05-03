import { dispatcher } from './dispatcher';
import { Action, ActionTypes } from './actions';
import { AppState, StoreCallback, StoreEvent, StoreConfig, Fight, Character } from './types';
import { initialFights } from '../models/fight';

const DEFAULT_CONFIG: StoreConfig = {
  enableLogging: true,
  persistToLocalStorage: false
};

export class Store {
  private static instance: Store;
  private state: AppState;
  private subscribers: Map<StoreEvent, StoreCallback[]> = new Map();
  private config: StoreConfig;
  private isRegistered: boolean = false;

  private constructor(config: Partial<StoreConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = this.initialState();
    this.setupDispatcher();
    this.loadFromLocalStorage();
  }

  public static getInstance(config?: Partial<StoreConfig>): Store {
    if (!Store.instance) {
      Store.instance = new Store(config);
    }
    return Store.instance;
  }

  private initialState(): AppState {
    return {
      fights: initialFights,
      totalVotes: 0,
      lastUpdated: new Date()
    };
  }

  private setupDispatcher(): void {
    if (!this.isRegistered) {
      dispatcher.register((action) => {
        const prevState = this.state;
        this.reduce(action);
        this.handleStateChange(prevState);
      });
      this.isRegistered = true;
    }
  }

  private reduce(action: Action): void {
    switch (action.type) {
      case ActionTypes.VOTE:
        this.handleVote(action.payload);
        break;
      case ActionTypes.RESET:
        this.state = this.initialState();
        break;
      case ActionTypes.ADD_FIGHT:
        this.state.fights.push(action.payload.fight);
        break;
      default:
        if (this.config.enableLogging) {
          console.warn(`Acción desconocida: ${action.type}`);
        }
    }

    this.state.lastUpdated = new Date();
    this.state.totalVotes = this.calculateTotalVotes();
  }

  private handleVote(payload: { fightId: string; characterId: string }): void {
    const { fightId, characterId } = payload;
    
    this.state.fights = this.state.fights.map(fight => {
      if (fight.id === fightId) {
        return {
          ...fight,
          characters: fight.characters.map(char => {
            if (char.id === characterId) {
              return { ...char, votes: char.votes + 1 };
            }
            return char;
          }) as [Character, Character]
        };
      }
      return fight;
    });

    this.notifySubscribers('vote-registered');
  }

  private calculateTotalVotes(): number {
    return this.state.fights.reduce((total, fight) => {
      return total + fight.characters[0].votes + fight.characters[1].votes;
    }, 0);
  }

  private handleStateChange(prevState: AppState): void {
    if (prevState !== this.state) {
      this.notifySubscribers('state-changed');
      this.saveToLocalStorage();
    }
  }

  private notifySubscribers(event: StoreEvent): void {
    const callbacks = this.subscribers.get(event) || [];
    callbacks.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Error en callback del store:', error);
      }
    });
  }

  // Persistencia
  private loadFromLocalStorage(): void {
    if (!this.config.persistToLocalStorage) return;

    const savedState = localStorage.getItem('voting-app-state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Validación básica del estado recuperado
        if (parsed && Array.isArray(parsed.fights)) {
          this.state = {
            ...parsed,
            lastUpdated: new Date(parsed.lastUpdated)
          };
        }
      } catch (error) {
        console.error('Error al cargar el estado:', error);
      }
    }
  }

  private saveToLocalStorage(): void {
    if (this.config.persistToLocalStorage) {
      localStorage.setItem('voting-app-state', JSON.stringify(this.state));
    }
  }

  // API pública
  public getState(): AppState {
    return this.state;
  }

  public subscribe(event: StoreEvent, callback: StoreCallback): () => void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    const callbacks = this.subscribers.get(event)!;
    callbacks.push(callback);

    // Retorna función para desuscribirse
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  public dispatch(action: Action): void {
    dispatcher.dispatch(action);
  }
}