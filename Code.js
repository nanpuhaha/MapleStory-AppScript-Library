const API_KEY = "test_2576f2eb517a016207dd0912dedaaf432c4cfb97f05cba7368252c84d5375a48d50779cf600e2241e446e6ebccd54eea";

function fetch(urlPath, queryParams) {
  let url = `${BASE_URL}${urlPath}`;

  if (queryParams) {
    let queryString = Object.keys(queryParams)
      .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    url += `?${queryString}`;
  }

  let options = {
    'method': 'get',
    'headers': {
      'accept': 'application/json',
      'x-nxopen-api-key': API_KEY
    }
  };

  let response = UrlFetchApp.fetch(url, options);
  let textResult = response.getContentText();
  Logger.log(textResult);

  let result = JSON.parse(textResult);
  Logger.log(result);

  return result;
}









