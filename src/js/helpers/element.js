/***
 * isValid
 * Verifica se obj e valido.
 */

function isValid(obj) {
  return obj !== undefined && obj !== null;
}

/***
 * createElement
 * Função auxiliar para criar templates e elementos.
 * Parametros:
 *    tag
 *        Tipo: String
 *        Desc: Indica o tipo de tag a ser criado.
 *        Exem: createElement('p') => <p></p>
 *    className
 *        Tipo: String
 *        Desc: Representa a class da tag.
 *    options
 *        Tipo: Object
 *        Desc: Representa parametros opcionais a serem passados ao elemento.
 *              events: Passa eventos ao elemento.
 *    content:
 *        Tipo: any | object:HTMLElement | array:HTMLElement
 *        Desc: Representa o conteudo do elemento.
 * Exemplos de uso:
 *    createElement('p', null, null, 'helloWorld') => <p>helloWorld</p>
 *    createElement('p', 'container') => <p class="container"></p>
 *    createElement('p', 'container', { events: { click: () => {} } }) => <p class="container" onclick="() => {}"></p>
 *    createElement('p', 'container', { events: { click: () => {} } }, 'helloWorld') => <p class="container" onclick="() => {}">helloWorld</p>
 */

export function createElement(tag, className, options, content) {
  const element = document.createElement(tag);

  // Atribui classe ao elemento.
  if (isValid(className)) {
    element.className = className;
  }

  // Processa os parametros opcionais.
  if (isValid(options)) {
    // Processa eventos.
    if (isValid(options.events)) {
      Object.keys(options.events).forEach((key) => {
        element.addEventListener(key, options.events[key]);
      });
    }
  }

  // Processa conteudo do elemento.
  if (isValid(content)) {
    // Processa conteudo primitivo.
    if (typeof content === "string" || typeof content === "number") {
      element.innerText = content;
    } else {
      // Processa elemento unico.
      if (content instanceof HTMLElement) {
        element.appendChild(content);
      } else if (content instanceof Array) {
        // Processa elementos multiplos.
        content.forEach((childElement) => {
          if (childElement instanceof HTMLElement) {
            element.appendChild(childElement);
          }
        });
      }
    }
  }
  return element;
}
