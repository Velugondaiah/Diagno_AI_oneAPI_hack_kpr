import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile';

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
import Appointments from './components/Appointments';
import XrayReport from './components/XrayReport';
import FileUpload from './components/FileUpload';
import ReportAnalysis from './components/ReportAnalysis';
import BookingHistory from './components/BookingHistory';




const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/booking-history" component={BookingHistory} />
      <Route exact path="/services" component={ AboutUs} />
      <Route exact path="/about-us" component={Services} />
      <Route exact path="/home-content" component={HomeContent} />
      <Route exact path="/reports" component={AnalyseReports} />
      <Route exact path="/x-ray-reports" component={XrayReport} />
      <Route exact path="/doctors-details" component={DoctorsList} />
      <Route exact path="/appointments" component={Appointments} />
      <Route exact path="/not-found" component={NotFound} />
      <FileUpload />
<<<<<<< HEAD
      {/* <ReportAnalysis /> */}
=======
<<<<<<< HEAD
      {/* <ReportAnalysis /> */}
=======
      
>>>>>>> 57255db63019848dae9569612ef4e4c7f2b4b4f5
>>>>>>> a86ec2886da0fa7cf5e23bba64238e91a5234ec0
      
    </Switch>
  </Router>
);

export default App;
