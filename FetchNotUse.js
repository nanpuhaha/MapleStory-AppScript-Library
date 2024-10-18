/**
 * UrlFetchApp is run by retrying when an error occurs.
 * https://tanaikech.github.io/2022/09/23/retrying-urlfetchapp-by-an-error-using-google-apps-script-retryfetch/
 */
class RetryFetch {
  /**
   * @param {string} url URL
   * @param {object} params Object
   * @param {number} numberOfRetr Number of retry when an error occurs with the HTTP request.
   * @param {number} waitTime Wait time between the HTTP request.
   * @return {UrlFetchApp.HTTPResponse}
   */
  constructor(url, params = {}, numberOfRetry = 2, waitTime = 3) {
    this.url = url;
    if (!params.muteHttpExceptions) {
      params.muteHttpExceptions = true;
    }
    this.params = params;
    this.numberOfRetry = numberOfRetry;
    this.waitTime = waitTime;
    this.his = [];
  }

  fetch() {
    const res = UrlFetchApp.fetch(this.url, this.params);
    const statusCode = res.getResponseCode();
    this.his.push({ date: new Date(), params: this.params, statusCode });
    if (statusCode != 200 && this.numberOfRetry > 0) {
      console.log(`Status code: ${statusCode}, Retry: ${this.numberOfRetry}`);
      const idx = this.his.length - 1;
      this.his[idx].responseHeader = res.getAllHeaders();
      this.his[idx].error = res.getContentText();
      this.numberOfRetry--;
      Utilities.sleep(this.waitTime * 1000);
      this.fetch();
    } else if (this.numberOfRetry == 0) {
      return null;
    }
    return res;
  }

  /**
   * Return history of fetch requesting in this Class.
   * @return {array} History.
   */
  get history() {
    return this.his;
  }
}


function fetchUrl(url) {
  // Utilities.sleep(500); // 500 ms

  // let r = UrlFetchApp.fetch(url);
  let rf = new RetryFetch(url);
  let r = rf.fetch();

  let html = r.getContentText();
  let $ = Cheerio.load(html);
  return $;
}



/*
function fetch(urlPath, queryParams) {
  const BASE_URL = 'https://open.api.nexon.com/maplestory/v1';
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

  let rf = new RetryFetch(url, options);
  let response = rf.fetch();

  if (response === null) {
    throw new Error('Failed to fetch after multiple retries');
  }

  let textResult = response.getContentText();
  Logger.log(textResult);

  let result = JSON.parse(textResult);
  Logger.log(result);

  return result;
}
*/

