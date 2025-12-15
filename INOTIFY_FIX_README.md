# Fix for "OS file watch limit reached" Error

## Problem
When running `npm run dev`, you encounter the error:
```
FATAL: An unexpected Turbopack error occurred. OS file watch limit reached.
```
or with webpack:
```
Watchpack Error (watcher): Error: ENOSPC: System limit for number of file watchers reached
```

## Root Cause
Your project has 63,353 files, which is very close to the Linux system's inotify watch limit of 65,536. Development servers (Turbopack and Webpack) need to watch files for changes, and the limit is being exceeded.

## Solutions

### Solution 1: Increase System Inotify Limits (Recommended)
Run the provided script with sudo to permanently increase the limits:

```bash
sudo bash increase_inotify_limit.sh
```

This will:
- Increase `fs.inotify.max_user_watches` from 65,536 to 524,288
- Increase `fs.inotify.max_user_instances` from 128 to 512
- Make the changes permanent in `/etc/sysctl.conf`

After running the script, restart your development server:
```bash
npm run dev
```

### Solution 2: Use Polling Instead of File Watching (No sudo required)
If you cannot use sudo, you can configure webpack to use polling instead of native file watching:

```bash
USE_POLLING=true npm run dev
```

This is slightly less efficient but avoids the inotify limit entirely.

### Solution 3: Clean Up Unnecessary Files
You can reduce the number of files being watched by:
1. Clearing `.yarn/cache` directory (if safe)
2. Removing unnecessary files from the project
3. Excluding more directories from watching

## What We've Already Configured

1. **Switched from Turbopack to Webpack**: The `dev` script now uses `--webpack` flag
2. **Excluded unnecessary directories**: Configured webpack to ignore:
   - `node_modules/**`
   - `.yarn/cache/**`
   - `.git/**`
   - `.next/**`
3. **Added polling option**: Set `USE_POLLING=true` environment variable to enable polling

## Verification

After applying Solution 1, verify the new limits:
```bash
sysctl fs.inotify.max_user_watches
sysctl fs.inotify.max_user_instances
```

You should see:
```
fs.inotify.max_user_watches = 524288
fs.inotify.max_user_instances = 512
```

## Files Created

1. `increase_inotify_limit.sh` - Script to increase system limits (requires sudo)
2. `webpack-polling.config.js` - Alternative webpack configuration for polling
3. `INOTIFY_FIX_README.md` - This documentation

## Notes
- The dev server is already configured to use webpack instead of Turbopack
- If you still encounter issues after increasing limits, try the polling option
- For long-term maintenance, consider reducing the project size or moving to a monorepo structure