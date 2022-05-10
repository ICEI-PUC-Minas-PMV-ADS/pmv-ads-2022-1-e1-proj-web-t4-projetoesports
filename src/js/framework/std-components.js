import { Component } from './component.js';
import { VirtualElement } from './template.js';

/***
 * If
 * Este componente avalia a condição e se verdadeiro exibe o elemA
 * se false exibe elemB.
 */

export class If extends Component {
  constructor(cond, elemA, elemB) {
    super();
    this.__renderElement = cond ? elemA : elemB;
  }

  render() {
    return this.__renderElement;
  }
}

/***
 * Switch
 * Este componente renderiza um elemento baseado no valor de entrada
 */

 export class Switch extends Component {
  constructor(value, options, fallbackOption) {
    super();
    if (options[value] !== undefined && options[value] !== null) {
      this.__renderElement = options[value];
    } else {
      if (fallbackOption !== undefined && fallbackOption !== null) {
        this.__renderElement = fallbackOption;
      } else {
        throw new Error("Swith must be fallback option");
      }
    }
  }

  render() {
    return this.__renderElement;
  }
}

/***
 * Map
 * Este componente renderiza uma lista de elementos
 */

 export class Map extends Component {
  constructor(list, callback) {
    super({ list });
    
    // Valida list.
    if (list instanceof Array === false)
    {
      throw new Error("Map: 'list' must extends Array");
    }

    // Valida callback.
    if (typeof callback !== 'function')
    {
      throw new Error("Map: 'callback' must be a 'function'");
    }

    // Armazena as chaves dos elementos filhos.
    this.__entries = [];

    // Renderiza a lista de elementos.
    this.__renderElement = list.map((value) => {
      const element = callback(value);
      const key = element.__props['key'];

      // Valida o elemento renderizado.
      if (element instanceof VirtualElement === false)
      {
        throw new Error("Map: 'callback' must return 'VirtualElement'");
      }

      // Verifica se o elemento possui a prop 'key'.
      if (!key)
      {
        throw new Error("Map: Children must have 'key' prop");
      }

      // Verifica se a chave esta duplicada.
      if (this.__entries.find((item) => item.key === key))
      {
        throw new Error("Map: Children must have unique 'key' prop");
      }

      // Cria uma entrada para o elemento renderizado.
      this.__entries.push({ key, element });

      return element;
    });
  }

  render() {
    return this.__renderElement;
  }
}