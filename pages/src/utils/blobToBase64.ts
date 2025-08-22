export function blobToBase64(blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const a = new FileReader();
      a.onload = (e) => {
        resolve(e.target.result);
      };
      a.onerror = (e) => {
        reject(e);
      };
      a.readAsDataURL(blob);
    });
  }