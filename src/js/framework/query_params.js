/***
 * processWindowSearch
 * Função responsavel por processar os parametros de busca na URL da pagina.
 */

export function processWindowSearch() {
  const normalized_search = window.location.search.substring(1, window.location.search.length);
  const search_array = normalized_search.split('&');
  const processed_search = {};
  search_array.forEach((value) => {
    let item = value.split('=');
    processed_search[item[0]] = item[1];
  });
  return processed_search;
}