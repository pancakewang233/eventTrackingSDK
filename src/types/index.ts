export interface DefaultOptions {
    uuid: string | undefined,
    // 接口地址
    requestUrl: string | undefined,
    // history上报
    historyTracker: boolean,
    // hash上报
    hashTracker: boolean,
    // 携带 Tracker-key 点击事件上报
    domTracker: boolean,
    // sdk版本
    sdkVersion: string | number,
    // 透传字段
    extra: Record<string, any> | undefined,
    // js 和 promise 报错异常上报
    jsError: boolean
}

export interface Options extends Partial<DefaultOptions>{
    requestUrl: string
}

export enum TrackerConfig {
    version = '1.0.0'
}