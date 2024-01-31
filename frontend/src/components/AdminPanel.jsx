import {useEffect, useState} from "react";
import axios from "axios";
import css from '../style/Admin.module.css';


const AdminPanel = () => {
    const [activeSection, setActiveSection] = useState('event');

    const [event, setEvent] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [insertCategory, setInsertCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [ticket_price, setTicket_Price] = useState('');
    const [categoryArray, setcategoryArray] = useState([]);

    const categoryoptions = categoryArray.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)

    // console.log(`Current active section: ${activeSection}`);

    useEffect(() => {
        axios
            .get(
                'http://localhost:8000/api/categories'
            )
            .then(function (response){
                console.log(response.data);
                setcategoryArray(response.data)
            })
            .catch(function (error){
                console.error(error);
            });
    }, []);

    const insert = e => {
        e.preventDefault();
        const result = axios
            .post(
                'http://localhost:8000/api/event/create',
                {
                    event:event,
                    description:description,
                    category:category,
                    date:date,
                    ticket_price:ticket_price,
                },
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

    const insertCat = e => {
        e.preventDefault();
        const resultData = axios
            .post(
                'http://localhost:8000/api/categories/create',
                {
                    category:insertCategory,
                },
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
                            <div className={css.labelContainer}><label className={css.label}>Create category:</label></div>
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
                        <form onSubmit={insert} className={css.eventForm}>
                            <input
                                className={css.input}
                                type='text'
                                placeholder='Event title'
                                value={event}
                                onChange={e => setEvent(e.target.value)}
                            />
                            <input
                                className={css.input}
                                type='text'
                                placeholder='Event description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <select className={css.select} onChange={e => setCategory(e.target.value)}>
                                <option defaultChecked hidden>Select event's category</option>
                                <option>Food fest</option>
                                { categoryoptions }
                            </select>
                            <input
                                className={css.input}
                                type='date'
                                min={date}
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                            <input
                                className={css.input}
                                type='number'
                                placeholder='Ticket`s price'
                                min='1'
                                step='0.1'
                                value={ticket_price}
                                onChange={e => setTicket_Price(e.target.value)}
                            />
                            <button className={css.addEventButton}>Add new Event</button>
                        </form>
                    </div>
                    )}
                    {activeSection === 'delete' && (
                        <div className={css.adminDeleteEvent}>
                            <h2 className={css.h2}>Delete Event</h2>
                            <select className={css.select}>
                                <option defaultChecked hidden>Select event's category</option>
                                <option className={css.option}>Sport events</option>
                                <option className={css.option}>Festivals</option>
                                <option className={css.option}>Concerts</option>
                            </select>
                            <div className={css.listContainer}>Event 1
                                <button className={css.deleteButton}>Delete</button>
                            </div>
                            <div className={css.listContainer}>Event 2
                                <button className={css.deleteButton}>Delete</button>
                            </div>
                            <div className={css.listContainer}>Event 3
                                <button className={css.deleteButton}>Delete</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPanel;