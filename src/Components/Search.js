import React, { useState, useEffect } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [policies, setPolicies] = useState([]);
    const [filteredPolicies, setFilteredPolicies] = useState([]);

    // Fetch policies from API
    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await fetch('https://api.example.com/policies'); // Replace with your API endpoint
                const data = await response.json();
                setPolicies(data);
                setFilteredPolicies(data);
            } catch (error) {
                console.error('Error fetching policies:', error);
            }
        };
        fetchPolicies();
    }, []);

    // Filter policies based on search term
    useEffect(() => {
        const results = policies.filter(policy =>
            policy.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPolicies(results);
    }, [searchTerm, policies]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search policy by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredPolicies.map(policy => (
                    <li key={policy.id}>{policy.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;