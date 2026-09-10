import { createContext } from 'react';

/**
 * True once the preloader has finished (or was skipped). Pages can gate
 * their load-in hero animations on this context value.
 */
export const AppReadyContext = createContext<boolean>(true);
