import HomePage from "./pages/Home/Home";
import TaskPage from "./pages/Tasks/Tasks";
import useCheckAuthentication from "./api/Authenticator";

function App() {

  const isAutenticado = useCheckAuthentication();

  return (
    <div className="App">
      {isAutenticado ? (
        <TaskPage />
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;
