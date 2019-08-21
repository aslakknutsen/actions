import * as core from '@actions/core';

async function run() {
  try {
    core.addPath("$(go env GOPATH)/bin")
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
