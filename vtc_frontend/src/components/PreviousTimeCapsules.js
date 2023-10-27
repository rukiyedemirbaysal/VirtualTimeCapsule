import React, { useState, useEffect } from 'react';
import { getPreviousTimeCapsules, deleteTimeCapsule, openTimeCapsule } from './api';

const PreviousTimeCapsules = ({ onOpen, switchToUpdateMode }) => { 
    const [capsules, setCapsules] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPreviousTimeCapsules();
                setCapsules(data);
            } catch (error) {
                console.error('Failed to fetch previous time capsules:', error);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = (id, capsuleData) => {
        console.log('Updating time capsule with ID:', id);
        switchToUpdateMode(capsuleData); 
    };

const handleDelete = async (id) => {
    console.log("Attempting to delete capsule with ID:", id); 

    if (!window.confirm("Are you sure you want to delete this time capsule?")) {
        return; 
    }

    try {
        await deleteTimeCapsule(id);
        setCapsules(capsules.filter(c => c.id !== id));
    } catch (error) {
        console.error('Failed to delete time capsule:', error);
    }
};

const handleOpen = async (id) => {
    try {
        const data = await openTimeCapsule(id);
        if (onOpen) {
            onOpen(data);
        }
    } catch (error) {
        console.error('Failed to open time capsule:', error);
    }
};
    return (
        <div>
            {capsules.map(capsule => (
                <div  key={capsule.capsuleId}>
                    <div className='row my-1 mx-2 rounded-pill bg-dark-subtle text-center'>
                    <h5>{capsule.title}</h5>
                    </div>
                    <div className='row my-1 mx-2 rounded-pill bg-body-secondary'>
                    <p> {capsule.description}</p>
                    </div>
                    <button className='btn ms-3 btn-success m-1' onClick={() => handleOpen(capsule.capsuleId)}>Open</button>
                    <button className='btn btn-primary m-1' onClick={() => handleUpdate(capsule.capsuleId, capsule)}>Update</button>
                    <button className='btn btn-danger m-1' onClick={() => handleDelete(capsule.capsuleId)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PreviousTimeCapsules;