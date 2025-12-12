import { GoogleGenAI } from "@google/genai";
import { Alert, Device } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simulates analyzing raw logs and device states to find vulnerabilities
export const analyzeSecurityPosture = async (devices: Device[], recentAlerts: Alert[]): Promise<string> => {
  const model = "gemini-2.5-flash";
  
  const systemContext = `
    You are a Senior IoT Security Analyst AI.
    Analyze the following fleet status and alerts for a Secure Firmware Update System.
    Identify potential security breaches, rollback attacks, or unsigned firmware attempts.
    
    Device Count: ${devices.length}
    Vulnerable Devices: ${devices.filter(d => d.status === 'VULNERABLE' || d.status === 'COMPROMISED').length}
    
    Recent Alerts:
    ${recentAlerts.map(a => `- [${a.severity}] ${a.message} (${a.timestamp})`).join('\n')}
  `;

  const prompt = `
    Based on the context above, provide a concise security summary (max 200 words). 
    Highlight immediate risks specifically related to firmware integrity, secure boot failures, or communication interceptions.
    Suggest 3 actionable remediation steps.
    Output in Markdown format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { text: systemContext },
        { text: prompt }
      ]
    });
    return response.text || "Unable to generate analysis.";
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return "AI Analysis unavailable due to connection error.";
  }
};

// Generates a compliance checklist mapping
export const generateComplianceMap = async (standard: 'NIST' | 'GDPR' | 'ISO27001'): Promise<string> => {
  const model = "gemini-2.5-flash";
  const prompt = `
    Generate a checklist for an IoT Firmware Update Mechanism to ensure compliance with ${standard}.
    Focus on:
    1. Secure Boot
    2. Code Signing
    3. Update Verification
    4. Audit Logging
    
    Format as a markdown list with checkboxes.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt
    });
    return response.text || "No compliance data generated.";
  } catch (error) {
    console.error("Gemini Compliance Failed:", error);
    return "Compliance mapping unavailable.";
  }
};