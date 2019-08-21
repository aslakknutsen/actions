"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var goEnvPath = yield getGoPath();
            var goEnvBin = goEnvPath + "/bin";
            core.exportVariable("GOPATH", goEnvPath);
            core.exportVariable("GOBIN", goEnvBin);
            core.addPath(goEnvBin);
            yield exec.exec("mkdir -p " + goEnvPath + "/pkg");
            yield exec.exec("mkdir -p " + goEnvBin);
            console.log("##[cd]" + goEnvPath);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function getGoPath() {
    return __awaiter(this, void 0, void 0, function* () {
        var goEnvPath = "";
        var options = {
            listeners: {
                stdout: (data) => {
                    goEnvPath += data.toString();
                },
                silent: true,
            }
        };
        var done = exec.exec("go", ["env", "GOPATH"], options);
        var prom = new Promise((resolve, reject) => {
            done.then(() => {
                resolve(goEnvPath.replace(/\r?\n|\r/g, ""));
            });
            done.catch((res) => {
                reject(res);
            });
        });
        return prom;
    });
}
run();
