/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
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
