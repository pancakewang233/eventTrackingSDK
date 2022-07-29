import { DefaultOptions, TrackerConfig, Options } from "../types/index";
import { createHistoryEvent } from "../utils/pv";

export default class Tracker {
    public data: Options;
    constructor (options: Options){
        this.data = Object.assign(this.initDef(), options)
        this.installTracker()
    }

    private initDef(): DefaultOptions{
        window.history['pushState'] = createHistoryEvent('pushState')
        window.history['replaceState'] = createHistoryEvent('replaceState')
        return <DefaultOptions>{
            sdkVersion: TrackerConfig.version,
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            jsError: false
        }
    }

    private captureEvents <T>(mouseEventList: string[], targetKey: string, data?: T){
        mouseEventList.forEach(event =>{
            window.addEventListener(event, ()=>{
                console.log('监听到了')
                this.reportTracker({
                    event,
                    targetKey,
                    data
                })
            })
        })
    }

    public sendTracker <T>(data: T) {
        this.reportTracker(data)
    }

    public setUserId <T extends DefaultOptions['uuid']>(uuid: T){
        this.data.uuid = uuid
    }

    public setExtra <T extends DefaultOptions['extra']>(extra: T){
        this.data.extra = extra
    }

    private installTracker () {
        if(this.data.historyTracker){
            this.captureEvents(['pushState', 'replaceState', 'popstate'], 'history-pv')
        }
        if(this.data.hashTracker){
            this.captureEvents(['hashchange'], 'hash-pv')
        }
    }

    private reportTracker <T>(data: T) {
        const params = Object.assign(this.data, data, {time: new Date().getTime()})

        let headers = {
            type: 'application/x-www-form-urlencoded'
        }
        let blob = new Blob([JSON.stringify(params)], headers)
        navigator.sendBeacon(this.data.requestUrl, blob)
    }
}