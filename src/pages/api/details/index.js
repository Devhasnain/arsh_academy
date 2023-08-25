// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import multer from "multer";
import { connectMongoDB } from "@/lib/mongodb";
import Applications from "@/models/applications";

const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    storage: multer.memoryStorage(),
}).single('file');

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    try {

        upload(req, res, async (err) => {

            if (err) {
                return res.status(400).json({ msg: 'File upload failed' });
            }

            try {

                if (!req.file) {
                    return res.status(400).json({ msg: 'No file uploaded' });
                }

                const { description } = req.body;

                await connectMongoDB();


                let createApplication = await Applications.create({
                    description,
                    resume: {
                        originalname: req.file.originalname,
                        buffer: req.file.buffer,
                        encoding: req.file.encoding,
                        mimetype: req.file.mimetype,
                        size: req.file.size
                    },
                });

                await createApplication.save();

                return res.status(200).json({ msg: "application successfuly sent" });

            } catch (error) {
                return res.status(500).json({ msg: error.message, err: error });
            }
        })

    } catch (error) {

        return res.status(500).json({
            msg: error.message,
        })
    }
}


