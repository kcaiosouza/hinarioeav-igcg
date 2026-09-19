import assert from 'node:assert/strict';
import { sendAssistantQuery } from '../services/assistantService.ts';

console.log('Testing sendAssistantQuery against production API...');

let receivedHymns = false;
let receivedDelta = false;
let receivedDone = false;

const result = await sendAssistantQuery({
  query: 'Hinos sobre fé',
  sessionId: 'test_client_session_' + Date.now(),
  onHymns: (hymns) => {
    console.log('Received hymns event. Total hymns:', hymns.length);
    assert.ok(hymns.length > 0, 'Hymns list should not be empty');
    receivedHymns = true;
  },
  onDelta: (delta) => {
    receivedDelta = true;
    process.stdout.write(delta);
  },
  onDone: () => {
    console.log('\nStream completed.');
    receivedDone = true;
  },
  onError: (err) => {
    console.error('Error during sendAssistantQuery:', err);
  },
});

assert.ok(receivedHymns, 'Should have received hymns');
assert.ok(receivedDelta, 'Should have received delta tokens');
assert.ok(receivedDone, 'Should have received onDone callback');
assert.ok(result.answer.length > 20, 'Should have received substantive answer');
assert.ok(result.hymns.length > 0, 'Should have received hymn suggestions');

console.log('All assistant service tests passed successfully!');
