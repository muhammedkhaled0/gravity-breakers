declare module "express" {
  const express: any;
  export default express;
}

declare module "dotenv" {
  export function config(options?: any): any;
}

declare module "path" {
  const path: any;
  export default path;
}

declare module "url" {
  export function fileURLToPath(url: any): string;
}

declare var process: any;

interface ImportMeta {
  url: string;
}
