import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Router, Route, BaseLocationHook } from 'wouter-preact';
import { Provider } from 'jotai';

import { Index } from '../../screens/index';
import { Add } from '../../screens/add';
import { Import } from '../../screens/import';

import './App.css';

const currentLocation = () => {
  return window.location.hash.replace(/^#/, '') || '/';
};

const navigate = (to: string) => (window.location.hash = to);

const useHashLocation: BaseLocationHook = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    const handler = () => setLoc(currentLocation());

    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return [loc, navigate];
};

function App() {
  return (
    <Provider>
      <Router hook={useHashLocation}>
        <Route path="/" component={Index} />
        <Route path="/add" component={Add} />
        <Route path="/import" component={Import} />
      </Router>
    </Provider>
  );
}

export default App;
