const DOMReady = (callback) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback)
    } else {
        callback()
    }
}

export default DOMReady;
