import { matter } from './topics/matter';
import { atoms } from './topics/atoms';
import { periodic } from './topics/periodic';
import { changes } from './topics/changes';
import { equations } from './topics/equations';
import { Topic } from './types';

/** Order here is the order shown in the app. */
export const TOPICS: Topic[] = [matter, atoms, periodic, changes, equations];
