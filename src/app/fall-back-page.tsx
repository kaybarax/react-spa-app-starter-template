/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import React from 'react';
import { RouteStatus } from './shared-components-and-modules/route-status';

const FallBackPage: React.FC = () => {
  return (
    <RouteStatus
      status="error"
      title="Something went wrong"
      message="An unexpected error occurred. Please try again."
    />
  );
};

export default FallBackPage;
