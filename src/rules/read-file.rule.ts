const ReadFileRule = {
    getPlayer: (line: string) => _getPlayer(line),

    isEndGame: (line: string) => _isEndGame(line),

    isGameLine: (line: string) => _isGameLine(line),

    isKillLine: (line: string) => _isKillLine(line),

    isStartGame: (line: string) => _isStartGame(line),

    isPlayerLine: (line: string) => _isPlayerLine(line)
};

function _getPlayer(line: string): any {
    const playerName = line.match(/(?<=n\\)(.*?)(?=[\\])/g);
    return playerName ? playerName[0] : null;
}

function _isPlayerLine(line: string): boolean {
    return !!line.match(/ClientUserinfoChanged/g);
}

function _isKillLine(line: string): boolean {
    return !!line.match(/Kill/g)
}

function _isGameLine(line: string): boolean {
    return !_isEndGame(line) && !_isStartGame(line) ;
}

function _isEndGame(line: string): boolean {
    return !!line.match(/ShutdownGame/g);
}

function _isStartGame(line: string): boolean {
    return !!line.match(/InitGame/g);
}

export default ReadFileRule;