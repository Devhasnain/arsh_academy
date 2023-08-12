import nodemailer from 'nodemailer';

const email = {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'hasnainalam1166@gmail.com',
    password: 'nvootwiftdinkgyl',
    senderAddress: 'MakerKit Team <info@makerkit.dev>',
}


export async function sendEmail({ from, to, subject, text, html }) {
    const { host, port, user, password: pass } = email;

    const config = {
        from,
        to,
        subject,
        text,
        html
    }

    let transporter = await nodemailer.createTransport({
        host,
        port,
        secure:false,
        auth: {
            user,
            pass,
        },
    });
    return transporter.sendMail(config);
}
