import { h, render } from 'preact';
import 'preact/devtools';
import App from './components/App/App.jsx';
import './index.css';

const root = document.getElementById('root')

if (root) {
  render(<App />, root);
}
