<template>
<el-container id="tableWidget">
    <!-- 筛选列表 -->
  <el-header class="tag-header">
        <div v-for="(i, j) in tags.tag" :key="j">
            <el-tag
              v-for="(tag, tag_index) in i"
              :key="tag_index"
              color="transparent"
              size="mini"
              class="tag"
              :class="tags.tagsIndex[j] == tag_index ? 'tagActive' : ''">
                <span @click="tagClick(j, tag_index)" >
                    {{tag.name + '(' + tag.number + ')'}}
                    <span style="display: none;">{{tags.tags_index}}</span>
                </span>
            </el-tag>
        </div>
    </el-header>

  <!-- 搜索栏 -->
  <el-header class="header" height="76px">
        <div v-for="(i, j) in search.search" :key="j">
            <div v-if="i.type == 'select'" style="display: flex">
                <el-select v-for="(selects, k) in i.selects" v-model="search.select[selects.model_name]" :placeholder="selects.placeholder" :key="k" value="">
                    <el-option
                      v-for="item in selects.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div v-if="i.type == 'date'" style="display: flex">
                <el-date-picker
                  v-for="(dates, k) in i.dates"
                  :key="k"
                  style="width: 200px;margin-top: 18px"
                  v-model="search.select[dates.model_name]"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div v-if="i.type == 'input'" style="display: flex">
                <el-input v-for="(inputs, k) in i.inputs" v-model="search.select[inputs.model_name]" :placeholder="inputs.placeholder" :key="k"></el-input>
            </div>
            <div v-if="i.type == 'button'">
                <el-button v-for="(buttons, k) in i.buttons" :key="k" :style="buttons.style">{{buttons.name}}</el-button>
            </div>
        </div>
    </el-header>

  <!-- 列表 list or table -->
  <el-main class="main">
        <el-table
          ref="multipleTable"
          :data="data"
          :stripe="true"
          :border="true"
          max-height="520"
          :row-style="{height:'40px'}"
          :header-row-style="{background: '#f2f4f7', height: '46px'}"
          @selection-change="handleSelectionChange"
          style="width: 100%">

              <!-- 复选框 -->
            <el-table-column
              v-if="checkboxShow"
              type="selection"
              :selectable="selectable"
              width="55">
            </el-table-column>

            <!-- thead -->
            <el-table-column v-for="(item, index) in thead"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth ? item.minWidth : 120"
              :fixed="item.fixed ? item.fixed : false">
            </el-table-column>

            <!-- 操作按钮栏 -->
            <el-table-column v-if="controButton.length>0"
              label="操作"
              min-width="200"
              fixed="right">
                <template slot-scope="scope">
                    <!-- popOver 提示框 -->
                    <div class="controButton"  v-for="(item, index) in controButton" :key="index" @click="item.fn(scope)" :style="{color:''}" >
                        <el-popover
                            ref="popover"
                            placement="left-start"
                            trigger="hover">
                            <div class="popOver" v-if="item.popOver">
                                <div class="title">
                                    {{item.popOver.title}}
                                </div>
                                <div class="info">
                                    <div class="info-1">
                                        <p>房源信息</p>
                                        <div>
                                            <div>
                                                <p>房源编号：</p>
                                                <div>{{item.popOver.info.no}}</div>
                                            </div>
                                            <div>
                                                <p>户型：</p>
                                                <div>{{item.popOver.info.model}}</div>
                                            </div>
                                            <div>
                                                <p>楼层：</p>
                                                <div>{{item.popOver.info.floor}}</div>
                                            </div>
                                            <div>
                                                <p>朝向面积：</p>
                                                <div>{{item.popOver.info.area}}</div>
                                            </div>
                                            <div>
                                                <p>出租价格：</p>
                                                <div>{{item.popOver.info.price}}</div>
                                            </div>
                                            <div>
                                                <p>房屋特色：</p>
                                                <div>{{item.popOver.info.characteristic}}</div>
                                            </div>

                                            <div>
                                                <p>截止日期：</p>
                                                <div>{{item.popOver.info.lateDate}}</div>
                                            </div>
                                            <div>
                                                <p>房源负责人：</p>
                                                <div>{{item.popOver.info.people}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p>房源状态</p>
                                        <div>
                                            <p>出租状态：</p>
                                            <div>{{item.popOver.state}}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p>租约信息</p>
                                        <div>
                                            <p>空置情况：</p>
                                            <div>{{item.popOver.msg}}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p>房源备注</p>
                                        <div>
                                            <div>{{item.popOver.remarks}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span slot="reference">{{item.name}}</span>
                        </el-popover>

                    </div>
                </template>
            </el-table-column>

        </el-table>

    </el-main>
     <el-footer class="footer block" height="50px">

           <el-row>
               <!-- 控制按钮 -->
               <!--<el-col :span="10"><div class="grid-content bg-purple">-->
                   <!--<el-checkbox @change="toggleSelection(data)" v-if="checkboxShow"></el-checkbox>-->
                   <!--<el-button type="small" @mouseover="popOver">批量通过</el-button>-->
                   <!--<el-button type="small">批量拒绝</el-button>-->
                   <!--<el-button type="small">批量上架</el-button>-->
                   <!--<el-button type="small">批量下架</el-button>-->
                   <!--<el-button type="small" @click="toggleSelection([tableData[1], tableData[2]])">切换第三</el-button>-->
                   <!--<el-button type="small" @click="toggleSelection()">取消选择</el-button>-->
               <!--</div></el-col>-->
               <!-- 分页器 -->
               <el-col :span="14"><div class="grid-content bg-purple-light">
                   <el-pagination
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[100, 200, 300, 400]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="400">
                   </el-pagination>
               </div></el-col>
           </el-row>

       </el-footer>

</el-container>
</template>

<script>
export default {
  name: "TableWidget",
  props: {
    tableOption: {
        type: Object,
        default: {
            tags:  [],
            thead: [],
            controButton: [],
            data: [],
            search: [],
            selectAll: false
        },
        required: true
    }
  },
  data() {

    return {
        //tag 为筛选列表标签
        tags: {
            tag: [],
            tags_index:0,
            tagsIndex:[0, 0],
        },
        search:{
            search: [],
            select: {},
        },
        table: {
        },
      thead: [],
      controButton: [],
      data: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 是否显示复选框
      checkboxShow: false,
      multipleSelection: [],
      selectAll: false, // 全选 or 全不选

    };
  },
  methods: {
    // tag 点击事件
    tagClick (index, tag_index) {
        this.tags.tagsIndex[index] = tag_index;
        this.tags.tags_index = tag_index;
        alert("触发了tagClick事件！")
    },
    alertA(){
      alert(123);
    },
    // table删出事件
    deleteRow(index, rows) {
      console.log(index, rows);
      rows.splice(index, 1);
    },
    popOver(index, rows) {
      console.log(index, rows);
    },
    // table多选
    toggleSelection(rows) {
        //  根据当前状态， 决定是否全选
        if (!this.selectAll) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row, "selected");
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
        this.selectAll = !this.selectAll;
    },
    // 当table复选框发生变化时触发此函数
    handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      // this.selectAll
    },
    // 返回一个 多选框 的状态（是否可用）
    selectable(row, index) {
      // console.log(row, index)
      return true;
    },

    //分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    const { tableOption } = this.$props;
    // tag筛选
    if (tableOption && tableOption.tags) {
      this.tags.tag = tableOption.tags;
    }
    // 输入框 下拉框
    if (tableOption && tableOption.search) {
      this.search.search = tableOption.search;
    }

    // table
    if (tableOption && tableOption.table.thead) {
      this.thead = tableOption.table.thead;
    }
    if (tableOption && tableOption.table.controButton) {
      this.controButton = tableOption.table.controButton;
    }
    if (tableOption && tableOption.table.tbody) {
      this.data = tableOption.table.tbody;
    }
    if (tableOption && tableOption.data) {
      this.selectAll = tableOption.selectAll;
    }
  }
};
</script>

