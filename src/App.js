import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './views/AdminDashboard';
import UserDashboardUI from './views/UserDashboardUI';
import UserDashboard from './components/UserDashboard';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserManagement from './components/UserManagement';
import BasicData from './components/BasicData';
import Dashboard from './components/Dashboard';
import InventorySystem from './components/InventorySystem';
import InventoryView from './components/InventoryView';
import RePrint from './components/RePrint';
import SQFeetCalc from './components/SQFeetCalc';
import BarcodeGenerator from './components/barcodeGenerator';
import './styles/style.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegistrationForm} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/userui" component={UserDashboardUI} />
        <Route path="/user" component={UserDashboard} />
        <Route path="/management" component={UserManagement} />
        <Route path="/data" component={BasicData} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/system" component={InventorySystem} />
        <Route path="/view" component={InventoryView} />
        <Route path="/reprint" component={RePrint} />
        <Route path="/calculator" component={SQFeetCalc} />
        <Route path="/barcode" component={BarcodeGenerator} />
      </Switch>
    </Router>
  );
}

export default App;