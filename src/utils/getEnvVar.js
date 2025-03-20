import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultValue = null) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue !== null) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}

export default getEnvVar;