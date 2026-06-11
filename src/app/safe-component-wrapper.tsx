/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import FallBackPage from './fall-back-page';

export interface SafeComponentWrapperProps {
  children: ReactNode;
}

interface SafeComponentWrapperState {
  hasError: boolean;
}

/**
 * Error boundary around the app's view tree. Error boundaries must be class
 * components — React has no hook equivalent for componentDidCatch.
 */
export default class SafeComponentWrapper extends Component<SafeComponentWrapperProps, SafeComponentWrapperState> {
  state: SafeComponentWrapperState = { hasError: false };

  static getDerivedStateFromError(): SafeComponentWrapperState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('SafeComponentWrapper caught an error', error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <FallBackPage />;
    }
    return this.props.children;
  }
}
