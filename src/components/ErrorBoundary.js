import React from "react";
import { logError } from "../libs/errorLib";
import "./ErrorBoundary.css";

export default class ErrorBoundry extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logError(error, errorInfo);
  }

  render(): React.ReactNode {
    return this.state.hasError ? (
      <div className="ErrorBoundary">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}