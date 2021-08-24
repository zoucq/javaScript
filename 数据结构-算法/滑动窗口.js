
function init2(s) {
    const map = new Map()
    let max = 0, left = 0
    for(let i = 0; i < s.length; i++){
        if(map.get(s[i]) !== undefined){
            left = Math.max(left, map.get(s[i]) + 1)
        }
        map.set(s[i], i)
        max = Math.max(max, i - left + 1)
    }
    console.log(max)
    return max
}


function init(s){
    let l = 0, r = 0, res = '', total = 0, arr = []
    while( r < s.length){
        res += s[r]
        l = r + 1
        while( !res.includes(s[l]) && l < s.length ){
            res += s[l]
            l++
        }
        // arr.push(res)
        total = Math.max(res.length, total)
        res = ''
        r++
    }
    console.log(total, arr)
    return total
}


const li = ['abcabcbb', 'bbbbb', 'pwwkew', 'dfdk']
init(li[3])
init2(li[3])
