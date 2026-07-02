/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { RouteStatus } from './shared-components-and-modules/route-status';

const LoadingRouteFallback: React.FC = () => {
  return (
    <RouteStatus
      status="loading"
      title="App is loading"
      message="Please wait while the application loads."
    />
  );
};

export default LoadingRouteFallback;
