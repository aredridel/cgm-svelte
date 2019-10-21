import { join } from 'path';
import { Worker } from 'worker_threads';
import dbP from "./db.js";

export default async function run(plugins) {
  const db = await dbP;

  function launchAndMaintain(plugin, timeout = 5000) {
    const worker = new Worker(join(__dirname, 'plugin-bridge.js'));
    const startTime = Date.now();
    worker.unref();
    worker.on('message',console.log);
    worker.once('error', message => {
      console.warn(`Plugin '${plugin}' crashed: `, message);
    });
    worker.on('message', handleMessage);
    worker.once('error', () => {
      const now = Date.now();
      if (now - startTime > timeout) {
        return launchAndMaintain(plugin, timeout);
      } else {
        const wait = timeout - (now - startTime);
        console.log(`Waiting ${wait}ms to respawn ${plugin}`);
        setTimeout(() => { 
          launchAndMaintain(plugin, timeout * 1.1);
        }, timeout - (now - startTime));
      }
    });
  }

  function handleMessage(message) {
    if (message.type == 'sgv') {
      db.post(message.content);
      console.log('sgv', message.content);
    }
  }
  for (const plugin of plugins) {
    launchAndMaintain(plugin);
  }
}
