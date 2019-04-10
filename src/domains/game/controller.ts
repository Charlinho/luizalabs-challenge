import express from 'express';

import GameRules from '../../rules/game.rule';

export default {
  index: (_req: express.Request, res: express.Response) => {
    GameRules.getMatches();
    
    res.send(GameRules.getMatches());
  }
};
