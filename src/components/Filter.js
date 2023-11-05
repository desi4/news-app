import Constant from "../helpers/constant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

export default function Filter(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [focus, setFocus] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(0);
    const [searchBegin, setSearchBegin] = useState(false);

    const emptyFilter = () => {
        setSearchQuery('');
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearchBegin(true);
            props.search(searchBegin);
        }, 1000);

        setTypingTimeout(timeoutId);
        props.q(searchQuery);
    }, [searchQuery]);

    const handleSearchClick = (val) => {
        setSearchQuery(val);
        clearTimeout(typingTimeout);
    };

    return (
        <div>
            <input
                style={focus ? styles.inputFocus : styles.input}
                placeholder={searchQuery === '' ? 'Search News' : ''}
                type={"text"}
                value={searchQuery}
                onChange={(e) => {
                    handleSearchClick(e.target.value)
                }}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <FontAwesomeIcon
                icon={focus ? faTimes : faSearch}
                className="search-icon"
                style={styles.icon}
                onClick={emptyFilter}
            />
        </div>
    )
}

const styles = {
    input: {
        height: window.innerHeight / 30,
        width: 330,
        color: 'gray',
        fontSize: 14,
        backgroundColor: Constant.color.inputColor,
        border: 'none',
        borderRadius: 5,
        marginTop: 15,
        marginLeft: -10,
        marginBottom: 15,
        padding: 10,
    },
    inputFocus: {
        height: window.innerHeight / 30,
        width: 330,
        color: 'black',
        fontSize: 14,
        backgroundColor: Constant.color.inputColorFocus,
        border: 'none',
        borderRadius: 5,
        marginTop: 15,
        marginLeft: -10,
        marginBottom: 15,
        padding: 10,
    },
    icon: {
        marginLeft: -30,
        paddingTop: 15,
        color: 'gray',
        fontSize: 18,
    },
    greeting: {
        color: 'black',
        fontSize: 14,
    }
}