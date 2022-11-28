import {signal} from "@/SignalConfig/index";

const loadSignal_SEARCH = function (self,text,state){
    /*
    * @param: self 函数this作用域
    * @param: text 加载文本
    * @param: state loading状态
    * */
    let load = {
        text:text,
        state:state
    }
    self.globalEmit.$emit(signal.SEARCH,load)
}
export {loadSignal_SEARCH}