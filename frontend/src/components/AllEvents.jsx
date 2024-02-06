import React, { useEffect, useState } from "react";
import css from '../style/Events.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import {MagnifyingGlass} from "@phosphor-icons/react";

const AllEvents = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterText, setFilterText] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const url = id ? `http://localhost:8000/api/home/allevents/${id}` : 'http://localhost:8000/api/home/allevents';
        axios
            .get(url)
            .then(function (response) {
                const events = response.data;
                axios
                    .get(`http://localhost:8000/api/event/tickets?ids=${events.map(event => event.id).join(',')}`)
                    .then(response => {
                        const ticketPrices = response.data;
                        let updatedEvents = events.map(event => {
                            event.ticket_price = ticketPrices[event.id];
                            return event;
                        });

                        // sort events
                        updatedEvents.sort((a, b) => {
                            if (sortOrder === 'asc') {
                                return a.date.localeCompare(b.date);
                            } else {
                                return b.date.localeCompare(a.date);
                            }
                        });

                        // filter events
                        let filteredEvents = updatedEvents.filter(event =>
                            event.event.toLowerCase().includes(filterText.toLowerCase()) &&
                            (!selectedCategory || event.categories_id.toString() === selectedCategory)
                        );

                        setAllEvents(filteredEvents);
                    })
                    .catch(error => {
                        console.error("Error fetching ticket prices: ", error);
                    });

                // Fetch categories
                axios
                    .get('http://localhost:8000/api/categories')
                    .then(response => {
                        setCategories(response.data);
                    })
                    .catch(error => {
                        console.error("Error fetching categories: ", error);
                    });
            })
            .catch(function (error) {
                console.error("Error fetching events: ", error);
            });
    }, [sortOrder, filterText, selectedCategory]);

    return (
        <>
            <h1 className={css.h1}>Upcoming Events:</h1>
            <div className={css.filterBox}>
                <div className={css.categoryBox}>
                    <div className={css.labelBox}>
                        <label className={css.label}>Sort by date: </label>
                    </div>
                    <select className={css.selectFilter} value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Descending</option>
                    </select>
                </div>
                <div className={css.categoryBox}>
                    <div className={css.labelBox}>
                        <label className={css.label}>Filter by category: </label>
                    </div>
                    <select className={css.selectFilter} value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}>
                        <option value=''>All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={css.searchBox}>
                <div className={css.searchLabelBox}>
                    <label className={css.label}>Search by title: </label>
                </div>
                <div className={css.searchInput}>
                    <MagnifyingGlass className={css.icon} size={32}/>
                    <input
                        placeholder='e. g. Positivus Festival'
                        className={css.searchInputReal}
                        type='text'
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                    />
                </div>
            </div>
            <div className={css.eventsContainer}>
                {allEvents.map((event, index) => (
                    <Link key={index} className={css.singleEventLink} to={`/event/${event.id}`}>
                        <div className={css.singleEvent}>
                            <img
                                className={css.singleEventImage}
                                src={event.img_url}
                            />
                            <h3 className={css.singleEventTitle}>{event.event}</h3>
                            <div className={css.info}>
                                <p className={css.price}>Ticket
                                    Price: {event.ticket_price ? event.ticket_price : 'Loading...'} EUR</p>
                                <p className={css.date}>Date: {event.date}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default AllEvents;
