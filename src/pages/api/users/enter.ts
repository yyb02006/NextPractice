import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handlerWrapper, { ResType } from '@/libs/server/handlerWrapper';
import nodemailer from 'nodemailer';
import { apiSessionWrapper } from '@/libs/server/sessionWrapper';
import useUser from '@/libs/client/useUser';
import { useEffect } from 'react';

const transporter = nodemailer.createTransport({
	service: 'naver',
	port: 587,
	host: 'smtp.naver.com',
	tls: {
		rejectUnauthorized: false,
	},
	auth: {
		user: process.env.NAVER_USER,
		pass: process.env.NAVER_PASS,
	},
});

const twilioClient = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

async function handler(req: NextApiRequest, res: NextApiResponse<ResType>) {
	/**req.body 객체에 있는 email key의 value가 {email}로 바로 들어감 */
	const { phone, email } = req.body;
	const reqData = phone ? { phone: phone } : email ? { email } : {};
	if (!reqData) return res.status(400).json({ success: false });
	/**payload란 데이터를 전송할 때 header나 error, status와 같은 부가적인 요소를 제외한 순수한 data자체를 말함*/
	const payload = Math.floor(100000 + Math.random() * 900000) + '';
	const token = await client.token.create({
		data: {
			payload,
			user: {
				connectOrCreate: {
					where: { ...reqData },
					create: { name: 'Anonymous', ...reqData },
				},
			},
		},
	});
	if (phone) {
		/*await twilioClient.messages.create({
			messagingServiceSid: process.env.TWILIO_MESSAGE_SID,
			body: `Hello Master, your authentication number is ${payload}.`,
			//!를 붙이면 undefined가능성을 버릴 수 있어서 string | undefined타입이 string으로 바뀜
			to: process.env.TWILIO_TO_PHONE_NUMBER!,
		});*/
	} else if (email) {
		// await transporter.sendMail(
		// 	{
		// 		from: process.env.NAVER_USER,
		// 		to: process.env.NAVER_TO_TEST_ADRESS,
		// 		subject: 'Hello Im Lab-G Rat Man',
		// 		text: `Your Code is ${payload}.`,
		// 	},
		// 	(err, info) => {
		// 		if (err) {
		// 			console.log(err);
		// 		} else console.log('success');
		// 	}
		// );
	}
	console.log(token);

	res.status(200).json({ success: true });
}

export default apiSessionWrapper(
	handlerWrapper({ methods: ['POST'], func: handler, inspection: false })
);
