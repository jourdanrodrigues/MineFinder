import { createDevTools } from '@redux-devtools/core';

import LogMonitor from '@redux-devtools/log-monitor';
import DockMonitor from '@redux-devtools/dock-monitor';

export const ReduxDevTools = createDevTools(
  // @ts-expect-error - The DockMonitor props are not documented
  <DockMonitor
    toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={true}
  >
    {/* @ts-expect-error - The LogMonitor props are not documented */}
    <LogMonitor theme='tomorrow' />
  </DockMonitor>,
);
