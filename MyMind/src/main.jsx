import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("MyMind could not render", error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return <main className="fatal-screen" role="alert">
      <div>
        <span>!</span>
        <h1>MyMind couldn’t open this canvas</h1>
        <p>Your canvas data is still saved. Reload the app to try again.</p>
        <button type="button" onClick={() => window.location.reload()}>Reload MyMind</button>
      </div>
    </main>;
  }
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary><App /></AppErrorBoundary>
  </React.StrictMode>,
);
