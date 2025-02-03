import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const FormComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const usernameRef = useRef(null);

    // Local state for form inputs
    const [currentUser, setCurrentUser] = useState({
        username: "",
        roomId: "",
    });

    // Generate a new room ID
    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() });
        toast.success("Created a new Room Id");
        usernameRef.current?.focus();
    };

    // Handle input changes
    const handleInputChanges = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    // Validate form inputs
    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your username");
            return false;
        } else if (currentUser.roomId.trim().length === 0) {
            toast.error("Enter a room id");
            return false;
        } else if (currentUser.roomId.trim().length < 5) {
            toast.error("ROOM Id must be at least 5 characters long");
            return false;
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long");
            return false;
        }
        return true;
    };

    // Handle form submission
    const joinRoom = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        toast.success("Joining room...");
        navigate(`/editor/${currentUser.roomId}`, {
            state: {
                username: currentUser.username,
            },
        });
    };

    // Pre-fill room ID if passed via location state
    useEffect(() => {
        if (currentUser.roomId.length > 0) return;
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId });
            if (currentUser.username.length === 0) {
                toast.success("Enter your username");
            }
        }
    }, [currentUser, location.state?.roomId]);

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
            <img src="public\Screenshot_2025-02-02_110454-removebg-preview.png" alt="Logo" className="w-full" />
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                <input
                    type="text"
                    name="roomId"
                    placeholder="Room Id"
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={handleInputChanges}
                    value={currentUser.roomId}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={handleInputChanges}
                    value={currentUser.username}
                    ref={usernameRef}
                />
                <button
                    type="submit"
                    className="mt-2 w-full rounded-md bg-primary px-8 py-3 text-lg font-semibold text-black"
                >
                    Join
                </button>
            </form>
            <button
                className="cursor-pointer select-none underline text-white"
                onClick={createNewRoomId}
            >
                Generate Unique Room Id
            </button>
        </div>
    );
};

export default FormComponent;