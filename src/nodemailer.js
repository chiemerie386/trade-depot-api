const nodemailer = require('nodemailer')


        function sendMail (to, body, subject) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'noreply.notesxd@gmail.com',
                    pass: 'azqyxjrpdocvencn',
                }
            });
            console.log(process.env.NM_EMAIL, 'pl', process.env.NM_PASS)
                const mailOptions = {
                    from: 'The Idea project',
                    to: to,
                    subject: subject,
                    text: body
                    };
            
                    transporter.sendMail(mailOptions, (err, data) => {
                        if (err) {
                            console.log('Error Occurred: ', err)
                        }
                        console.log( data)
            
                    })
        }

        module.exports = sendMail