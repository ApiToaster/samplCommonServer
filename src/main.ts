import State from './state';
import Router from './structure/index';
import Log from './tools/logger/index';
import type { IFullError } from './types/index';

class App {
  init(): void {
    try {
      this.handleInit();
    } catch (err) {
      const { stack, message } = err as IFullError;
      Log.error('Server', 'Err while initializing app');
      Log.error('Server', message, stack);
      Log.error('Server', JSON.stringify(err));

      State.kill();
    }
  }

  private handleInit(): void {
    const router = new Router();

    State.router = router;

    router.init();
    Log.log('Server', 'Server started');
  }
}

new App().init();
