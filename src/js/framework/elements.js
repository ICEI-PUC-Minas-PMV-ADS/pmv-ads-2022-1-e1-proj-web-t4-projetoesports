import { currentController } from './controller.js';
import { VirtualElement, VirtualElementMap } from './template.js';

/***
 * STD Elementos HTML
 */

// Elemento customizado para renderizar components.
export const component    = (_component, ...args) => {
  if (typeof _component === 'function')
  {
    const obj = new _component(...args);
    obj.onInitialize?.();
    return obj;
  }
  else if (typeof _component === 'string')
  {
    if (currentController.__components[_component])
    {
      const obj = new new currentController.__components[_component](...args);
      obj.onInitialize?.();
      return obj;
    }
  }
  throw new Error('Unexpected component');
}

export const mapTo        = (tag, props, children, template) => new VirtualElementMap(tag, props, children, template);

// Separação de conteúdo.
export const address      = (props, children) => new VirtualElement('address',      props, children);
export const article      = (props, children) => new VirtualElement('article',      props, children);
export const aside        = (props, children) => new VirtualElement('aside',        props, children);
export const footer       = (props, children) => new VirtualElement('footer',       props, children);
export const header       = (props, children) => new VirtualElement('header',       props, children);
export const h1           = (props, children) => new VirtualElement('h1',           props, children);
export const h2           = (props, children) => new VirtualElement('h2',           props, children);
export const h3           = (props, children) => new VirtualElement('h3',           props, children);
export const h4           = (props, children) => new VirtualElement('h4',           props, children);
export const h5           = (props, children) => new VirtualElement('h5',           props, children);
export const h6           = (props, children) => new VirtualElement('h6',           props, children);
export const main         = (props, children) => new VirtualElement('main',         props, children);
export const nav          = (props, children) => new VirtualElement('nav',          props, children);
export const section      = (props, children) => new VirtualElement('section',      props, children);

// Conteúdo textual
export const blockquote   = (props, children) => new VirtualElement('blockquote',   props, children);
export const dd           = (props, children) => new VirtualElement('dd',           props, children);
export const div          = (props, children) => new VirtualElement('div',          props, children);
export const dl           = (props, children) => new VirtualElement('dl',           props, children);
export const dt           = (props, children) => new VirtualElement('dt',           props, children);
export const figcaption   = (props, children) => new VirtualElement('figcaption',   props, children);
export const figure       = (props, children) => new VirtualElement('figure',       props, children);
export const hr           = (props, children) => new VirtualElement('hr',           props, children);
export const li           = (props, children) => new VirtualElement('li',           props, children);
export const menu         = (props, children) => new VirtualElement('menu',         props, children);
export const ol           = (props, children) => new VirtualElement('ol',           props, children);
export const p            = (props, children) => new VirtualElement('p',            props, children);
export const pre          = (props, children) => new VirtualElement('pre',          props, children);
export const ul           = (props, children) => new VirtualElement('ul',           props, children);

// Semânticas textuais inline.
export const a            = (props, children) => new VirtualElement('a',            props, children);
export const abbr         = (props, children) => new VirtualElement('abbr',         props, children);
export const b            = (props, children) => new VirtualElement('b',            props, children);
export const dbi          = (props, children) => new VirtualElement('dbi',          props, children);
export const bdo          = (props, children) => new VirtualElement('bdo',          props, children);
export const br           = (props, children) => new VirtualElement('br',           props, children);
export const cite         = (props, children) => new VirtualElement('cite',         props, children);
export const code         = (props, children) => new VirtualElement('code',         props, children);
export const data         = (props, children) => new VirtualElement('data',         props, children);
export const dfn          = (props, children) => new VirtualElement('dfn',          props, children);
export const em           = (props, children) => new VirtualElement('em',           props, children);
export const i            = (props, children) => new VirtualElement('i',            props, children);
export const kbd          = (props, children) => new VirtualElement('kbd',          props, children);
export const mark         = (props, children) => new VirtualElement('mark',         props, children);
export const q            = (props, children) => new VirtualElement('q',            props, children);
export const rp           = (props, children) => new VirtualElement('rp',           props, children);
export const rt           = (props, children) => new VirtualElement('rt',           props, children);
export const small        = (props, children) => new VirtualElement('small',        props, children);
export const span         = (props, children) => new VirtualElement('span',         props, children);
export const strong       = (props, children) => new VirtualElement('strong',       props, children);
export const sub          = (props, children) => new VirtualElement('sub',          props, children);
export const sup          = (props, children) => new VirtualElement('sup',          props, children);
export const time         = (props, children) => new VirtualElement('time',         props, children);
export const u            = (props, children) => new VirtualElement('u',            props, children);

// Imagem e multimídia.
export const area         = (props, children) => new VirtualElement('area',         props, children);
export const audio        = (props, children) => new VirtualElement('audio',        props, children);
export const img          = (props, children) => new VirtualElement('img',          props, children);
export const map          = (props, children) => new VirtualElement('map',          props, children);
export const track        = (props, children) => new VirtualElement('track',        props, children);
export const video        = (props, children) => new VirtualElement('video',        props, children);

// Conteúdo tabulado.
export const caption      = (props, children) => new VirtualElement('caption',      props, children);
export const col          = (props, children) => new VirtualElement('col',          props, children);
export const colgroup     = (props, children) => new VirtualElement('colgroup',     props, children);
export const table        = (props, children) => new VirtualElement('table',        props, children);
export const tbody        = (props, children) => new VirtualElement('tbody',        props, children);
export const td           = (props, children) => new VirtualElement('td',           props, children);
export const tfoot        = (props, children) => new VirtualElement('tfoot',        props, children);
export const th           = (props, children) => new VirtualElement('th',           props, children);
export const thead        = (props, children) => new VirtualElement('thead',        props, children);
export const tr           = (props, children) => new VirtualElement('tr',           props, children);

// Formulários.
export const button       = (props, children) => new VirtualElement('button',       props, children);
export const datalist     = (props, children) => new VirtualElement('datalist',     props, children);
export const fieldset     = (props, children) => new VirtualElement('fieldset',     props, children);
export const form         = (props, children) => new VirtualElement('form',         props, children);
export const input        = (props, children) => new VirtualElement('input',        props, children);
export const label        = (props, children) => new VirtualElement('label',        props, children);
export const legend       = (props, children) => new VirtualElement('legend',       props, children);
export const meter        = (props, children) => new VirtualElement('meter',        props, children);
export const optgrout     = (props, children) => new VirtualElement('optgrout',     props, children);
export const option       = (props, children) => new VirtualElement('option',       props, children);
export const output       = (props, children) => new VirtualElement('output',       props, children);
export const progress     = (props, children) => new VirtualElement('progress',     props, children);
export const select       = (props, children) => new VirtualElement('select',       props, children);
export const textarea     = (props, children) => new VirtualElement('textarea',     props, children);

// Elementos interativos
export const details      = (props, children) => new VirtualElement('details',      props, children);
export const dialog       = (props, children) => new VirtualElement('dialog',       props, children);
export const summary      = (props, children) => new VirtualElement('summary',      props, children);