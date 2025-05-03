class CharacterCard extends HTMLElement {
    static get observedAttributes() {
      return ['character-id', 'name', 'image', 'votes', 'total-votes'];
    }
  
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
  
    render() {
      const id = this.getAttribute('character-id') || '';
      const name = this.getAttribute('name') || '';
      const image = this.getAttribute('image') || '';
      const votes = parseInt(this.getAttribute('votes') || '0');
      const totalVotes = parseInt(this.getAttribute('total-votes') || '1');
      const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  
      this.innerHTML = `
        <div class="character" data-id="${id}">
          <img src="${image}" alt="${name}">
          <h3>${name}</h3>
          <div class="progress-bar">
            <div class="progress" style="width: ${percentage}%"></div>
          </div>
          <span class="percentage">${percentage}%</span>
          <button class="vote-btn">Votar</button>
        </div>
      `;
  
      const voteBtn = this.querySelector('.vote-btn');
      if (voteBtn) {
        voteBtn.addEventListener('click', () => {
          const event = new CustomEvent('vote', {
            detail: { characterId: id },
            bubbles: true,
            composed: true
          });
          this.dispatchEvent(event);
        });
      }
    }
  }
  
  customElements.define('character-card', CharacterCard);