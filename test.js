/// -------------------------------------------------
/// _fun_report_form.js : 打印报表视图控件
/// -------------------------------------------------

////////////////////////////////////////////
///             入口说明
////////////////////////////////////////////
/// _getType : 获得报表的类别
/// 调用前需要设置数据集的'模型'
////////////////////////////////////////////
/// _getSupp : 获得报表的供应商
/// 调用前需要设置数据集的'模型'
////////////////////////////////////////////
/// _getTable : 获得报表的的表格
/// 调用前需要设置数据集的'模型'
////////////////////////////////////////////

/****************************************************
 _getType : 获得报表的类别
 ****************************************************/
/**
 * @description 获得报表的类别
 * @param {typeDdvName}  optDdvName 操作数据集名
 */
function _getType(typeDdvName)
{
    if (typeof(typeDdvName) == "undefined") return;
    if (Object.prototype.toString.call(typeDdvName) != "[Object String]") return;
    
    /// 绑定列表数据集事件
    $ddv(typeDdvName).bind("add", function(local, name, view, data, para)
    {
        if (!data.length) return;
        var html = '';
        for (var i =0; i < data.length; ++i)
        {
            html += '<li>' + data[i].thisTypeName + '</li>';
        }
        $('.getType').html(html);
    })
    .bind("clear", function(local, name, view, data, para)
    {
        view.empty();
    });
}

/****************************************************
 _getSupp : 获得报表的供应商
 ****************************************************/
/**
 * @description 获得报表的类别
 * @param {typeDdvName}  optDdvName 操作数据集名
 */
function _getSupp(typeDdvName)
{
    if (typeof(typeDdvName) == "undefined") return;
    if (Object.prototype.toString.call(typeDdvName) != "[Object String]") return;
    
    /// 绑定列表数据集事件
    $ddv(typeDdvName).bind("add", function(local, name, view, data, para)
    {
        if(data.length <= 0) return;
            var view = $('.rowRight');
            /// 在添加内容前先清除高度属性，以获得自动高度
            var viewAttr = view.attr("style");
            if (typeof(viewAttr) != "undefined")   
            {
               view.attr("style", viewAttr.replace(/height.*;/g,'')); 
            }

            var html = '';
            for (var i = 0; i < data.length; ++i) 
            {
                html += '<li>' + data[i].msSupplier + '</li>';
            }
            $('.getSupp').append(html);
            
            /// $(".getSupp").parent().css('display','block');
            /// 清除原始高度属性，并设置为一行高度
            var oldHeight = view.height();
            view.attr("oldHeight", oldHeight);
            
            /// 显示或者隐藏折叠箭头
            if (oldHeight > LIST_HEIGHT_MAX)
            {
                view.height(LIST_HEIGHT_MAX);
                view.parent().find('.angleDown').css('display','block');
            }
            else
            {
                view.parent().find('.angleDown').css('display','none');
            }
    })
    .bind("clear", function(local, name, view, data, para)
    {
        view.empty();
    });
}

/****************************************************
 _getTable : 获得报表的统计表
 ****************************************************/
/**
 * @description 获得报表的统计表
 * @param {tableDdvName}  tableDdvName 操作数据集名
 */
function _getTable(tableDdvName){
    if (typeof(tableDdvName) == "undefined") return;
    if (Object.prototype.toString.call(tableDdvName) != "[Object String]") return;
    
    /// 绑定列表数据集事件
    $ddv(tableDdvName).bind("add", function(local, name, view, data, para)
    {
        if (!data.length) return;
        
        /// 组装数据列表
        var html = '';
        /// 获取业主的全称
        var compObj = $ddv('header_company').row(0);
        var compStr = (typeof(compObj) == "undefined")? "" : compObj.name;
        
        html += '<table border="1">';
        html += _fun_list_getFieldName(local.model().list_field);
        for (var i =0; i < data.length; ++i)
        {
            html += _fun_list_getFieldValue(data[i], i);
        }
        html += '</table>';
        $('.getType').html(html);
        $('.sty_toptTime').append('<a href="#">' + compStr + '</a>');
        $('.sty_timeType').append('<div>物料种类:<a href="">空白卷膜</a></div><div style="float: right;">统计时间段:<a href="#">2016-8-24至2016-8-25</a></div>');
    })
    .bind("clear", function(local, name, view, data, para)
    {
        view.empty();
    });
}

/****************************************************
 _fun_list_getFieldName : 获得报表的头部的字段
 ****************************************************/
/**
 * @description 获得报表的统计表
 * @param {fields}  fields 表格的字段数据集名
 */
function _fun_list_getFieldName(fields)
{
    var html = '';
    ////////////////////////////////////////
    /// 获取表格的表头的数据集
    ////////////////////////////////////////
    for (var i = 0; i < fields.length; ++i)
    {
        var name = fields[i].name;
        html += '<tr><th>' + name + '</th></tr>';
    }
    return html;
}

/****************************************************
 _fun_list_getFieldValue : 获得报表的头部的字段
 ****************************************************/
/**
 * @description 获得报表的统计表
 * @param {dataValue}  dataValue 操作数据集名
 * @param {index}  index 序号
 */
function _fun_list_getFieldValue(dataValue, index)
{
    if (!dataValue.length) return;
    var html = '';
    
    ////////////////////////////////////////
    /// 组装表格数据集的信息，进行拼装
    ////////////////////////////////////////
    for (var i = 0; i < dataValue.length; ++i)
    {
        var time = dataValue[i].date;
        html += '<tr><td>' + time + '</td><td>' + index + '</td><td>' 
             + dataValue[i].matName + '</td><td>' + dataValue[i].spec1 + '</td><td>' 
             + dataValue[i].spec2 + '</td><td>' + dataValue[i].weight + '</td><td>' + dataValue[i].number 
             + '</td><td>' + dataValue[i].allweight + '</td><td>' + dataValue[i].price 
             + '</td><td>' + dataValue[i].rate + '</td><td>' + dataValue[i].money + '</td></tr>';
    }
    return html;
}
