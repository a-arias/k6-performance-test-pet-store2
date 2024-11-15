# k6-http-pet-store-api

### Overview

This repository contains k6 performance test scripts for the Swagger Pet store project. These scripts are designed to evaluate the performance of various API endpoints under different conditions. The tests measure response times, error rates, and other performance metrics.

### Prerequisites

To run the k6 test scripts, you need to have k6 installed on your machine. You can install k6 using one of the following methods:

Install k6 with Homebrew (macOS)
```bash
brew install k6
```
Install k6 with APT (Debian/Ubuntu)
```bash
sudo apt update
sudo apt install k6
```
Install k6 with Chocolatey (Windows)
```bash
choco install k6
```

For other installation methods, visit the k6 installation guide.

### running the tests
```bash
k6 run inventoryPerformanceTests.js --out json=results.json 
```

```bash
k6 run petPerformanceTests.js --out json=results.json 
```

```bash
k6 run userPerformanceTests.js --out json=results.json 
```