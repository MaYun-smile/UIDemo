export function PostChange() {
    return {
        type: 'CHANGED',
    };
}
export function logined(userinfo) {
    console.log(userinfo);
    return {
        type: 'LOGINED',
        userinfo,
    };
}
export function logouted() {
    return {
        type: 'LOGOUTED',
    };
}
export function openform(formKey, oid) {
    return {
        type: 'OPENFORM',
        formKey,
        oid,
    };
}
export function openClientForm(formKey, oid, status) {
    return {
        type: 'OPENCLIENTFORM',
        formKey,
        oid,
        status,
    };
}
export function openWorkitem(wid,onlyShow,loadInfo) {
    return {
        type: 'OPENWORKITEM',
        wid,
        onlyShow,
        loadInfo,
    };
}
export function closeform() {
    return {
        type: 'CLOSEFORM',
    };
}
export function workflowchange() {
    return {
        type: 'WORKFLOWCHANGE',
    };
}
export function error(err) {
    return {
        type: 'ERROR',
        error: err.error || err,
    };
}
export function warn(err) {
    return {
        type: 'WARN',
        error: err.error || err,
    };
}
export function changeuser(userinfo) {
    return {
        type: 'CHANGEUSER',
        userinfo,
    };
}

export function changeBusyLoading(busyLoading) {
    return {
        type: 'BUSYLOADING',
        busyLoading,
    };
}

export function pauseBusyLoading() {
    return {
        type: 'PAUSEBUSYLOADING',
    };
}

export function resumeBusyLoading() {
    return {
        type: 'RESUMEBUSYLOADING',
    };
}

export function reloadForm(key) {
    return {
        type: 'RELOADFORM',
        key,
    };
}
