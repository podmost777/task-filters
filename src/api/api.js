import queryString from "query-string";
export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "d075fa9aa20884b2664914f5d34b74d3";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDc1ZmE5YWEyMDg4NGIyNjY0OTE0ZjVkMzRiNzRkMyIsInN1YiI6IjVlMjVkYzllNTI5NGU3MDAxODYzNWVkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ExBtWhjmBzX8Ys5uHCQUfMkVXg9SBAgtUtwXu9ZoPz8";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((response) => {
        response.json().then((error) => {
          reject(error);
        });
      });
  });
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;

    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };

    //url = "/discover/movie"
    //params = {
    //  language: "ru_RU",
    //  sort_by: sort_by,
    //  page: page,
    //  primary_release_year: year
    //}

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params,
    };
    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  }
}
