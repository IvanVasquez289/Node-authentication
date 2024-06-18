import nodemailer, { Transporter } from 'nodemailer'

interface  SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string
}

export class EmailService {
    private transporter: Transporter;
    
    constructor(
        mailerService: string,
        mailerEmail: string,
        mailerSecretKey: string
    ){
        this.transporter = nodemailer.createTransport({
           service: mailerService,
           auth: {
               user:  mailerEmail,
               pass: mailerSecretKey
           }
       });
    }

    async sendEmail(options:SendEmailOptions): Promise<Boolean> {
        const {to,subject,htmlBody,attachments = []} = options;
        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments
            })
            console.log(sendInformation)
           
            return true
        } catch (error) {
            return false
        }
    }
}