import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DeviceList from './components/DeviceList';
import FirmwareManager from './components/FirmwareManager';
import SecurityAudit from './components/SecurityAudit';
import { Device, Firmware, Alert, DeviceStatus } from './types';

// Mock Data
const MOCK_DEVICES: Device[] = [
  { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Sensor-Gateway-01', ip: '192.168.1.101', firmwareVersion: '2.4.1', lastSeen: new Date().toISOString(), status: DeviceStatus.ONLINE, batteryLevel: 85, cpuUsage: 12, location: 'Warehouse A' },
  { id: '2c9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Smart-Lock-Front', ip: '192.168.1.102', firmwareVersion: '2.4.0', lastSeen: new Date().toISOString(), status: DeviceStatus.UPDATING, batteryLevel: 42, cpuUsage: 85, location: 'Main Entrance' },
  { id: '3d9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Camera-Perimeter-N', ip: '192.168.1.105', firmwareVersion: '2.3.9', lastSeen: new Date(Date.now() - 86400000).toISOString(), status: DeviceStatus.OFFLINE, batteryLevel: 0, cpuUsage: 0, location: 'North Fence' },
  { id: '4e9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Temp-Controller-X', ip: '192.168.1.120', firmwareVersion: '2.1.0', lastSeen: new Date().toISOString(), status: DeviceStatus.VULNERABLE, batteryLevel: 98, cpuUsage: 15, location: 'Server Room' },
  { id: '5f9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', name: 'Sensor-Gateway-02', ip: '192.168.1.103', firmwareVersion: '2.4.1', lastSeen: new Date().toISOString(), status: DeviceStatus.ONLINE, batteryLevel: 91, cpuUsage: 10, location: 'Warehouse B' },
];

const MOCK_FIRMWARE: Firmware[] = [
  { id: 'fw-001', version: '2.4.1', releaseDate: '2023-10-15', size: '4.2 MB', isSigned: true, signatureType: 'RSA-4096', hash: 'SHA256:8a...', status: 'DEPLOYED', description: 'Critical security patch.' },
  { id: 'fw-002', version: '2.4.0', releaseDate: '2023-09-01', size: '4.1 MB', isSigned: true, signatureType: 'RSA-4096', hash: 'SHA256:7b...', status: 'SIGNED', description: 'Feature release.' },
  { id: 'fw-003', version: '2.3.9', releaseDate: '2023-06-20', size: '4.0 MB', isSigned: true, signatureType: 'RSA-4096', hash: 'SHA256:6c...', status: 'DEPRECATED', description: 'Legacy stable.' },
];

const MOCK_ALERTS: Alert[] = [
  { id: 'a1', severity: 'CRITICAL', message: 'Unauthorized firmware flash attempt blocked on Camera-Perimeter-N', timestamp: new Date(Date.now() - 3600000).toISOString(), source: 'SecureBoot', acknowledged: false },
  { id: 'a2', severity: 'HIGH', message: 'Temp-Controller-X running outdated firmware with known CVE-2023-101', timestamp: new Date(Date.now() - 7200000).toISOString(), source: 'VersionCheck', acknowledged: false },
  { id: 'a3', severity: 'LOW', message: 'Sensor-Gateway-01 missed heartbeat check', timestamp: new Date(Date.now() - 14400000).toISOString(), source: 'HealthMonitor', acknowledged: true },
];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>('VIEWER');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data State
  const [devices, setDevices] = useState<Device[]>(MOCK_DEVICES);
  const [firmwareList, setFirmwareList] = useState<Firmware[]>(MOCK_FIRMWARE);
  const [alerts] = useState<Alert[]>(MOCK_ALERTS);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('VIEWER');
    setActiveTab('dashboard');
  };

  const handleDeployUpdate = (deviceId: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === deviceId) {
        return { ...d, status: DeviceStatus.UPDATING };
      }
      return d;
    }));
    // Simulate update completion
    setTimeout(() => {
      setDevices(prev => prev.map(d => {
        if (d.id === deviceId) {
          return { ...d, status: DeviceStatus.ONLINE, firmwareVersion: '2.4.1' };
        }
        return d;
      }));
    }, 5000);
  };

  const handleAddFirmware = (fw: Firmware) => {
    setFirmwareList([fw, ...firmwareList]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onLogout={handleLogout}
      userRole={userRole}
    >
      {activeTab === 'dashboard' && <Dashboard devices={devices} alerts={alerts} />}
      {activeTab === 'devices' && <DeviceList devices={devices} onDeploy={handleDeployUpdate} />}
      {activeTab === 'firmware' && <FirmwareManager firmwares={firmwareList} onAddFirmware={handleAddFirmware} />}
      {activeTab === 'security' && <SecurityAudit devices={devices} alerts={alerts} />}
      {activeTab === 'logs' && (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
           <p>Log interface is under maintenance.</p>
        </div>
      )}
    </Layout>
  );
};

export default App;