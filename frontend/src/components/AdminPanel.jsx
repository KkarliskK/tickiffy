import React, {useEffect, useState} from "react";
import axios from "axios";
import css from '../style/Admin.module.css';
import Cookies from "js-cookie";
import {Link} from "react-router-dom";


const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('event');

    const [event, setEvent] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [eventError, setEventError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [ticket_priceError, setTicket_PriceError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [ticketError, setTicketError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [locationError, setLocationError] = useState(false);
    const [img_urlError, setImgUrlError] = useState(false);
    const [insertCategory, setInsertCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [ticket_price, setTicket_Price] = useState('');
    const [time, setTime] = useState('');
    const [ticket, setTicket] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [img_url, setImgUrl] = useState('');
    const [categoryArray, setcategoryArray] = useState([]);
    const [events, setEvents] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const categoryoptions = categoryArray.map((category) => <option key={category.id} value={category.id}>{category.category}</option>)

    const [popupEventId, setPopupEventId] = useState(null);
    const openPopup = (id) => {
        setPopupEventId(id);
    };
    const closePopup = () => {                  // this is for deleting popup
        setPopupEventId(null);
    };
    const confirmDelete = () => {
        deleteEvent(popupEventId);
        setPopupEventId(null);
    };

    const [editEventId, setEditEventId] = useState(null);
    const openEdit = (id) => {
        setEditEventId(id);
    };
    const closeEdit = () => {
        setEditEventId(null);                      //this is for editing popup
    };
    const confirmEdit = () => {
        deleteEvent(editEventId);
        setEditEventId(null);
    };

    const validateForm = () => {
        //validations
        if (event == undefined || event == "") {
            setEventError(true);
        } else {
            setEventError(false);
        }
        if (description == undefined || description == "") {
            setDescriptionError(true);
        } else {
            setDescriptionError(false);
        }
        if (category == undefined || category == "") {
            setCategoryError(true);
        } else {
            setCategoryError(false);
        }
        if (date == undefined || date == "") {
            setDateError(true);
        } else {
            setDateError(false);
        }
        if (time == undefined || time == "") {
            setTimeError(true);
        } else {
            setTimeError(false);
        }
        if (location == undefined || location == "") {
            setLocationError(true);
        } else {
            setLocationError(false);
        }
        if (ticket == undefined || ticket == "") {
            setTicketError(true);
        } else {
            setTicketError(false);
        }
        if (quantity == undefined || quantity == "") {
            setQuantityError(true);
        } else {
            setQuantityError(false);
        }
        if (img_url == undefined || img_url == "") {
            setImgUrlError(true);
        } else {
            setImgUrlError(false);
        }
        if (ticket_price == undefined || ticket_price == "") {
            setTicket_PriceError(true);
        } else {
            setTicket_PriceError(false);
        }
    };



    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

    const openTicketModal = () => {
        setIsTicketModalOpen(true);
    };

    // console.log(`Current active section: ${activeSection}`);

    useEffect(() => {
        axios
            .get(
                'http://localhost:8000/api/categories'
            )
            .then(function (response){            //this is for getting categories
                console.log(response.data);
                setcategoryArray(response.data)
            })
            .catch(function (error){
                console.error(error);
            });
    }, []);


    useEffect(() => {
        axios
            .get(
                'http://localhost:8000/api/event/showbycat/' + category
            )
            .then(function (response){           //this is for displaying events by category id for deleting
                console.log(response.data);
                setEvents(response.data.data);
            })
            .catch(function (error){
                console.error(error);
            });
    }, [category]);

    const createEventAndTicket = e => {
        e.preventDefault();
        validateForm();

        // First, create the event
        axios.post('http://localhost:8000/api/event/create/', {
                            event:event,
                            description:description,
                            category:category,
                            date:date,
                            time:time,
                            location:location,
                            img_url:img_url,
        }, {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
            .then(response => {
                // The new event's ID is returned in the response
                console.log(response);
                const eventId = response.data.event_id;

                // Now, create the ticket associated with the event
                axios.post(`http://localhost:8000/api/event/${eventId}/ticket/create/`, {
                    ticket: ticket,
                    ticket_price: ticket_price,
                    quantity: quantity,
                }, {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                })
                    .then(response => {
                        console.log('Ticket created successfully');
                        setSuccessMessage('Event and Task created Successfully!');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    };


    // const openEdit = e => {
    //     e.preventDefault();
    //     const result = axios
    //         .get(
    //             'http://localhost:8000/api/event/update/' + event.id,
    //         )
    //         .then(function (response){           //this is for displaying events by category id for deleting
    //             console.log(response.data);
    //             setEvents(response.data.data);
    //         })
    //         .catch(function (error){
    //             console.error(error);
    //         });
    // };

    const update = e => {
        e.preventDefault();
        const updateResult = axios
            .post(
                'http://localhost:8000/api/event/event/update/' + event.id,              //this is where I update data - event
                {
                    editEventValue:event,
                    editDescriptionValue:description,
                    category:category,
                    editDateValue:date,
                    editTicketPriceValue:ticket_price,
                    editImgUrlValue:img_url,
                },
                {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                }
            )
            .then(function (response){
                //when success
                console.log(response.data)
            })
            .catch(function (error){
                //else if fails
                console.error(error);
            });
    };

    const deleteEvent = (id) => {
        axios
            .delete(`http://localhost:8000/api/event/delete/${id}`)
            .then(response => {
                console.log(response.data);
                // Remove the deleted event from the events state                   //this is for deleting events
                setEvents(events.filter(event => event.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    const insertCat = e => {
        e.preventDefault();
        const resultData = axios
            .post(
                'http://localhost:8000/api/categories/create',          //this is where i can create new category
                {
                    category:insertCategory,
                },
                {
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` }
                }
            )
            .then(function (response){
                //when success
                console.log(response.data)
            })
            .catch(function (error){
                //else if fails
                console.error(error);
            });
    };

    return(
        <>
            <h1>Admin panel</h1>
            <div className={css.mainContainer}>
                <div className={css.adminPanel}>
                    <div className={css.sidebar}>
                        <button onClick={() => setActiveSection('category')} className={css.sidebarButton}>
                            Add new Category
                        </button>
                        <button onClick={() => setActiveSection('event')} className={css.sidebarButton}>
                            Add new Event
                        </button>
                        <button onClick={() => setActiveSection('delete')} className={css.sidebarButton}>
                            Delete Event
                        </button>
                    </div>
                    {activeSection === 'category' && (
                        <div className={css.adminAddCategory}>
                            <h2 className={css.h2}>Add new category</h2>
                            <form onSubmit={insertCat} className={css.categoryForm}>
                                <div className={css.labelContainer}><label className={css.label}>Create
                                    category:</label></div>
                                <input
                                    className={css.input}
                                    type='text'
                                    placeholder='e.g. Food festival'
                                    value={insertCategory}
                                    onChange={e => setInsertCategory(e.target.value)}
                                />
                                <button className={css.addCategoryButton}>Add new Category</button>
                            </form>
                        </div>
                    )}
                    {activeSection === 'event' && (
                        <div className={css.adminAddEvent}>
                            <h2 className={css.h2}>Add new event</h2>
                            <form onSubmit={createEventAndTicket} className={css.eventForm}>
                                <div className={css.eventFormBox}>
                                    <div className={css.formSplit}>
                                        <div className={css.labelDiv}><label className={css.label}>Event's
                                            title:</label></div>
                                        <input
                                            className={css.input}
                                            type='text'
                                            placeholder='Event title'
                                            value={event}
                                            onChange={e => setEvent(e.target.value)}
                                        />
                                        {eventError && <p className={css.error}>Event can't be empty.</p>}
                                        <div className={css.labelDiv}><label className={css.label}>Small description:</label></div>
                                        <input
                                            className={css.input}
                                            type='text'
                                            placeholder='Event description'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                        {descriptionError && <p className={css.error}>Description can't be empty.</p>}
                                        <div className={css.labelDiv}><label className={css.label}>Select event's
                                            category:</label></div>
                                        <select className={css.select} onChange={e => setCategory(e.target.value)}>
                                            <option defaultChecked hidden>Select event's category</option>
                                            {categoryoptions}
                                        </select>
                                        {categoryError && <p className={css.error}>Select a category.</p>}
                                        <div className={css.labelDiv}><label className={css.label}>Create tickets:</label></div>
                                        <Link
                                            onClick={openTicketModal}
                                            className={css.createTicketButton}>Create Ticket
                                        </Link>
                                        {isTicketModalOpen && (
                                            <div className={`${css.modal} ${isTicketModalOpen ? css.show : ''}`}>
                                                <h2>Create Ticket</h2>
                                                    <input
                                                        className={css.input}
                                                        type='text'
                                                        placeholder='Ticket'
                                                        value={ticket}
                                                        onChange={e => setTicket(e.target.value)}
                                                    />
                                                {ticketError && <p className={css.error}>Ticket can't be empty.</p>}
                                                    <input
                                                        className={css.input}
                                                        type='number'
                                                        min='0'
                                                        step='0.01'
                                                        placeholder='Ticket Price'
                                                        value={ticket_price}
                                                        onChange={e => setTicket_Price(e.target.value)}
                                                    />
                                                {ticket_priceError && <p className={css.error}>Ticket price can't be empty.</p>}
                                                    <input
                                                        className={css.input}
                                                        type='number'
                                                        placeholder='Quantity'
                                                        min='1'
                                                        step='1'
                                                        max='5000'
                                                        value={quantity}
                                                        onChange={e => setQuantity(e.target.value)}
                                                    />
                                                {quantityError && <p className={css.error}>Quantity can't be empty.</p>}
                                                    <Link className={css.createButton}
                                                          onClick={() => setIsTicketModalOpen(false)}>Create

                                                    </Link>
                                                <Link className={css.cancelButton}
                                                        onClick={() => setIsTicketModalOpen(false)}>Cancel
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <div className={css.formSplit}>
                                        <div className={css.labelDiv}><label className={css.label}>Event date:</label>
                                        </div>
                                        <input
                                            className={css.input}
                                            type='date'
                                            min={date}
                                            value={date}
                                            onChange={e => setDate(e.target.value)}
                                        />
                                        {dateError && <p className={css.error}>Date can't be empty.</p>}
                                        <div className={css.labelDiv}><label className={css.label}>Event start time:</label></div>
                                            <input
                                            className={css.input}
                                            type='time'
                                            value={time}
                                            onChange={e => setTime(e.target.value)}
                                        />
                                        {timeError && <p className={css.error}>Time can't be empty.</p>}
                                        <div className={css.labelDiv}><label className={css.label}>Where is event located:</label></div>
                                        <input
                                            className={css.input}
                                            type='text'
                                            placeholder='e.g. Latvia, Riga, Palladium'
                                            value={location}
                                            onChange={e => setLocation(e.target.value)}
                                        />
                                        {locationError && <p className={css.error}>Location can't be empty.</p>}
                                        <div className={css.labelDiv}>
                                            <label className={css.label}>Image of event:</label>
                                        </div>
                                            <input
                                            className={css.input}
                                            type='text'
                                            placeholder='Image Url'
                                            value={img_url}
                                            onChange={e => setImgUrl(e.target.value)}
                                        />
                                        {img_urlError && <p className={css.error}>Image can't be empty.</p>}
                                    </div>
                                </div>
                                <button className={css.addEventButton}>Add new Event</button>
                                {successMessage && <p className={css.successMessage}>{successMessage}</p>}
                            </form>
                        </div>
                    )}
                    {activeSection === 'delete' && (
                        <div className={css.adminDeleteEvent}>
                        <div className={css.backdrop + (popupEventId ? ' ' + css.show : '')}></div>
                            <h2 className={css.h2}>Delete Event</h2>
                            <select className={css.select} onChange={e => setCategory(e.target.value)}>
                                <option defaultChecked hidden>Select event's category</option>
                                {categoryoptions}
                            </select>
                            <div className={css.scrollableContainer}>
                                {events.map(event => (
                                    <div key={event.id} className={css.listContainer}>
                                        <div className={css.eventSplitContainer}>
                                            <Link to={`/event/${event.id}`} className={css.link}><h3
                                                className={css.h3}>{event.event}</h3></Link>
                                            <p className={css.p}>{event.date}</p>
                                            <p className={css.p}>Ticket's price(1x): {event.ticket_price} EUR</p>
                                        </div>
                                        <div className={css.buttonContainer}>
                                            <button
                                                onClick={() => openPopup(event.id)}
                                                className={css.deleteButton}>Delete
                                            </button>
                                            <button
                                                onClick={() => openEdit(event.id)}
                                                className={css.editButton}>Edit
                                            </button>
                                            {popupEventId === event.id && (
                                                <div
                                                    className={`${css.popup} ${popupEventId === event.id ? css.show : ''}`}>
                                                    Are you sure you want to delete this event?
                                                    <button className={css.cancelButton}
                                                            onClick={closePopup}>Cancel</button>
                                                    <button className={css.deleteButton}
                                                            onClick={confirmDelete}>Delete
                                                    </button>
                                                </div>
                                            )}
                                            {editEventId === event.id && (
                                                <div
                                                    className={`${css.editpopup} ${editEventId === event.id ? css.show : ''}`}>
                                                    <h2>Edit event</h2>
                                                    <form className={css.updateForm} onSubmit={update}>
                                                        <input
                                                            className={css.input}
                                                            type='text'
                                                            name='event'
                                                            value={event.event}
                                                            onChange={e => setEventValue(e.target.value)}
                                                        />
                                                        <textarea
                                                            className={css.textarea}
                                                            name='description'
                                                            value={event.description}
                                                            onChange={e => setDescriptionValue(e.target.value)}
                                                        />
                                                        <input
                                                            className={css.input}
                                                            type='date'
                                                            name='date'
                                                            value={event.date}
                                                            onChange={e => setDateValue(e.target.value)}
                                                        />
                                                        <input
                                                            className={css.input}
                                                            type='number'
                                                            min='0'
                                                            step='0.1'
                                                            name='ticket_price'
                                                            value={event.ticket_price}
                                                            onChange={e => setTicketPriceValue(e.target.value)}
                                                        />
                                                        <input
                                                            className={css.input}
                                                            type='text'
                                                            name='img_url'
                                                            value={event.img_url}
                                                            onChange={e => setImgUrlValue(e.target.value)}
                                                        />
                                                        <button className={css.editButton}
                                                                onClick={confirmEdit}>Save Changes
                                                        </button>
                                                    </form>
                                                    <button className={css.cancelButton}
                                                            onClick={closeEdit}>Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPanel;