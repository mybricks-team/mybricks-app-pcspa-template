import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from "body-parser";
import IndexModule from './index.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(IndexModule);

	app.useStaticAssets(path.join(__dirname, './_assets/'), {
		prefix: '/',
	});

	const whitelist = ['localhost'];
	app.enableCors({
		origin: function (origin, callback) {
			if (!origin || whitelist.find((item) => origin.indexOf(item) >= 0)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
		methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
		credentials: true,
	});
	
	app.use(bodyParser.json({ limit: '100mb' }));
	app.use(function(req, res, next) {
		req.setTimeout(30*1000);
		res.setTimeout(30*1000);
		next();
	  });
	await app.listen(9002);
}
bootstrap();
