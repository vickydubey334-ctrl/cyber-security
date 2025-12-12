export enum DeviceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  UPDATING = 'UPDATING',
  VULNERABLE = 'VULNERABLE',
  COMPROMISED = 'COMPROMISED'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  VIEWER = 'VIEWER'
}

export interface Device {
  id: string;
  name: string;
  ip: string;
  firmwareVersion: string;
  lastSeen: string;
  status: DeviceStatus;
  batteryLevel: number;
  cpuUsage: number;
  location: string;
}

export interface Firmware {
  id: string;
  version: string;
  releaseDate: string;
  size: string;
  isSigned: boolean;
  signatureType: 'RSA-4096' | 'ECC-P256' | 'NONE';
  hash: string;
  status: 'DRAFT' | 'SIGNED' | 'DEPLOYED' | 'DEPRECATED';
  description: string;
}

export interface Alert {
  id: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: string;
  source: string;
  acknowledged: boolean;
}

export interface SecurityScanResult {
  timestamp: string;
  score: number;
  findings: string[];
  recommendations: string;
  compliant: boolean;
}