import { continueGuard } from '../../guard/index.js';
import { continueFight } from '../../fight/index.js';
import { continueFollow, continueGo } from '../../move/index.js';
import { continueGeave, continueReclaimResources } from '../../resources/index.js';

export const continueActionsFuncs = {
  go: continueGo,
  follow: continueFollow,
  fight: continueFight,
  guard: continueGuard,
  geave: continueGeave,
  reclaim_resources: continueReclaimResources,
};
