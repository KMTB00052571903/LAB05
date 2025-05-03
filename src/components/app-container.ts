import { Store } from '@store/store';
import './fight-pair';
import './voting-stats';

class AppContainer extends HTMLElement {
  private store: Store;

  constructor() {
    super();
    this.store = Store.getInstance();
    this.store.subscribe('state-changed', this.render.bind(this));
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header>
        <h1>Torneo de Votaciones</h1>
      </header>
      <main>
        <div class="fights-container"></div>
      </main>
      <voting-stats></voting-stats>
    `;

    const fightsContainer = this.querySelector('.fights-container');
    this.store.getState().fights.forEach(fight => {
      const fightPair = document.createElement('fight-pair');
      fightPair.setAttribute('fight-id', fight.id);
      fightsContainer?.appendChild(fightPair);
    });
  }
}

customElements.define('app-container', AppContainer);