import './App.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey, urlNews } from "./config/setting";
import Card from "./components/Card";
import Filter from "./components/Filter";

function App() {
    const [ data, setData ] = useState([]);
    const [ query, setQuery ] = useState('');
    const [ begin, setBegin ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(urlNews + 'search/v2/articlesearch.json' +
                '?q=' + query + '&page=1&sort=newest&api-key=' + apiKey
            )
            .then(result => {
                setData(result.data.response.docs);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    const fetchNews = async query => {
        if (begin) {
            setIsLoading(true);
            axios
                .get(urlNews + 'search/v2/articlesearch.json' +
                    '?q=' + query + '&page=1&sort=newest&api-key=' + apiKey
                )
                .then(result => {
                    setData(result.data.response.docs);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setIsLoading(false);
                });
        }
    }

    useEffect(() => {
        fetchNews(query);
    }, [ begin ]);

    function setFilter(keyword) {
        if (query !== '') {
            setQuery(keyword);
        } else {
            setQuery('new+york+times');
        }
    }

    function setSearch(status) {
        if (status) {
            setBegin(status);
        }
    }

    return (
        <section>
            <h2>News App</h2>
            <div className="Header">
                <Filter q={setFilter} search={setSearch}/>
            </div>
            <div className="Main">
                {isLoading
                    ? <p>Load articles...</p>
                    : (
                        <Card data={data}/>
                    )}
            </div>
        </section>
    );
}

export default App;
