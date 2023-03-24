var express = require('express');
require('dotenv').config();
const EventEmitter = require('events');
const eventEmitter = new EventEmitter()
var router = express.Router();
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cors = require('cors');

router.use(cors())
let corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


router.use(bodyParser.json());


router.get('/', function(req, res) {
	res.send('Hello Home Loan Rout');
});


router.post('/send', cors(corsOptions), (req, res) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		secure: true,
		port: 465,
		auth: {
			user: 'akashjitnayak89@gmail.com', // must be Gmail
			pass: 'wswmmjoftflscoej'
		},
	});

	let maillist = [
		'umaloan1@gmail.com' 
	];

	let mailOptions = {
		from: 'akashjitnayak89@gmail.com',
		to: maillist, // must be Gmail
		// cc: `${req.body.name} <${req.body.email}>`,
		subject: 'New Home Loan Enquiry',
		html: `
		<h2>Hi</h2> </br>
		<table style="width: 100%; border: none">
		<thead>
		  <tr style="background-color: #000; color: #fff;">
			<th style="padding: 10px 0">Full Name</th>
			<th style="padding: 10px 0">E-mail</th>
			<th style="padding: 10px 0">Phone</th>
			<th style="padding: 10px 0">Resident Type</th>
			<th style="padding: 10px 0">Company</th>
			<th style="padding: 10px 0">State</th>
			<th style="padding: 10px 0">City</th>
			<th style="padding: 10px 0">Selected Bank</th>
			<th style="padding: 10px 0">WhatsApp</th>
			</tr>
		</thead>
		<tbody>
		  <tr>
			<th style="text-align: center">${req.body.name}</th>
			<td style="text-align: center">${req.body.email}</td>
			<td style="text-align: center">${req.body.phone}</td>
			<td style="text-align: center">${req.body.resident_type}</td>
			<td style="text-align: center">${req.body.company_name}</td>
			<td style="text-align: center">${req.body.property_state}</td>
			<td style="text-align: center">${req.body.property_city}</td>
			<td style="text-align: center">${req.body.selected_bank}</td>
			<td style="text-align: center">${req.body.via_wp}</td>
		  </tr>
		</tbody>
	  </table>
            `
	};

	let replyMailToUser = {
		from: 'akashjitnayak89@gmail.com',
		to: req.body.email,
		subject: `Thank you ${req.body.name}`,
	}


	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			res.status(400).json({
				message: 'invalid request'
			})
		} else {
			console.log('Email sent: ' + info.response);
			eventEmitter.emit('reply');
			res.status(200).json({
				message: 'successfuly sent!'
			})
		}
	});

eventEmitter.on('reply', function() {
	transporter.sendMail(replyMailToUser, (error, info) => {
		if (error) {
			console.log(error);
			res.status(400).json({
				message: 'invalid request'
			})
		} else {
			console.log('Email sent to user: ' + info.response);
			res.status(200).json({
				message: 'successfuly sent!'
			})
		}
	});
})

});

module.exports = router;