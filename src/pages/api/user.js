import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import axios from "axios";
import GetIp from 'request-ip';

export default async function handler(req, res) {
    const { name, email, image } = req.body;

    const ip = await GetIp.getClientIp(req);

    const response = await axios.get(`http://ipinfo.io/${ip}/json`);

    const { city, country } = response.data;

    await connectMongoDB();

    const createUser = await User.create({ name, email, image, city, country });

    const saveUser = await createUser.save();

    return res.status(200).json({ saveUser });
}


// export default async function handler(req, res) {


//     try {
//         const { id, name, email, image } = await req.body;
//         let session = await getSession({ req });

//         console.log(session, "user register route");

//         // // If session doesn't exist, handle the error
//         if (!email && !id) {
//             return res.status(401).json({ error: "Not authenticated" })
//         }

//         await connectMongoDB();

//         // Check if the user already exists in the database
//         const existingUser = await User.findOne({ email: email });

//         if (existingUser) {
//             const updatedSession = {
//                 ...session,
//                 ...existingUser
//             };

//             session = { ...updatedSession };
//             await getSession({ req, force: true });


//             return res.status(200).json({ message: 'Session data updated' });
//         } else {
//             // Create a new user in the database
//             const newUser = await User.create({ email, name, image })

//             // Update session data with new user data
//             const updatedSession = {
//                 ...session,
//                 ...newUser
//             };

//             // Update the session
//             session = { ...updatedSession };
//             await getSession({ req, force: true });

//             // await update(updatedSession)

//             return res.status(200).json({ message: 'New user created and session updated' });
//         }
//     } catch (error) {
//         console.error('Error in callback:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// };
