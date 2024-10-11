import AddPerson from "../components/AddPerson";
import React, { useContext, useState } from "react";
import WalletContext from "../contexts/WalletContext";

const Home = () => {
    const [personForm, setPersonForm] = useState(false);
    const { peopleData } = useContext(WalletContext);

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

            <div className="flex flex-col gap-4 mt-4">
                {peopleData.length > 0 ? (
                    peopleData.map((person, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                            <h1 className="text-lg font-semibold dark:text-gray-300">Name: {person[0]}</h1>
                            <p className="text-sm dark:text-gray-300">Age: {person.age}</p>
                            <p className="text-sm dark:text-gray-300">
                                Id Number: {person.idNumber}
                            </p>
                            <p className="text-sm dark:text-gray-300">
                                Marital Status: {person.married}

                            </p>

                            </div>
                    ))
                ) : (
                    <p className="text-gray-800 dark:text-gray-300">No data available</p>
                )}
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