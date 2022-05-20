import { Component } from './component.js';

/***
 * PROPS_ATTR_TABLE
 * Tabela com a relação entre propriedades -> atributos genericos.
 */

 const PROPS_ATTR_TABLE = {
  className: 'className',
  style: 'style',
};

/***
 * PROPS_ATTR_TABLE_TAGS
 * Tabela com a relação entre propriedades -> atributos para elementos especificos.
 */

const PROPS_ATTR_TABLE_TAGS = {
  input: {
    type: 'type',
    placeholder: 'placeholder',
    value: 'value',
  },
  button: {
    type: 'type',
  },
  a: {
    href: 'href',
  },
  img: {
    src: 'src',
    alt: 'alt',
  }
};

/***
 * Funções auxiliares.
 */

const isPrimitive = (elem) => typeof elem === 'string' || typeof elem === 'number';
const isVirtualElement = (elem) => typeof elem === 'object' && elem instanceof VirtualElement;
const isArray = (elem) => typeof elem === 'object' && elem instanceof Array;
const isVirtualElementMap = (elem) => typeof elem === 'object' && elem instanceof VirtualElementMap;
const isComponent = (elem) => typeof elem === 'object' && elem instanceof Component;

const hasValue = (val) => {
  if (typeof val === 'undefined' || typeof val === null) {
    return false;
  }
  return true;
};

/***
 * updateObject
 * Atualiza os valores de um objeto recursivamente.
 */

const updateObject = (objDst, objSrc) => {
  Object.keys(objSrc).forEach((vkey) => {
    const value = objSrc[vkey];

    if (typeof value === 'string' || typeof value === 'number') {
      objDst[vkey] = value;
      return;
    }

    if (typeof value === 'object' && value instanceof Array) {
      objDst[vkey] = [ ...value ];
      return;
    }

    if (typeof value === 'object') {
      updateObject(objDst[vkey], value);
    }
  });
};

/***
 * setupAttrWithProp
 * Atualiza os atributos do elemento do DOM com base
 * nos valores passados ao props.
 */

const setupAttrWithProp = (elem, props, pkey, ekey) => {
  if (hasValue(props[pkey])) {
    const value = props[pkey];

    if (typeof value === 'string' || typeof value === 'number') {
      elem[ekey] = value;
      return;
    }

    if (typeof value === 'object' && value instanceof Array) {
      elem[ekey] = [ ...value ];
      return;
    }

    if (typeof value === 'object') {
      updateObject(elem[ekey], value);
    }
  }
};

/***
 * compareValues
 * Compara dois valores.
 */

const compareValues = (val1, val2) => {
  if (val1 || val2) {
    if (typeof val1 !== typeof val2)
    {
      return false;
    }
    if (isPrimitive(val1) && val1 !== val2)
    {
      return false;
    }
    if (isArray(val1) && isArray(val2))
    {
      if (val1.length !== val2.length)
      {
        return false;
      }
      for (let i = 0; i < val1.length; i++)
      {
        if (!compareValues(val1[i], val2[i]))
        {
          return false;
        }
      }
      return true;
    }
    if (typeof val1 === 'object')
    {
      let result = true;
      Object.keys(val1).forEach((key) => {
        if (!result) {
          return;
        }
        if (!compareValues(val1[key], val2[key])) {
          result = false;
          return;
        }
      });
      return result;
    }
  }
  return val1 === val2;
}

/***
 * VirtualElement
 * Classe responsavel por controlar o estado de um elemento do DOM.
 */

export class VirtualElement {
  constructor(tag, props, children) {
    this.__tag = tag;
    this.__props = props;
    this.__children = children;
    this.__events = {};
    this.__element = undefined;
  }
}

/***
 * VirtualElementMap
 * Classe responsavel por controlar o estado de um elemento do DOM.
 */

 export class VirtualElementMap {
  constructor(tag, props, children, template) {
    this.__tag = tag;
    this.__props = props;
    this.__children = children;
    this.__template = template;
    this.__events = {};
    this.__element = undefined;
    this.__entries = [];
  }
}

/***
 * updateElementProps
 */

