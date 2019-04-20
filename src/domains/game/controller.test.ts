import server from '../server';
import request from 'supertest';
import Game from '../../rules/game.interface';

describe('GET /games Test', () => {

    it('should return all games', async () => {
        const result = await request(server).get('/games');
        
        expect(result.status).toEqual(200);
        expect(result.body).not.toBeNull();
    });

    it('should return total_kills', async () => {
        const result = await request(server).get("/games");

        const game: Game = result.body[1];

        expect(game.total_kills).not.toBeNull();
        expect(game.total_kills).toBeGreaterThanOrEqual(1);
    });

    it('should return kills', async () => {
        const result = await request(server).get("/games");

        const game: Game = result.body[1];

        expect(game.kills).not.toBeNull();
        expect(game.kills.length).toBeGreaterThanOrEqual(1);
    });

    it('should return kills with name & score', async () => {
        const result = await request(server).get("/games");

        const game: Game = result.body[1];

        expect(game.kills[0].name).not.toBeNull();
        expect(game.kills[0].score).not.toBeNull();
    });

    it('should return players', async () => {
        const result = await request(server).get("/games");

        const game: Game = result.body[1];

        expect(game.players).not.toBeNull();
        expect(game.players.length).toBeGreaterThanOrEqual(1);
    });

    it('should return players with player name', async () => {
        const result = await request(server).get("/games");

        const game: Game = result.body[1];

        expect(game.players[0].name).not.toBeNull();
    });
});