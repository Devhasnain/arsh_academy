import Image from 'next/image'
import React from 'react'

const Profile = ({ session }) => {
    return (
        <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
            <Image
                alt=''
                className="rounded-full"
                src={session?.user?.image}
                width={60}
                height={60}
            />
            <div>
                Name: <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div>
                Email: <span className="font-bold">{session?.user?.email}</span>
            </div>
        </div>
    )
}

export default Profile