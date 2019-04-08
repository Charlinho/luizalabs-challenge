import express from 'express';

import game from './game/routes';

const server = express();

server.use('/games', game);

server.use('/health', (_req, res) => {
	res.status(200).json({ uptime: process.uptime() });
});

export default server;
  