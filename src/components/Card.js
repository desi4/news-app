import { useEffect, useState } from "react";
import moment from "moment";
import Helper from "../helpers/helper";
import Constant from "../helpers/constant";

export default function Card(props) {
    const [ news, setNews ] = useState([]);

    useEffect(() => {
        setNews(props.data);
    }, [ props.data ]);

    const openTab = url => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <div className='newsList' style={styles.newsList}>
            {news.length > 0 ? news.map((article, index) => (
                <div className='newsItem'
                     key={index}
                     style={styles.newsItem}
                     onClick={() => openTab(article.web_url)}
                     title={'Click to open this article in new tab'}
                >
                    <p style={styles.title}>
                        {article.headline.main}
                    </p>
                    <p style={styles.author}>
                        {article.byline.original}
                    </p>
                    <p style={styles.publishDate}>
                        {moment(article.pub_date).format('MMM DD, YYYY')}
                    </p>
                    <p style={styles.abstract}>
                        {Helper.cutText(article.abstract)}
                    </p>
                </div>
            )) : <p>No news found</p>}
        </div>
    )
}

const styles = {
    newsList: {
        padding: 10,
        maxHeight: 480,
        flexDirection: 'column',
        flex: 1,
        marginBottom: 5,
    },
    newsItem: {
        backgroundColor: Constant.color.card,
        height: 'auto',
        lineHeight: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 5,
        paddingBottom: 5,
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 10,
        lineHeight: 1,
    },
    author: {
        color: 'black',
        fontSize: 12,
        lineHeight: 1,
    },
    publishDate: {
        color: 'black',
        fontSize: 10,
        lineHeight: 1,
    },
    abstract: {
        color: 'black',
        fontSize: 12,
        paddingTop: 3,
        lineHeight: 1,
    }
}