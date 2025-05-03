import { Action } from './actions';

export class Dispatcher {
  private callbacks: Array<(action: Action) => void> = [];

  /**
   * Registra un callback para recibir acciones
   */
  register(callback: (action: Action) => void): void {
    this.callbacks.push(callback);
  }

  /**
   * Despacha una acción a todos los callbacks registrados
   */
  dispatch(action: Action): void {
    console.log('Dispatching action:', action);
    this.callbacks.forEach(callback => {
      try {
        callback(action);
      } catch (error) {
        console.error('Error en callback del dispatcher:', error);
      }
    });
  }

  /**
   * Elimina todos los callbacks registrados
   */
  clear(): void {
    this.callbacks = [];
  }
}

// Instancia única del dispatcher
export const dispatcher = new Dispatcher();