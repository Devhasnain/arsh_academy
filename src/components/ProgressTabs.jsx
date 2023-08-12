import React from 'react';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

const ProgressTabs = ({ user }) => {
    return (
        <div className=''>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2 relative">
                    <span className={`${!user.description && 'active '} inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500`}>Info</span>
                    {user?.description &&
                        <IoCheckmarkDoneCircleSharp size={25} className='absolute -top-[10px] left-[15px]' color='green' />
                    }
                </li>
                <li className="mr-2 relative">
                    <span className={`${!user?.resume && 'active'} inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>Resume</span>
                    {user?.resume &&
                        <IoCheckmarkDoneCircleSharp size={25} className='absolute -top-[10px] left-[15px]' color='green' />
                    }
                </li>
            </ul>

        </div>

    )
}

export default ProgressTabs