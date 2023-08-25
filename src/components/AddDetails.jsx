import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { IoChevronBack } from 'react-icons/io5';
import { BeatLoader } from 'react-spinners';

const allowedFileTypes = ['application/pdf', 'text/plain'];

const pages = [1, 2, 3];

export default function AddDetails() {

    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [activePage, setActivePagee] = useState(1);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (allowedFileTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
            } else {
                setFile(null);
                toast.error('Invalid file type. Please select a PDF or Txt file.')
            }
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (!file) {
                throw new Error('Please select your resume to proceed!')
            }

            const formdata = new FormData();
            formdata.append('file', file);
            formdata.append('description', description);

            await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}api/details`, formdata, { headers: { "Content-Type": "multipart/form-data" } });

            toast.success("Your application was successfuly sent!", { icon: '👏' });

            setLoading(false);

        } catch (error) {
            toast.error(error.message);
            console.log(error)
            setLoading(false);
        }

    }

    const handleNext = () => {
        switch (activePage) {
            case 1:
                if (description && description.length > 100) { setActivePagee(activePage + 1) }
                else {
                    toast.error("Please add a description and length should be atleast 100 characters!")
                }
                break;

            case 2:
                setActivePagee(activePage + 1)
                break
        }
    }

    const handleBack = async () => {
        if (activePage === 2) {
            setActivePagee(1);
        } else if (activePage === 3) {
            setActivePagee(2);
        }
    }

    return (
        <>
            <div className='h-screen pt-10 text-black'>

                <div className='container mx-auto'>
                    <div className='flex flex-row items-center justify-between'>
                        <button onClick={handleBack} className='flex disabled:opacity-50 disabled:hover:scale-[1] hover:scale-[1.05] flex-row space-x-3 items-center bg-[#FF4632] transition duration-300 sm:ml-0 ml-4 shadow-xl py-2 px-4 rounded-full text-white'>
                            <IoChevronBack />
                            <span>{activePage === 1 ? 'Sign Out' : "Back"}</span>
                        </button>
                    </div>

                    <div className='flex flex-row space-x-2 items-center justify-center pb-5'>
                        {pages.map((item, index) => {
                            return (
                                <span className={`${activePage === item ? 'bg-[#FF4632]' : 'bg-black'} h-1 px-3 rounded-full`} key={index}>
                                </span>
                            )
                        })}
                    </div>

                    <form onSubmit={onSubmit} className='space-y-3 w-11/12 md:w-8/12  lg:w-6/12 mx-auto'>
                        {activePage === 1 &&
                            <div className='space-y-5 pt-5'>
                                <h2 className='text-3xl text-center'>Write About you.</h2>
                                <div className='mb-4'>
                                    <textarea rows={12}
                                        required
                                        defaultValue={description ?? ""}
                                        onChange={(e) => { setDescription(e.target.value) }}
                                        className={`z-10 block shadow-2xl p-2.5 w-full text-sm bg-transparent rounded-lg outline-none backdrop-blur-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder='Description' id='description' />
                                </div>
                            </div>}

                        {activePage === 2 &&
                            <div className='space-y-5'>
                                <h2 className='text-3xl text-center'>Upload your Resume.</h2>
                                <div className="flex items-center justify-between w-full flex-row space-x-2">
                                    <label htmlFor="pdf-file" className="shadow-xl flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer backdrop-blur-2xl">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            {
                                                (file && file?.type === allowedFileTypes[0]) ? <span>{file?.name ?? "Unknow file selected"}</span> :
                                                    <>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
                                                    </>
                                            }
                                        </div>
                                        <input id="pdf-file"
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden" />
                                    </label>
                                </div>
                                {activePage === 3 && <div className='flex flex-col items-center pt-7'>
                                    <button
                                        className='transition duration-500 hover:scale-[1.05] hover:bg-[#FF4632] py-4 px-12 bg-black rounded-full text-white shadow hover:shadow-xl'
                                        type='submit' >{loading ? <BeatLoader size={8} color='white' /> : "Submit"}</button>
                                </div>}
                            </div>}


                        {
                            activePage === 3 &&
                            <div className='space-y-5'>
                                <h2 className='text-3xl text-center'>Upload Transcript File.</h2>
                                <div className="flex items-center justify-between w-full flex-row space-x-2">
                                    <label htmlFor="txt-file" className="shadow-xl flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer backdrop-blur-2xl">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            {
                                                (file && file?.type === allowedFileTypes[1]) ? <span>{file?.name ?? "Unknow file selected"}</span> :
                                                    <>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Transcripted File</p>

                                                    </>}
                                        </div>
                                        <input id="txt-file"
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden" />
                                    </label>
                                </div>
                                {activePage === 3 && <div className='flex flex-col items-center pt-7'>
                                    <button
                                        className='transition duration-500 hover:scale-[1.05] hover:bg-[#FF4632] py-4 px-12 bg-black rounded-full text-white shadow hover:shadow-xl'
                                        type='submit' >{loading ? <BeatLoader size={8} color='white' /> : "Submit"}</button>
                                </div>}
                            </div>
                        }


                    </form>
                    {activePage === 1 || activePage === 2 ? <div className=''>
                        <div className='flex flex-col items-center pt-7'>
                            <button
                                className={`transition duration-500 hover:bg-[#FF4632] hover:scale-[1.05] py-4 px-12 bg-black rounded-full text-white shadow hover:shadow-xl`}
                                onClick={handleNext}>Next</button>
                        </div>
                    </div> : ""}
                </div>
            </div>

        </>
    )
}