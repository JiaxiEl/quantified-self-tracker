import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

const Profile = () => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await userService.getProfile();
                setUsername(profile.username);
                setBio(profile.bio);
            } catch (error) {
                setError('Failed to load profile');
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await userService.updateProfile(username, bio);
            setSuccess('Profile updated successfully');
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                />
                <button type="submit">Update Profile</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Profile;
