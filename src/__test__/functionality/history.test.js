import GameHistory from '../../functionality/history';

const WinningTable = ['X', 'X', 'X', 'O', '', 'O', '', '', ''];
const baseHistory = ['Player1', WinningTable, 5];

beforeEach(() => {
    const GH = new GameHistory();
    GH.resetScores();
})

describe('GameHistory Class', () => {
    test('It initialize without problem', () => {
        const GH = new GameHistory;
        expect(GH).toBeInstanceOf(GameHistory);
        expect(GH.MaxRegistries).toBe(10);
        expect(GH.SCORES).toHaveLength(4);
    })

    test('It should use LS to store history', () => {
        const GH = new GameHistory;
        expect(GH.getHistory()).toEqual([])
        expect(GH.getHistory()).toHaveLength(0)
        GH.GenerateHistory(...baseHistory);
        expect(GH.getHistory()).toHaveLength(1)
        expect(GH.getHistory()[0]).toEqual(expect.objectContaining({ winner: baseHistory[0] }))
        expect(GH.getHistory()[0].score).toBe(280)
    })
    test('It should keep a Max history of 10 entries', () => {
        const GH = new GameHistory();
        expect(GH.getHistory).toHaveLength(0);
        for (let i = 0; i <= 12; i += 1) {
            GH.GenerateHistory(...baseHistory);
        }
        expect(GH.getHistory()).toHaveLength(10)
    })
    test('It should return the MaxScore', () => {
        const GH = new GameHistory();
        expect(GH.getHistory).toHaveLength(0);
        GH.GenerateHistory('WINNER', WinningTable, 0);
        GH.GenerateHistory('Loser', WinningTable, 20);
        expect(GH.getTopScores(GH.getHistory())[0]).toEqual(expect.objectContaining({ winner: 'WINNER' }));
    })
})