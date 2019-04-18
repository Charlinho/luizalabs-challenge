const ReadFileRule = {

    isEndGame: (line: string) => _isEndGame(line),

    isGameLine: (line: string) => _isGameLine(line),

    isKillLine: (line: string) => _isKillLine(line),

    isStartGame: (line: string) => _isStartGame(line),

    isPlayerLine: (line: string) => _isPlayerLine(line),

    getPlayerName: (line: string) => _getPlayerName(line),

    isKillerLine: (line: string, playerName: string) => _isKillerLine(line, playerName),

    isSucideLine: (line: string, playerName: string) => _isSucideLine(line, playerName),

    playerDeadByWorld: (line: string, playerName: string) => _playerDeadByWorld(line, playerName)
};

function _getPlayerName(line: string): any {
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

function _playerDeadByWorld(line: string, playerName: string): boolean {
    return line.includes('<world> killed '.concat(playerName));
}

function _isKillerLine(line: string, playerName: string): boolean {
    return line.includes(playerName.concat(' killed')) ;
}

function _isSucideLine(line: string, playerName: string): boolean {
    return line.includes(playerName.concat(' killed ').concat(playerName)) || _playerDeadByWorld(line, playerName);
}

export default ReadFileRule;