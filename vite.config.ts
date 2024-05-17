import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Расширяем тип ServerOptions, добавляя свойство middleware
interface ExtendedServerOptions {
  middleware?: ((req: Request, res: Response, next: () => void) => void)[];
}

const serverOptions: ExtendedServerOptions = {
  middleware: [(req, res, next) => {
    if (req.url?.endsWith('.ts')) {
      res.headers.set('Content-Type', 'application/javascript');
    }
    next();
  }]
};

export default mergeConfig(
  defineConfig({
    plugins: [react()]
  }),
  {
    server: serverOptions
  }
);