import { Store } from '@store/store';

class VotingStats extends HTMLElement {
  private store: Store;

  constructor() {
    super();
    this.store = Store.getInstance();
    this.store.subscribe('state-changed', this.render.bind(this));
    this.store.subscribe('vote-registered', this.render.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  private calculateTotalVotes(): number {
    return this.store.getState().fights.reduce((total, fight) => {
      return total + fight.characters[0].votes + fight.characters[1].votes;
    }, 0);
  }

  render() {
    const totalVotes = this.calculateTotalVotes();
    const state = this.store.getState();
    
    this.innerHTML = `
      <div class="stats-container">
        <h2>Estadísticas Globales</h2>
        <p>Total de votos: ${totalVotes}</p>
        <div class="fights-stats">
          ${state.fights.map(fight => `
            <div class="fight-stats">
              <h3>${fight.title}</h3>
              <p>${fight.characters[0].name}: ${fight.characters[0].votes} votos</p>
              <p>${fight.characters[1].name}: ${fight.characters[1].votes} votos</p>
            </div>
          `).join('')}
        </div>
        <button class="reset-btn">Reiniciar Votos</button>
      </div>
    `;

    this.querySelector('.reset-btn')?.addEventListener('click', () => {
      this.store.dispatch({ type: 'RESET' });
    });
  }
}

customElements.define('voting-stats', VotingStats);