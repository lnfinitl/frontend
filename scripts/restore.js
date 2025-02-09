const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const BACKUP_DIR = path.join(__dirname, '../backups');

function getLatestBackup() {
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.startsWith('frontend_'))
    .sort()
    .reverse();
  
  return files[0];
}

function restore(backupFile) {
  try {
    console.log(`Restoring from backup: ${backupFile}`);
    
    // Extract backup
    execSync(`tar -xzf ${path.join(BACKUP_DIR, backupFile)} -C ${process.cwd()}`);
    
    // Install dependencies
    console.log('Installing dependencies...');
    execSync('npm install');
    
    console.log('Restore completed successfully!');
  } catch (error) {
    console.error('Restore failed:', error.message);
    process.exit(1);
  }
}

// Get backup file from command line or use latest
const backupFile = process.argv[2] || getLatestBackup();
if (!backupFile) {
  console.error('No backup file found!');
  process.exit(1);
}

restore(backupFile);