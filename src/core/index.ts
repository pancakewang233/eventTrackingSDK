import { DefaultOptions, TrackerConfig, Options } from "../types/index";
export default class Tracker {
    public data: Options;
    constructor (options: Options){
        this.data = Object.assign(this.initDef(), options)
    }

    private initDef(): DefaultOptions{
        return <DefaultOptions>{
            sdkVersion: TrackerConfig.version,
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            jsError: false
        }
    }
}