function updateElementProps(velem, elem, props)
{
  if (velem && elem && props)
  {
    Object.keys(props).forEach((propKey) => {

      // Atribui todos os eventos do elemento virtual ao elemento do DOM.
      if (propKey === 'events' && typeof props[propKey] === 'object')
      {
        const eventTable = props[propKey];

        // Verifica se o elemento possui eventos cadastrados.
        if (velem.__events)
        {
          Object.keys(velem.__events).forEach((eventKey) => {
            elem.removeEventListener(eventKey, velem.__events[eventKey]);
          });

          // Limpa o registro de eventos.
          elem.__events = {};
        }

        // Cadastra os eventos.
        Object.keys(eventTable).forEach((eventKey) => {
          if (eventTable[eventKey] && typeof eventTable[eventKey] === 'function') {
            velem.__events[eventKey] = (evt) => { eventTable[eventKey](evt) };
            elem.addEventListener(eventKey, velem.__events[eventKey]);
          }
        });
        return;
      }

      // Atribui o objeto data do elemento virtual ao dataset do elemento do DOM.
      if (propKey === 'data' && typeof props[propKey] === 'object')
      {
        const dataTable = props[propKey];
        Object.keys(dataTable).forEach((dataKey) => {
          if (
            typeof dataTable[dataKey] === 'string' ||
            typeof dataTable[dataKey] === 'number'
          ) {
            elem.dataset[dataKey] = dataTable[dataKey];
          }
        });
        return;
      }

      // Processa props especificas a um tipo de elemento.
      if (PROPS_ATTR_TABLE_TAGS[velem.__tag])
      {
        if (PROPS_ATTR_TABLE_TAGS[velem.__tag][propKey]) {
          setupAttrWithProp(elem, props, propKey, PROPS_ATTR_TABLE_TAGS[velem.__tag][propKey]);
          return;
        }
      }

      // Processa props generica, relacionados a todos os elementos.
      if (PROPS_ATTR_TABLE[propKey])
      {
        setupAttrWithProp(elem, props, propKey, PROPS_ATTR_TABLE[propKey]);
        return;
      }
    });
  }
  return props;
}

/***
 * renderElementTree
 * Parametros
 * elem:    VirtualElement
 *          VirtualElementMap
 *          Component
 * newElem: VirtualElement
 *          VirtualElementMap
 *          Component
 * 
 */

