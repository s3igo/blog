import { test } from '@playwright/test';
import { run } from './index.spec';

test.use({ colorScheme: 'dark' });

test.describe('ダークモード', run(test));
