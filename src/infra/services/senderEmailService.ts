import nodemailer from 'nodemailer';
import { env } from '../../config/env';

export class SenderEmailService {
    constructor(private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.GMAIL_USER,
            pass: env.PASSWORD_GMAIL
        }
    })){}

    async senderEmail(data: {code: string, email: string}){
        const html = `
                    <h2>Recuperação de Senha</h2>
                    <p>Você solicitou a redefinição da sua senha.</p>
                    <p>Código ${data.code}</p>
                    <p>Se você não solicitou isso, ignore este e-mail.</p>`;
            
            await this.transporter.sendMail({
                from: "Suporte " + env.GMAIL_USER,
                to: data.email,
                subject: 'Recuperação de Senha',
                html: html,
            });
    }
}