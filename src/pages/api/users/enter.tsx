import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/libs/server/client';
import handler from '@/libs/server/handler';

async function handlerAction(req: NextApiRequest, res: NextApiResponse) {
	/**req.body 객체에 있는 email key의 value가 {email}로 바로 들어감 */
	const { phone, email } = req.body;
	/**payload란 데이터를 전송할 때 header나 error, status와 같은 부가적인 요소를 제외한 순수한 data자체를 말함*/
	const payload = phone ? { phone: Number(phone) } : email ? { email } : {};
	const user = await client.user.upsert({
		/**...obj는 obj안의 property들을 펼쳐서 리턴. {...{key:value,weight:volume}} = {key:value,weight:volume} */
		where: { ...payload },
		create: {
			name: 'Anonymous',
			...payload,
		},
		update: {},
	});

	// let user;
	// if (email) {
	// 	user = await client.user.findUnique({
	// 		where: {
	// 			/*ES6에서 프로퍼티의 value가 변수일 때, 프로퍼티를 key:value 형식으로 쓰지 않고 value만을 입력하면
	// 			key는 value와 동일한 문자열로 자동생성된다. 예를 들어 where객체의 프로퍼티로 email:email을 적으면
	// 			위쪽 email변수의 값을 쓰게 되고 email만을 적으면 email변수의 값을 쓰면서 email이라는 key값을 자동으로 생성하여
	// 			같은 결과를 보여준다.*/
	// 			email,
	// 		},
	// 	});
	// 	user
	// 		? console.log('success to read!')
	// 		: (console.log("doesn't founded, then it will be created"),
	// 		  (user = await client.user.create({
	// 				data: {
	// 					name: 'Anonymous',
	// 					email,
	// 				},
	// 		  })));
	// }
	// if (phone) {
	// 	user = await client.user.findUnique({
	// 		where: {
	// 			phone: Number(phone),
	// 		},
	// 	});
	// 	user
	// 		? console.log('success to read!')
	// 		: (console.log("doesn't founded, then it will be created"),
	// 		  (user = await client.user.create({
	// 				data: {
	// 					name: 'Anonymous',
	// 					phone: Number(phone),
	// 				},
	// 		  })));
	// 	console.log(user);
	// }

	res.status(200).end();
}

export default handler('POST', handlerAction);
