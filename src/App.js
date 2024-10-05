import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import Services from "./components/Services";
import NotFound from "./components/NotFound";
import ProtestComp from "./components/ProtestComp"
import HomeContent from './components/HomeContent';
import AnalyseReports from './components/AnalyseReports';
import DoctorsList from './components/DoctorsList';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup"  component={SignUp}/>
      <ProtestComp exact path="/" component={Home} />
      <ProtestComp exact path="/about-us" component={Services} />
      <ProtestComp exact path="/services" component={AboutUs} />
      <ProtestComp exact path ="/home-content" component = {HomeContent} />
      <ProtestComp exact path = "/reports" component = {AnalyseReports} />
      <ProtestComp exact path = "/doctors-details"  component = {DoctorsList} />
      <ProtestComp path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
);

export default App;
