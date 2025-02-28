import React, { useEffect, useState } from "react";
import './header.css';
import { setSearchTerm } from "../../api/redditSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const searchTerm = useSelector((state) => state.reddit.searchTerm);
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        setSearchTermLocal(e.target.value);
    };

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const onSearchTermSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal))
    };

    return (
    <header>
        <div className='header'>
        <p>RedditReader</p>
        </div>
        <form className='search' onSubmit={onSearchTermSubmit}>
            <input 
                type="text" 
                placeholder="Search"
                value={searchTermLocal}
                onChange={handleSearchChange} 
            />
            <button type="submit" onClick={onSearchTermSubmit}>
                Search
            </button>
        </form>
    </header>
    );
};

export default Header;