<style scoped lang="scss">
.el-tag--mini {
  line-height: 20px;
}
#tableWidget {
  overflow: hidden;
  background: #f2f3f5;
}

#tableWidget > .header,
#tableWidget > .main,
#tableWidget > .footer {
  background: #fff;
}
.header{
    display: flex;
    justify-content: space-around;
    /deep/ div{
        padding: 0;
        margin:0;
        flex:10;
    }
    /deep/ input {
        padding: 0;
        margin:0;
        text-indent: 2em;
    }
    /deep/ .el-range-input{
        text-indent: 0em;
    }
    /deep/ &>div:last-child{
        flex:6;
    }
}
.controButton{
  float: left;
  margin-left:10px;
  color: #ed0536;
  cursor: pointer;
}

/* 搜索栏 */
#tableWidget > .header {
  line-height: 76px;
}
.header /deep/ .grid-content input{
}
.header /deep/ .grid-content button{
    border-radius: 0;
}
.header /deep/ .grid-content button span{
    font-size: 14px;
}

/* list or table */
#tableWidget > .main {
  margin-top: 14px;
}

/* tag标签 */
.tag {
  border: 0;
  color: #999;
  cursor: pointer;
}
.tag:hover {
  color: red;
}
.tagActive {
  color: red;
}

.tag-header {
  margin: 0 0 20px 0;
  padding: 0px;
  height: 20px !important;
  display: flex;
}
.tag-header:empty {
  display: none;
}

/* 滑动查看 弹出框 */
.popOver{
    width: 400px;
    background: #fff;
    padding-bottom: 20px;
    .title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e6e6e6;
        font-size: 16px;
        /*background: #f8f9fd;*/
    }
    .info{
        height: auto;
        margin:10px auto;
        &>div{
            padding-bottom: 20px;
        }
        &>div:nth-child(1)>div{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding: 10px 0;
            border-bottom: 1px dashed #ddd;
            &>div{
                display: flex;
                width: 100%;
                margin:5px 0;
                &>p{
                    width: 80px;
                    text-align: right;
                    color: #919191;
                }
                &>div{
                    color: #000;
                }
            }
        }
        &>div:not(:nth-child(1))>div{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            padding:10px 0;
            border-bottom: 1px dashed #ddd;
            &>p{
                width: 80px;
                text-align: right;
                color: #999;
            }
            &>div{
                padding: 0;
                color: #000;
            }
        }
        &>div>p{
            width: 100%;
            text-indent: 1em;
            font-size:16px;
        }
        &>div:last-child>div{
            text-indent: 2em;
            border-bottom: 0;
        }
    }
}
.el-main{
  min-height: 385px;
  overflow: hidden;
}
.footer{
  margin-top: 20px;
  line-height: 50px;
  overflow: hidden;
  background: #f9f9f9 !important;
  position: fixed;
  width: 89.7%;
  bottom: 0;
  .el-col{
    width: auto;
    float: right;
  }
}
.footer .el-pagination{
  margin-top: 10px;
}
</style>
