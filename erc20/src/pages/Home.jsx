import AddPerson from "../components/AddPerson";
import React, { useState } from "react";

const Home = () => {
    const [personForm, setPersonForm] = useState(false);

    const handleClose = () => {
        if (personForm) {
            setPersonForm(false);
        }
    };

    const openForm = () => {
        setPersonForm(true);
    };



    return (
        <>
        <div className="bg-gray-200 dark:bg-gray-800 transition-all duration-1000 h-[100vh]">
            <h1 className="text-xl text-gray-800 font-semibold italic dark:text-gray-300">Welcome Home, Buddy!!</h1>
            <div>
                <button onClick={openForm}
                    className="px-4 py-2 text-sm bg-cyan-950 text-gray-200 rounded-lg right-2 flex mx-auto font-semibold hover:bg-gray-500 dark:hover:bg-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:hover:text-white">
                    Add Person
                </button>
            </div>
            {personForm && (
                <div className="modalOverlay">
                    <AddPerson onClose={handleClose} />
                </div>
            )}
            </div>
        </>
    );
}

export default Home;