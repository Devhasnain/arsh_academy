// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import axios from "axios";

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const extension = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + extension);
        }
    })
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    try {

        upload.single('file')(req, res, async (err) => {

            if (err) {
                return res.status(400).json({ msg: 'File upload failed' });
            }

            try {

                if (!req.file) {
                    return res.status(400).json({ msg: 'No file uploaded' });
                }

                const uploadFile = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'uploads',
                    resource_type: 'auto'
                });

                const { email, description } = await req.body;

                await connectMongoDB();

                const findUser = await User.findOne({ email: email });

                await User.findByIdAndUpdate({ _id: findUser._id }, { $set: { description: description, resume: uploadFile.secure_url } }, { new: true });

                await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}api/sendmail`, { description, name: findUser?.name ?? "", resume: uploadFile?.secure_url });

                return res.status(200).json({ file: uploadFile?.secure_url });

            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        })

    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }
}
