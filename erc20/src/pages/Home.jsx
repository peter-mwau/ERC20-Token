import AddPerson from "../components/AddPerson";
import React, { useContext, useState } from "react";
import WalletContext from "../contexts/WalletContext";

const Home = () => {
    const [personForm, setPersonForm] = useState(false);
    const { peopleData } = useContext(WalletContext);

    const handleClose = () => {
        setPersonForm(false);
    };

    const openForm = () => {
        setPersonForm(true);
    };

    return (
        <>
            <div className="bg-gray-200 dark:bg-gray-800 transition-all duration-1000 h-[100vh]">
                <h1 className="text-xl text-gray-800 font-semibold italic dark:text-gray-300 p-5 pt-10">Welcome Home, Buddy!!</h1>
                <p className="dark:text-gray-400 text-gray-700 text-md p-5">Add a person to mint ERC20 Tokens!!</p>
                <div>
                    <button onClick={openForm}
                        className="px-4 py-2 text-sm bg-cyan-950 text-gray-200 rounded-lg right-2 flex mx-auto font-semibold hover:bg-gray-500 dark:hover:bg-gray-600 dark:bg-gray-200 dark:text-gray-900 dark:hover:text-white">
                        Add Person
                    </button>
                </div>
                <div className="w-[80%] shadow-md dark:shadow-yellow-400 rounded-md p-5 m-2 items-center flex justify-center mx-auto">
                <div className="flex flex-col gap-4 p-2 items-center justify-center mx-auto mt-4 md:flex-row lg:flex-row">
                    {peopleData.length > 0 ? (
                        peopleData.map((person, index) => (
                            <div key={index} className="bg-gray-100 shadow-lg items-center mx-auto justify-center w-[200px] dark:bg-gray-700 p-2 rounded-lg">
                                <h1 className="text-center font-semibold text-lg py-2 dark:text-white italic">Person Details</h1>
                                <h1 className="text-sm dark:text-gray-300">Name: <span className="font-semibold italic">{person[0]}</span></h1>
                                <p className="text-sm dark:text-gray-300">Age: <span className="font-semibold italic">{person[1].toString()}</span></p> {/* Convert BigInt to string */}
                                <p className="text-sm dark:text-gray-300">Id Number: <span className="font-semibold italic">{person[2]}</span></p>
                                <p className="text-sm dark:text-gray-300">Marital Status: <span className="font-semibold italic">{person[3] ? 'Married' : 'Single'}</span></p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-800 dark:text-gray-300">No data available</p>
                    )}
                </div>
                </div>

                {personForm && (
                    <div className="modalOverlay">
                        <AddPerson onClose={handleClose} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
