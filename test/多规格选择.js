
class Table{
    len = 0
    tableData = []
    thead = []

    constructor(vertx) {
        this.thead = vertx;
        this.len = this.thead.length;
        this.tableData = [];
        this.init()
    }

    init () {
        this.tableData = this.thead.map(a => Array(this.len).fill(0));
    }

    setAdjacentDataById (id, data){
        const rowIndex = this.thead.indexOf(id)
        data.forEach((a) => {
            const colIndex = this.thead.indexOf(a);
            this.tableData[rowIndex][colIndex] = 1
        })
    }

    getCol (id) {
        const rowIndex = this.thead.indexOf(id)
        const data = this.tableData[rowIndex]
        return data
    }

    getColByArr (arr) {
        return arr.map(a => this.getCol(a))
    }

    getColTotal(arr){
        const res = []
        arr.forEach(a => {
            a.forEach((b, i) => {
                if(!res[i]) res[i] = []
                res[i].push(b)
            })
        })
        return res.map(a => {
            let v = [...new Set(a)]
            return v.length === 1 && v[0] === 1
        })
    }

    getSelect (arr) {
        const colArr = this.getColByArr(arr)
        return this.getColTotal(colArr)
    }
}

function init(){
    const specList = [
        { title: "颜色", list: ["红色", "紫色"] },
        { title: "套餐", list: ["套餐一", "套餐二"] },
        { title: "内存", list: ["64G", "128G", "256G"] },
    ]
    const specCombinationList = [
        { id: "1", specs: ["紫色", "套餐一", "64G"] },
        { id: "2", specs: ["紫色", "套餐一", "128G"] },
        { id: "3", specs: ["紫色", "套餐二", "128G"] },
        { id: "4", specs: ["红色", "套餐二", "256G"] }
    ]

    const rowTitle = specList.reduce((s,a) => s.concat(a.list), [])
    const table = new Table(rowTitle)
    // console.log(table.tableData)
    //设置 可选规格列表specCombinationList 对应点为1
    specCombinationList.forEach(a => {
        a.specs.forEach(b => {
            table.setAdjacentDataById(b, a.specs)
        })
    })
    // console.log(table.tableData)
    function test (arr) {
        console.log(
            arr,
            table.getSelect(arr).reduce((s,v,i) => {
                if(v) s.push(table.thead[i])
                return s
            }, [])
        );
    }
    console.log( test([table.thead[2], table.thead[4]]) );
}

init()
