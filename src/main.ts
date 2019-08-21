import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
  try {

    var goEnvPath = await getGoPath()
    core.addPath(goEnvPath + "/bin")
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function getGoPath(): Promise<string> {
  var goEnvPath = ""
  var options = {
    listeners: {
      stdout: (data: Buffer) => {
        goEnvPath += data.toString();
      },
      silent: true,    
    }
  }
  var done =  exec.exec("go", ["env", "GOPATH"], options)
  var prom = new Promise<string>((resolve, reject) => {
    done.then(() => {
      resolve(goEnvPath.replace(/\r?\n|\r/g, ""))
    })
    done.catch((res) => {
      reject(res)
    })
  });

  return prom
}

run();
