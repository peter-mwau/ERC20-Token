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
        <div className="bg-gray-200 h-[100vh]">
            <h1 className="text-xl text-gray-800 font-semibold italic">Welcome Home, Buddy!!</h1>
            <div>
                <button onClick={openForm}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
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