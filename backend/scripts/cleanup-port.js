const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const PORT = process.env.PORT || 5000;

async function killPort() {
    try {
        console.log(`Checking for processes on port ${PORT}...`);

        // Find processes using the port
        const { stdout } = await execAsync(`netstat -ano | findstr :${PORT}`);

        if (stdout) {
            // Extract PIDs
            const lines = stdout.trim().split('\n');
            const pids = new Set();

            lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];
                if (pid && !isNaN(pid)) {
                    pids.add(pid);
                }
            });

            // Kill each process
            for (const pid of pids) {
                try {
                    await execAsync(`taskkill /PID ${pid} /F`);
                    console.log(`✓ Killed process ${pid}`);
                } catch (err) {
                    console.log(`  Could not kill process ${pid} (may require admin rights)`);
                }
            }
        } else {
            console.log(`✓ Port ${PORT} is free`);
        }
    } catch (error) {
        // Port is free (netstat returns error if nothing found)
        console.log(`✓ Port ${PORT} is free`);
    }
}

killPort();
