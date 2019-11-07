import Worker from "tiny-worker";
import dbP from "@@app/db";
import resolve from "resolve";
import mainLogger from "./logger.js";

const logger = mainLogger.child({area: 'plugins'});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  for (const worker of Object.values(workers)) {
    worker.terminate();
  }
  process.exit(0);
}

const workers = {};

export default async function run(plugins) {
  const db = await dbP;

  function launchAndMaintain(plugin, filename, timeout = 5000) {
    logger.info({msg: "launching plugin", plugin});
    const worker = workers[plugin] = new Worker(filename, [], { esm: true });
    const startTime = Date.now();
    worker.addEventListener('message', (message) => {
      logger.debug({type: "message", message, plugin})
      handleMessage(plugin, message.data);
    });

    worker.addEventListener('error', (err) => {
      workers[plugin] = null;
      logger.warn({type: "error", error: String(err), plugin})
      const now = Date.now();
      if (now - startTime > timeout) {
        return launchAndMaintain(plugin, filename, timeout);
      } else {
        const wait = timeout - (now - startTime);
        logger.info({msg: `Waiting ${wait}ms to respawn ${plugin}`, plugin});
        setTimeout(() => { 
          launchAndMaintain(plugin, filename, timeout * 1.1);
        }, timeout - (now - startTime));
      }
    });
  }

  async function handleMessage(plugin, message) {
    try {
      if (message.type == 'sgv') {
        await db.collections.sgv.insert(message.content)
      }
    }catch (e) {
      logger.error({error: String(e)});
    }
  }
  for (const plugin of plugins) {
    launchAndMaintain(plugin, resolve.sync(plugin));
  }
}
