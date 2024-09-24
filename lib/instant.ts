import { init } from '@instantdb/react';

// ID for app: cozymel
const APP_ID = 'd29e8897-0caf-4ba1-be7d-6fd5a2f4d7b3';

type MyAppSchema = {
  pages: {
    name: string;
    isPublic: boolean;
    content: object;
  }
};

export const db = init<MyAppSchema>({ appId: APP_ID });