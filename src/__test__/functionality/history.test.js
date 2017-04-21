import GameHistory from '../../functionality/history';

const WinningTable = ['X', 'X', 'X', 'O', '', 'O', '', '', ''];
const baseHistory = ['Player1', WinningTable, 2];


describe('GameHistory Class', () => {
    test('It initialize without problem', () => {
        const GH = new GameHistory;
        expect(GH instanceof GameHistory).toBeTruthy();
        expect(GH.MaxRegistries).toBe(10);
        expect(GH.SCORES.length).toBe(4);
    })

    test('It should use LS to store history', () => {
        const GH = new GameHistory;
        expect(GH.getHistory()).toEqual([])
        expect(GH.getHistory().length).toBe(0)
            //  GH.GenerateHistory(...baseHistory)
        expect(localStorage).toBeDefined()
    })
})