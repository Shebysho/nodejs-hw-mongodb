import fs from 'node:fs/promises';
import path from 'path';

export const createDirIfNotExists = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fs.mkdir(dirPath, { recursive: true });
      } catch (mkdirError) {
        console.error(`Error creating directory ${dirPath}:`, mkdirError);
        throw mkdirError;
      }
    } else {
      console.error(`Error accessing directory ${dirPath}:`, error);
      throw error;
    }
  }
};