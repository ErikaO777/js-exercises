import { setupPolly } from './polly.setup.js';
import { createIssue, listIssues, closeIssue, setToken } from './index.js';

describe('GitHub Issue CLI with Polly', () => {
    let polly;

    beforeEach(() => {
        polly = setupPolly('github-issue-test');

        setToken('***'); // テスト用にトークンをセット

        // setConfig({
        //     owner: 'pollyjs',
        //     repository: 'test-repo',
        //     token: 'dummy-token'
        // });
    });

    afterEach(async () => {
        await polly.stop();
        delete process.env.GITHUB_TOKEN;
    });

    test('listIssues returns open issues', async () => {
        const issues = await listIssues();
        expect(Array.isArray(issues)).toBe(true);
    });

    // test('createIssue creates a new issue', async () => {
    //     const issue = await createIssue('Test title', 'Test body');
    //     expect(issue.title).toBe('Test title');
    // });

    // test('closeIssue closes an issue', async () => {
    //     const issue = await closeIssue(1);
    //     expect(issue.state).toBe('closed');
    // });
});