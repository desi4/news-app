import axios from "axios";
import { apiKey, urlNews } from "../config/setting";

export const getNews = async param => {
    return axios
        .get(urlNews + 'search/v2/articlesearch.json' +
            '?q='+param+'&page=1&sort=oldest&api-key=' + apiKey
        )
        .then(result => result.data.response.docs)
        .catch(err => console.log(err));

};