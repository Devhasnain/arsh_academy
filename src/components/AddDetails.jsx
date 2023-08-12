"use client";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';


const allowedFileTypes = ['application/pdf', 'text/plain'];


export default function AddDetails() {

    const { update, data: session } = useSession()

    const [activePage, setActivePage] = useState(1);

    const { register, handleSubmit, formState, getValues } = useForm({
        defaultValues: {
            description: "",
            resume: null
        }
    });

    const onSubmit = async (data) => {

        try {
            toast.loading('Loading', { duration: 800 })

            const formdata = new FormData();
            formdata.append('file', data?.resume[0]);
            formdata.append('description', data?.description);
            formdata.append('email', session?.user?.email);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}api/details/`, formdata, { headers: { "Content-Type": "multipart/form-data" } })

            await update({
                ...session,
                user: {
                    ...session?.user,
                    description: data.description,
                    resume: response.data.file
                }
            });

            toast.success("Your profile is complete now");

        } catch (error) {
            toast.error(error.message);
        }
    }

    const handlePre = () => {
        if (activePage > 1) {
            setActivePage(activePage - 1)
        }
    }

    const handleNext = () => {
        if (activePage < 2) {
            setActivePage(activePage + 1);
        }
    }

    let values = getValues();

    return (
        <>
            <div className='flex flex-col md:w-8/12 mx-auto'>

                <div className='w-full space-y-3 pt-10'>

                    <div className='flex flex-row items-center justify-between'>
                        <div onClick={handlePre} className={`h-[50px] w-[50px] flex flex-row items-center justify-center rounded-xl ${activePage === 2 ? 'bg-gray-200  hover:bg-gray-300 hover:scale-[1.05] cursor-pointer' : 'bg-gray-100'}`}>
                            <MdArrowBackIosNew size={20} />
                        </div>
                        <div onClick={handleNext} className={`h-[50px] w-[50px] flex flex-row items-center justify-center rounded-xl ${activePage === 1 ? 'bg-gray-200 hover:bg-gray-300 hover:scale-[1.05] cursor-pointer' : 'bg-gray-100'}`}>
                            <MdArrowForwardIos size={20} />
                        </div>
                    </div>

                    <div className='flex flex-row items-center justify-between py-6'>
                        <div className={`w-5/12 flex flex-row items-center justify-between ${values?.description?.length > 100 ? 'bg-green-500 text-white' : "bg-gray-100"} transition duration-1000 p-2 rounded`}>
                            <span>
                                Description
                            </span>
                            {values?.description?.length > 100 && <IoCheckmarkDoneSharp size={20} />}
                        </div>
                        <div className={`w-5/12 flex flex-row items-center justify-between ${values?.resume === null ? 'bg-gray-100' : "bg-green-500 text-white"} transition duration-1000 rounded p-2`}>
                            <span>
                                Resume
                            </span>
                            {values?.resume !== null && <IoCheckmarkDoneSharp size={20} />}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {activePage === 1 &&
                            <div className='space-y-3'>
                                <h2 className='text-3xl'>Write About you.</h2>
                                <div className='mb-4'>
                                    <label htmlFor='description'>Description</label>
                                    <textarea rows={8} {...register('description', { minLength: { value: 100, message: "Min length should be 100 characters" }, })} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Description' id='description' />
                                </div>
                            </div>}

                        {activePage === 2 &&
                            <div className='space-y-3'>
                                <h2 className='text-3xl'>Upload your Resume.</h2>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF or Transcripted files</p>
                                        </div>
                                        <input id="dropzone-file" type="file"
                                            {...register('resume', {
                                                required: 'File is required.',
                                                validate: {
                                                    allowedTypes: (value) => {
                                                        const fileType = value[0]?.type;
                                                        const fileExtension = value[0]?.name.split('.').pop().toLowerCase();

                                                        if (allowedFileTypes.includes(fileType) || fileExtension === 'pdf') {
                                                            return true;
                                                        }
                                                        return 'Only PDF or text files are allowed.';
                                                    },
                                                },
                                            })}
                                            className="hidden" />
                                    </label>
                                </div>
                                <button type='submit' className='py-2 px-4 self-start bg-blue-500 rounded'>Submit</button>

                            </div>}
                    </form>
                </div>
            </div>

        </>
    )
}