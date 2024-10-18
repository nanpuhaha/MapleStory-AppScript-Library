const API_KEY = "test_2576f2eb517a016207dd0912dedaaf432c4cfb97f05cba7368252c84d5375a48d50779cf600e2241e446e6ebccd54eea";
const BASE_URL = 'https://open.api.nexon.com/maplestory/v1';

interface FetchOptions {
  method: string;
  headers: {
    'accept': string;
    'x-nxopen-api-key': string;
  };
  muteHttpExceptions?: boolean;
}

interface QueryParams {
  [key: string]: string | number | boolean;
}

function fetch(urlPath: string, queryParams?: QueryParams): any {
  let url = `${BASE_URL}${urlPath}`;

  if (queryParams) {
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&');
    url += `?${queryString}`;
  }

  const options: FetchOptions = {
    'method': 'get',
    'headers': {
      'accept': 'application/json',
      'x-nxopen-api-key': API_KEY
    },
    'muteHttpExceptions': true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();

  if (responseCode !== 200) {
    console.error(`Error: ${responseCode}`);
    return null;
  }

  const textResult = response.getContentText();
  console.log(textResult);

  return JSON.parse(textResult);
}
