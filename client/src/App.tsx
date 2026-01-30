import { Switch, Route, Router } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

function AppRouter() {
  return (
    <Router base={import.meta.env.BASE_URL}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <AppRouter />
  );
}

export default App;
