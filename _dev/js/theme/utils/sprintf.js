
const sprintf = ( str, ...args ) => {
    let i = 0;

    return str.replace(/%s/g, () =>  args?.[i++] || '')
}


export default sprintf;
