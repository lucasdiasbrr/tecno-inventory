import React, { useState } from 'react';
import axios from 'axios';

const BrandForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/brands', { name });
            alert('Brand added successfully');
            setName('');
        } catch (error) {
            alert('Failed to add brand');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Add Brand</h2>
                <div>
                    <label>Brand Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Brand</button>
            </form>
        </div>
    );
};

export default BrandForm;
