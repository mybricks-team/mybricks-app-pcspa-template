const createAsyncScript = (src: string, attributes: Record<string, any> = {}) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    for (const [key, value] of Object.entries(attributes)) {
        script.setAttribute(key, value)
    }
    return script;
}
export const requireScript = (src: string) => {
    return new Promise((resolve, reject) => {
        const styles: Array<HTMLStyleElement> = [];
        const headAppendChild = document.head.appendChild;
        document.head.appendChild = (ele: any) => {
            if (ele && ele.tagName?.toLowerCase() === 'style') {
                styles.push(ele)
            }
            return headAppendChild.call(document.head, ele)
        }
        const script = createAsyncScript(src);
        document.body.appendChild(script);
        script.onload = () => {
            resolve({styles})
            document.head.appendChild = headAppendChild;
        }
        script.onerror = (error) => {
            reject(error)
            document.head.appendChild = headAppendChild;
        }
        
    })
   
}