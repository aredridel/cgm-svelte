import { join } from 'path';
import { Worker } from 'worker_threads';
import dbP from "@app/db";

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

  async function handleMessage(message) {
    try {
      if (message.type == 'sgv') {
        await db.collections.sgv.insert(message.content);
      }
    }catch (e) {
      console.warn(e);
    }
  }
  for (const plugin of plugins) {
    launchAndMaintain(plugin);
  }
}
