import fs from 'fs/promises';
import path from 'path';
import { DB } from './types';

// Simplified UUID generator using Math.random for local development
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const originalDbPath = path.join(process.cwd(), 'data', 'db.json');
const dbPath = process.env.VERCEL
    ? path.join('/tmp', 'db.json')
    : originalDbPath;

async function ensureDbExists() {
    if (process.env.VERCEL) {
        try {
            await fs.access(dbPath);
        } catch {
            // Copy from original to /tmp
            const content = await fs.readFile(originalDbPath, 'utf-8');
            await fs.writeFile(dbPath, content, 'utf-8');
        }
    }
}

export async function getDB(): Promise<DB> {
    try {
        await ensureDbExists();
        const fileContent = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(fileContent) as DB;
    } catch (error) {
        console.error('Failed to read database:', error);
        throw new Error('Database read error');
    }
}

export async function saveDB(data: DB): Promise<void> {
    try {
        await ensureDbExists();
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to write database:', error);
        throw new Error('Database write error');
    }
}
