const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master process is running with PID: ${process.pid}, forking ${numCPUs} workers`);

    for (let i = 0; i < numCPUs; i++) {
            console.log(`Forking worker ${i + 1}/${numCPUs}`);
        cluster.fork();
    }

    cluster.on('fork', (worker) => {
        
    });

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Forking a new worker');
        cluster.fork();
    });
} else {
    require('./bin/www');
}