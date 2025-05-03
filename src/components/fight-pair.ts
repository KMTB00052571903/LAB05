import { Store } from '@store/store';
import { ActionTypes } from '@store/actions';
import './character-card';

// Declarar el tipo del evento personalizado
declare global {
  interface HTMLElementEventMap {
    'vote': CustomEvent<{ characterId: string }>;
  }
}

export class FightPair extends HTMLElement {
  private store: Store;
  private fightId: string;

  constructor() {
    super();
    this.store = Store.getInstance();
    this.fightId = this.getAttribute('fight-id') || '';
  }

  static get observedAttributes() {
    return ['fight-id'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'fight-id' && oldValue !== newValue) {
      this.fightId = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.store.subscribe('state-changed', () => this.render());
    this.store.subscribe('vote-registered', () => this.render());
    this.render();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.addEventListener('vote', (e: CustomEvent) => {
      e.stopPropagation(); // Detener la propagación del evento
      const { characterId } = e.detail;
      this.store.dispatch({
        type: ActionTypes.VOTE,
        payload: { fightId: this.fightId, characterId }
      });
    });
  }

  render() {
    const fight = this.store.getState().fights.find(f => f.id === this.fightId);
    if (!fight) return;

    const totalVotes = fight.characters[0].votes + fight.characters[1].votes;

    this.innerHTML = `
      <div class="fight-pair">
        <h2>${fight.title}</h2>
        <div class="characters">
          <character-card
            character-id="${fight.characters[0].id}"
            name="${fight.characters[0].name}"
            image="${fight.characters[0].image}"
            votes="${fight.characters[0].votes}"
            total-votes="${totalVotes}"
          ></character-card>
          <span class="vs">VS</span>
          <character-card
            character-id="${fight.characters[1].id}"
            name="${fight.characters[1].name}"
            image="${fight.characters[1].image}"
            votes="${fight.characters[1].votes}"
            total-votes="${totalVotes}"
          ></character-card>
        </div>
      </div>
    `;
  }
}

customElements.define('fight-pair', FightPair);