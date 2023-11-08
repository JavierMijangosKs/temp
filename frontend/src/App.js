import { Route, Routes } from "react-router-dom";
import { LoginView } from "./Views/LoginView";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { PostsView } from "./Views/PostsView";
import { UserView } from "./Views/UserView";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PostsView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
