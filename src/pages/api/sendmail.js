import { sendEmail } from "@/lib/EmailSender";
import renderClientOrderEmail from "@/lib/email/Email";
import { validate } from 'email-validator';

let auther = 'Ashra Academy';
let autherEmail = 'hasnainalam1166@gmail.com'

export default async function SendMail(req, res) {
    try {

        const { description, resume, name } = req.body;

        const { html, errors } = renderClientOrderEmail(
            {
                client: name ?? "Unknow",
                auther,
                resume,
                description,
            }
        );

        if (errors.length) {
            return res.status(500).json({
                msg: errors,
            });
        }

        if (validate(autherEmail)) {

            await sendEmail({
                from: 'similarsystems@gmail.com',
                to: autherEmail,
                subject: 'SimilarSystems Client',
                html,
            }).then(result => {
                return res.status(200).json({ msg: "done" });
            }).catch(error => {
                return res.status(500).json({ msg: error.message });
            })

        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}