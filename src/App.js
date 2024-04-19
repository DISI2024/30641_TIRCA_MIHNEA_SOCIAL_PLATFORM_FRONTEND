import './App.css';
import ChatPage from './Chat/ChatPage';
import ChatDummyLogin from './Chat/ChatDummyLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatDummyLogin/>} />
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
