export const generateArrClues = (array) => {
    function getArrCurl(arr) {
        const resAaa = [];
        for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            const x = [0];
            el.forEach((t) => {
                if (t === 1) {
                    x[x.length - 1] += 1;
                } else {
                    x.push(0);
                }
            });
            resAaa.push(x.filter((item) => item));
        }
        let lengthVert = 0;
        for (let i = 0; i < resAaa.length; i++) {
            if (resAaa[i].length > lengthVert) {
                lengthVert = resAaa[i].length;
            }
        }
        for (let i = 0; i < resAaa.length; i++) {
            if (resAaa[i].length < lengthVert) {
                const d = lengthVert - resAaa[i].length;
                for (let j = 0; j < d; j++) {
                    resAaa[i].unshift(0);
                }
            }
        }
        return resAaa;
    }

    function revolutionArr(arr) {
        const arrRevers = [];
        const arrReversFill = [];
        for (let i = 0; i < arr.length; i++) {
            arrRevers.push(new Array(arr[0].length).fill(0));
            for (let j = 0; j < arr[0].length; j++) {
                arrRevers[i][j] = arr[j][i];
            }
        }
        const wertArr = getArrCurl(arrRevers);
        for (let i = 0; i < wertArr[0].length; i++) {
            arrReversFill.push(new Array(arr[0].length).fill(0));
            for (let j = 0; j < arr[0].length; j++) {
                arrReversFill[i][j] = wertArr[j][i];
            }
        }
        return arrReversFill;
    }

    return { gorizontalArrClues: revolutionArr(array), verticalArrClues: getArrCurl(array) };
};