export function renderElementTree(elem, newElem)
{
  // Renderiza o elemento.
  if (
    (
       elem && elem instanceof VirtualElement ||
       elem && elem instanceof VirtualElementMap ||
       elem && elem instanceof Component
    ) && !newElem
  ) {
    // Processa: VirtualElement
    if (isVirtualElement(elem))
    {
      if (!elem.__element)
      {
        elem.__element = document.createElement(elem.__tag);
      }

      // Atualiza atritutos.
      if (elem.__props)
      {
        updateElementProps(elem, elem.__element, elem.__props);
      }

      // Renderiza o elemento se o filho for string ou number.
      if (isPrimitive(elem.__children))
      {
        elem.__element.innerText = elem.__children;
        return elem.__element;
      }

      // Renderiza o elemento se o filho for outro elemento virtual.
      if (isVirtualElement(elem.__children))
      {
        elem.__element.replaceChildren(renderElementTree(elem.__children));
        return elem.__element;
      }

      // Renderiza o elemento se o filho for uma array de elementos virtuais.
      if (isArray(elem.__children))
      {
        const childrenElements = elem.__children.map(
          (child) => renderElementTree(child)
        );

        elem.__element.replaceChildren(...childrenElements);
        return elem.__element;
      }

      // Renderiza o elemento se o filho for um componente.
      if (isComponent(elem.__children))
      {
        elem.__element.replaceChildren(renderElementTree(elem.__children));
        return elem.__element;
      }

      // Renderiza o elemento se o filho for um map.
      if (isVirtualElementMap(elem.__children))
      {
        elem.__element.replaceChildren(renderElementTree(elem.__children));
        return elem.__element;
      }
      return elem.__element;
    }

    // Processa: VirtualElementMap
    if (isVirtualElementMap(elem))
    {
      let index = 0, isFirst = true;

      if (!elem.__element)
      {
        elem.__element = document.createElement(elem.__tag);
      }

      // Atualiza atritutos.
      if (elem.__props)
      {
        updateElementProps(elem, elem.__element, elem.__props);
      }

      // Valida children.
      if (elem.__children instanceof Array === false)
      {
        throw new Error("VirtualElementMap: 'children' must be 'array'");
      }

      // Valida template
      if (typeof elem.__template !== 'function')
      {
        throw new Error("VirtualElementMap: 'template' must be 'function'");
      }

      // Gera a arvore de filho com base no template.
      elem.__children.forEach((child) => {
        const renderizedChild = elem.__template(child, index, isFirst);

        // Atualiza o flag que indica ser o primeiro filho.
        index += 1;
        isFirst = false;

        // Valida elemento gerado pelo template.
        if (
          renderizedChild instanceof VirtualElement === false &&
          renderizedChild instanceof Component === false
        ) {
          // Valida elemento gerado pelo template.
          throw new Error("VirtualElementMap: 'template' must return 'VirtualElement' or 'Component'");
        }

        // Valida se o elemento gerado pelo template possui key
        if (renderizedChild.__props['key'] === undefined) {
          throw new Error("VirtualElementMap: 'children' must 'key' props");
        }

        // Verifica se a chave existe.
        if (
          elem.__entries.find(
            (entry) => entry.key === renderizedChild.__props['key']
          )
        ) {
          throw new Error("VirtualElementMap: 'children' must have unique 'key' props");
        }

        // Adiciona entrada.
        elem.__entries.push({
          key: renderizedChild.__props['key'],
          value: renderElementTree(renderizedChild),
        });

        return;
      });

      // Adiciona os elementos ao DOM.
      elem.__element.replaceChildren(...elem.__entries.map((entry) => entry.value));
      return elem.__element;
    }

    // Processa: Component.
    if (isComponent(elem))
    {
      elem.__children = elem.render();

      // Valida elemento gerado pelo template.
      if (
        elem.__children instanceof VirtualElement === false &&
        elem.__children instanceof Component === false
      ) {
        throw new Error("Component: 'render' must return 'VirtualElement' or 'Component'");
      }

      elem.__element = renderElementTree(elem.__children);
      return elem.__element;
    }
  }

  // Atualiza o elemento.
  if (
    (
      elem && elem instanceof VirtualElement &&
      newElem && newElem instanceof VirtualElement
    ) || (
      elem && elem instanceof VirtualElementMap &&
      newElem && newElem instanceof VirtualElementMap
    ) || (
      elem && elem instanceof Component &&
      newElem && newElem instanceof Component
    )
  ) {
    // Processa: VirtualElement.
    if (isVirtualElement(elem))
    {
      if (!elem.__element)
      {
        throw new Error("renderElementTree: to be updated element must be in DOM");
      }

      // Verifica se houve alguma mudança nos props.
      if (!compareValues(elem.__props, newElem.__props))
      {
        elem.__props = updateElementProps(elem, elem.__element, newElem.__props);
      }

      // Se o filho e primitivo verifica se houve alguma mudança.
      if (isPrimitive(elem.__children) && elem.__children !== newElem.__children)
      {
        elem.__element.innerText = newElem.__children;
        return null;
      }

      // Se o filho e um elemento virtual atualiza o elemento filho.
      if (isVirtualElement(elem.__children))
      {
        if (!compareValues(elem.__children, newElem.__children))
        {
          elem.__children = newElem.__children;
          elem.__element.replaceChildren(renderElementTree(elem.__children));
        }
        else
        {
          renderElementTree(elem.__children, newElem.__children);
        }
        return null;
      }

      // Se o filho e um elemento virtual atualiza o elemento filho.
      if (isArray(elem.__children))
      {
        if (elem.__children.length === newElem.__children.length)
        {
          if (!compareValues(elem.__children, newElem.__children))
          {
            elem.__children = newElem.__children;
            elem.__element.replaceChildren(...elem.__children.map((child) => renderElementTree(child)));
          }
          else
          {
            for (let i = 0; i < elem.__children.length; i++)
            {
              renderElementTree(elem.__children[i], newElem.__children[i]);
            }
          }
          return null;
        }
        else
        {
          throw new Error("VirtualElement array must have a constant size");
        }
      }

      // Atualiza o elemento se o filho for um componente.
      if (isComponent(elem.__children))
      {
        if (!compareValues(elem.__children, newElem.__children))
        {
          const parentElement = elem.__element.parentElement;
          elem.__children = newElem.__children;
          elem.__element = renderElementTree(elem.__children);
          parentElement.replaceChildren(elem.__element);
        }
        else
        {
          renderElementTree(elem.__children, newElem.__children);
        }
        return null; // elem.__element;
      }

      // Atualiza o elemento se o filho for um map.
      if (isVirtualElementMap(elem.__children))
      {
        if (!compareValues(elem.__children, newElem.__children))
        {
          elem.__children = newElem.__children;
          elem.__element.replaceChildren(renderElementTree(elem.__children));
        }
        else
        {
          renderElementTree(elem.__children, newElem.__children);
        }
        return null;
      }
    }

    // Processa: VirtualElementMap
    if (isVirtualElementMap(elem))
    {
      if (!elem.__element)
      {
        elem.__element = document.createElement(elem.__tag);
      }

      // Verifica se houve alguma mudança nos props.
      if (!compareValues(elem.__props, newElem.__props))
      {
        elem.__props = updateElementProps(elem, elem.__element, newElem.__props);
      }

      // Valida children.
      if (newElem.__children instanceof Array === false)
      {
        throw new Error("VirtualElementMap: 'children' must be 'array'");
      }

      // Valida template
      if (typeof newElem.__template !== 'function')
      {
        throw new Error("VirtualElementMap: 'template' must be 'function'");
      }

      // Verifica se ha alterações no children.
      if (!compareValues(elem.__children, newElem.__children))
      {
        let isFirst = true, index = 0;

        // Atualiza os filhos.        
        elem.__children = newElem.__children;

        // Array com os elementos já processados.
        const processedChildren = [];

        // Gera a arvore de filho com base no template.
        newElem.__children.forEach((child) => {
          const renderizedChild = newElem.__template(child, index, isFirst);

          // Atualiza parametro auxiliares.
          isFirst = false;
          index++;

          // Prepara variavel com a chave do element.
          let key = renderizedChild.__props['key'];

          // Valida se o elemento gerado pelo template possui key
          if (key === undefined) {
            throw new Error("VirtualElementMap: 'template' must 'key' props");
          }

          // Valida se a chave esta duplicada.
          if (
            processedChildren.find(
              (entry) => entry.key === key
            )
          ) {
            throw new Error("VirtualElementMap: 'children' must have unique 'key' props");
          }

          // Busca o elemento nas chaves processadas.
          for (let i = 0; i < elem.__entries.length; i++)
          {
            if (elem.__entries[i].key === key)
            {
              renderElementTree(elem.__entries[i].value, renderizedChild);
              processedChildren.push(elem.__entries[i]);
              elem.__entries.splice(i, 1);
              return;
            }
          }

          // Processa: VirtualElement
          if (renderizedChild instanceof VirtualElement)
          {
            renderElementTree(renderizedChild);

            // Adiciona entrada.
            processedChildren.push({
              key: key,
              value: renderizedChild,
            });

            return;
          }

          // Processa: Component
          if (renderizedChild instanceof Component)
          {
            // Rendeiza componente.
            renderizedChild.__children = renderizedChild.render();
            renderElementTree(renderizedChild.__children);

            // Adiciona entrada.
            processedChildren.push({
              key: key,
              value: renderizedChild.__children,
            });

            return;
          }

          // Valida elemento gerado pelo template.
          throw new Error("VirtualElementMap: 'template' must return 'VirtualElement' or 'Component'");
        });

        // TODO: Varrer as subarvores dos elementos descartados e 
        // remover todos os listener.

        // Atualiza as entradas
        elem.__entries = processedChildren;
        elem.__element.replaceChildren(...elem.__entries.map((entry) => entry.value));
      }
      return null;
    }

    // Processa: Component.
    if (isComponent(elem))
    {
      if (!compareValues(elem.__children, newElem.__children))
      {
        // Atualiza props.
        elem.props = newElem.props;

        // Gera nova arvore e comuta alterações.
        const parentElement = elem.__element.parentElement;
        elem.__children = newElem.__children;
        elem.__element = renderElementTree(elem.__children);
        parentElement.replaceChildren(elem.__element);
        return null;
      }

      // Verifica se houve alguma mudança nos props.
      if (!compareValues(elem.props, newElem.props))
      {
        // Atualiza props.
        elem.props = newElem.props;

        // Gera nova arvore e comuta alterações.
        renderElementTree(elem.__children, newElem.__children);
        return null;
      }
    }
  }
  return null;
}