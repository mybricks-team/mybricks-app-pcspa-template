const originalLocalGetItem = localStorage.getItem;
export const proxLocalStorage = (mockConfig = []) => {
    localStorage.getItem = function (key) {

        const mockData = mockConfig?.localStorageMock
        const data = getCheckedMockDataMap(mockData)
        if (key in data) {
            return data[key]
        }
        return originalLocalGetItem.apply(this, arguments);
    };

    return () => {
        localStorage.getItem = originalLocalGetItem
    }
}

const originSessionGetItem = sessionStorage.getItem
export const proxSessionStorage = (mockConfig = {}) => {
    sessionStorage.getItem = function (key) {
        const mockData = mockConfig?.sessionStorageMock
        const data = getCheckedMockDataMap(mockData)
        if (key in data) {
            return data[key]
        }
        return originSessionGetItem.apply(this, arguments);
    };

    return () => {
        sessionStorage.getItem = originSessionGetItem
    }
}

export const getCheckedMockDataMap = (originMockData = []) => {
    return originMockData.reduce((res, item) => {
        const { key, value, checked } = item
        if (checked) {
            res[key] = value
        }
        return res
    }, {})
}