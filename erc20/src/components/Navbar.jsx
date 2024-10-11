import React, { useState, useEffect, useContext } from "react";
import WalletContext from "../contexts/WalletContext";
import { initFlowbite } from "flowbite";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { GiRamProfile } from "react-icons/gi";

function Navbar() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);


	const { account,balance,tokenBalance, isWalletConnected, connectWallet, disconnectWallet } =
		useContext(WalletContext);

	useEffect(() => {
		initFlowbite();
	}, [])

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}, [darkMode]);


	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	

	return (
		<nav className="bg-gray-50 dark:bg-gray-900 sticky z-50 top-0 transition-all duration-1000">
			<div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a
					href="/"
					className="flex items-center space-x-3 rtl:space-x-reverse md:w-[200px]"
				>
					<img
						width="50"
						height="50"
						src="/africa.png" // modified logo url
						className="attachment-large size-large wp-image-3255"
						alt=""
						loading="lazy"
						// srcset="https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo.png 350w, https://abyauniversity.com/wp-content/uploads/2024/04/abya_logo-300x129.png 300w"
						sizes="(max-width: 592px) 100vw, 592px"
					/>
				</a>
				<div className="flex items-center">
					<div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse flex-col">
						<button
							type="button"
							onClick={toggleDropdown}
							className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
							id="user-menu-button"
							aria-expanded="false"
							data-dropdown-toggle="user-dropdown"
							data-dropdown-placement="bottom"
						>
							<GiRamProfile className={`text-gray-900 dark:text-gray-100 w-10 h-10 p-2 border-gray-600 border-2 rounded-full${isWalletConnected ? 'border-2 border-yellow-500 rounded-full' : 'border-gray-600 border-2 rounded-full'}`}/>
							
						</button>
						{/* <!-- Dropdown menu --> */}
						<div
							className={`py-2 space-y-2 ${
								isDropdownOpen ? "" : "hidden"
							} z-50 my-4 absolute right-3 mt-[60px] text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`}
						>
							<ul className="py-2" aria-labelledby="user-menu-button">
								<li>
									<a
										href="/dashboard"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										Dashboard
									</a>
								</li>
								<li>
									<a
										href="/profile"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										Profile
									</a>
								</li>
								<li>
								<div className="px-4 w-[300px]">
                                    {/* Wallet details content here */}
                                    <p className='font-light text-sm text-gray-700 dark:text-gray-50'>Wallet Address:</p>
                                    <span className='text-wrap italic text-sm font-semibold dark:text-gray-50 break-words items-center justify-center py-2'>{account ? account : '0x...'}</span>
                                    <p className='font-light text-sm text-gray-700 dark:text-gray-50'>Balance:</p>
                                    <span className='text-wrap italic text-sm font-semibold dark:text-gray-50 items-center justify-center py-2'> {isWalletConnected ?balance : '0'} ETH</span>
									<p className='font-light text-sm text-gray-700 dark:text-gray-50'>Token Balance:</p>
									<span className='text-wrap italic text-sm font-semibold dark:text-gray-50 items-center justify-center py-2'> {isWalletConnected ?tokenBalance : 'N/A'} TTKN</span>
                                </div>
								</li>
								<li>
									<a
										href="#me"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										Settings
									</a>
								</li>
								<li>
									<a
										href="#me"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
									>
										Earnings
									</a>
								</li>
								
							</ul>
						</div>
						<button
							data-collapse-toggle="navbar-user"
							type="button"
							className="inline-flex absolute items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-user"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className="items-center mr-5 hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-user"
					>
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 transition-all duration-1000">
							{/* This is hidden in lg views */}
							<li className="md:hidden">
								<a
									href="/profile"
									className="flex py-2 px-3 text-cyan-950 hover:text-yellow-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-500 md:p-0 dark:text-white md:dark:hover:text-yellow-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
								>
									Profile
								</a>
							</li>
							
							{/* Metamask Connect Button */}
							{account ? (
								<button
									onClick={disconnectWallet}
									className="bg-yellow-500 dark:text-cyan-950 text-white font-semibold px-4 rounded-3xl"
								>
									Disconnect Wallet
								</button>
							) : (
								<button
									onClick={connectWallet}
									className="bg-yellow-400 dark:text-cyan-950 text-white font-semibold px-4 rounded-3xl"
								>
									Connect Wallet
								</button>
							)}
							<a href="#me" className="lg:pl-10 p-2">
								<svg
									className="w-6 h-6 text-gray-800 dark:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M15.133 10.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.944.944 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.39A1.001 1.001 0 1 1 4.854 3.8a7.431 7.431 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 15.146 3.8a1 1 0 0 1 1.471-1.354 9.425 9.425 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
								</svg>
							</a>
							{/* togglemode btn */}
							<button className='mx-10'>
                                {darkMode ? <MdOutlineLightMode className='w-6 h-6 text-gray-800 dark:text-white' onClick={() => setDarkMode(!darkMode)} /> : <MdDarkMode className='w-6 h-6 text-gray-800 dark:text-white' onClick={() => setDarkMode(!darkMode)} />}
                            </button>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
}
export default Navbar;