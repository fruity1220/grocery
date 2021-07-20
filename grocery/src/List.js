import React from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa';
const List = ({items, removeItem, editItem}) =>{
    return(
        <div className = 'grocery-list'>
            {items.map((item)=>{
                //every item in te list
                const{id,title} = item;
                //there is id and title in the object name item
                return(
                    <article className = 'grocery-item' key={id}>
                        <p className='title'>{title}</p>
                        <div className='btn-container'>
                            <button
                                type ='button'
                                className='edit-btn'
                                onClick={()=>editItem(id)}
                                //adding function in editItem
                            >
                                <FaEdit/>
                            </button>
                            <button
                                type='button'
                                className='delete-btn'
                                onClick={()=>removeItem(id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </article>
                );

            })}
        </div>
    );

};

export default List;