<template>
  <el-container id="tableWidget">

    <!-- tags -->
    <el-header class="tag-header">
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        color="transparent"
        size="mini"
        class="tag">
        {{tag.name + '(' + tag.number + ')'}}
      </el-tag>
    </el-header>

    <!-- 搜索栏 -->
    <el-header class="header" height="76px">
      <el-row :gutter="20">
        <el-col :span="22" style="padding-right: 0">
          <el-input placeholder="角色名称" id="header_input"></el-input>
        </el-col>
        <el-col :span="2" style="padding: 0">
          <el-button type="danger" style=" background: #ed0536">搜索</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-row :gutter="5">
      <el-col :span="4" v-show="false">
        <el-tree
          class="filter-tree"
          :data="data2"
          default-expand-all
          ref="tree2">
        </el-tree>
      </el-col>
      <el-col :span="24">
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
            <!-- <el-table-column
                    type="selection"
                    :selectable="selectable"
                    width="55">
                  </el-table-column> -->

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
                <el-button v-for="(item, index) in controButton"
                           :key="index"
                           @click.native.prevent="deleteRow(scope.$index, data, item.name)"
                           type="text"
                           size="small">
                  {{item.name}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-col>
    </el-row>
    <!--删除操作弹窗-->
    <el-dialog title="删除" :visible.sync="dialogTableVisible" width="30%">
      <div>您确定要删除该条数据吗?</div>
      <el-form ref="form">
        <el-form-item>
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="editDialogTableVisible" width="50%">
      <el-form ref="form" label-width="80px">
        <el-form-item>
          <el-row>
            <el-col :span="12" :gutter="20">
              <el-input placeholder="请输入内容">
                <template slot="prepend">* 部门名称</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <template>
                <el-select v-model="value" placeholder="请选择" class="tree_select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-col>
            <el-col :span="22">
              <el-input>
                <template slot="prepend">* 显示顺序</template>
              </el-input>
            </el-col>
            <el-col :span="22" :gutter="20">
              <el-input placeholder="请输入内容">
                <template slot="prepend">* 部门地址</template>
              </el-input>
            </el-col>
            <el-col :span="22" :gutter="20">
              <el-input placeholder="请输入内容">
                <template slot="prepend">* 部门描述</template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-footer class="footer block" height="50px" v-if="false">
      <el-row class="setPagination">
        <!-- 控制按钮 -->
        <el-col :span="10">
          <div class="grid-content bg-purple">

            <!-- <el-checkbox @change="toggleSelection(data)"></el-checkbox> -->
            <el-button type="small">批量通过</el-button>
            <el-button type="small">批量拒绝</el-button>
            <el-button type="small">批量上架</el-button>
            <el-button type="small">批量下架</el-button>
            <!-- <el-button type="small" @click="toggleSelection([tableData[1], tableData[2]])">切换第三</el-button>
                    <el-button type="small" @click="toggleSelection()">取消选择</el-button> -->
          </div>
        </el-col>

        <!-- 分页器 -->
        <el-col :span="14">
          <div class="grid-content bg-purple-light">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-footer>
    <!--字典管理 添加-->
    <el-dialog
      class="addDict"
      :visible.sync="addDictBtn"
      width="550px"
      title="添加">
      <div class="addDictContent">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input >
              <template slot="prepend">名称:</template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-input  >
              <template slot="prepend">排序:</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input  >
              <template slot="prepend" >代表值:</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input  >
              <template slot="prepend">描述:</template>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div class="dialog-footer" slot="footer">
        <span class="save">保存</span>
      </div>
    </el-dialog>


  </el-container>
</template>

<script>
  export default {
    name: "TableWidget",
    props: {
      tableOption: {
        type: Object,
        default: {
          tags: [],
          thead: [],
          controButton: [],
          data: [],
          selectAll: false
        },
        required: true
      }
    },
    data() {
      return {
        // tableData: Array(30).fill(tableData),
        value: '',
        dialogTableVisible: false,
        editDialogTableVisible: false,
        addDictBtn: true, //添加字典e
        editApartmentBtn:true, //编辑部门
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 10,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        tags: [],
        thead: [],
        controButton: [],
        data: [],
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        multipleSelection: [],
        selectAll: false,// 全选 or 全不选,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      };
    },
    methods: {
      // table删出事件
      deleteRow(index, rows, val) {
        // console.log(index, rows);
        console.log(val);
        switch (val) {
          case '编辑':
            break;
          case '修改权限':
            break;
          case '删除':
            this.dialogTableVisible = true;
            break;
          default :
        }
        // rows.splice(index, 1);
      },
      // table多选
      toggleSelection(rows) {
        //	根据当前状态， 决定是否全选
        if (this.selectAll) {
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
      },
      // 返回一个 多选框 的状态（是否可用）
      selectable(row, index) {
        // console.log(row, index)
        return this.selectAll;
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
      const {tableOption} = this.$props;
      if (tableOption && tableOption.tags) {
        this.tags = tableOption.tags;
      }
      if (tableOption && tableOption.thead) {
        this.thead = tableOption.thead;
      }
      if (tableOption && tableOption.controButton) {
        this.controButton = tableOption.controButton;
      }
      if (tableOption && tableOption.data) {
        this.data = tableOption.data;
      }
      if (tableOption && tableOption.data) {
        this.selectAll = tableOption.selectAll;
      }
    }
  };
</script>

<style scoped>
  /*增加字典 弹窗*/
  /deep/ .addDict .el-dialog__title {
    color: #188ff0;
    font-size: 16px;
  }
  .addDict .save{
    width: 100px;
    height: 40px;
    background-color: #188ff0;
    border-radius: 5px;
    text-align: center;
    line-height:40px;
    display: block;
    margin-left: 416px;
    color: #ffffff;
    font-size: 16px;
  }
  /deep/ .addDict .el-dialog__body{
    padding-bottom: 17px;
  }
  /deep/ .addDict .el-input__inner:focus {
    border-color: #dcdfe6;
    outline: 0;
  }
  /deep/ .addDict .el-input-group__prepend{
    border-radius: 0;
    border-right: 0px;
    background: #fff;
    color: #404040;
    font-size: 14px;
  }
  /deep/ .addDict .el-input__inner{
    border-left: none;

  }
  .addDict{

  }
  /*弹窗 end */
  .el-tag--mini {
    line-height: 20px;
  }

  #tableWidget {
    overflow: hidden;
    /*padding:20px ;*/
    background: #f2f3f5;
  }

  #tableWidget > .header,
  #tableWidget > .main,
  #tableWidget > .footer {
    background: #fff;
  }

  /* 搜索栏 */
  #tableWidget > .header {
    line-height: 76px;
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
  }

  .tag-header:empty {
    display: none;
  }

  .el-footer {
    position: fixed;
    bottom: 20px;
    z-index: 999;
    width: 100%;
  }

  .setPagination {
    margin-top: 6px;
  }

  .el-tree {
    background: #f2f3f5;
  }

  /* .inputBox input{
     outline: none;
     border-radius:0;
     appearance: none;
     border:none;
   }*/
  .el-input-group {
    margin-bottom: 10px;
  }

  .tree_select {
    margin-left: 20px;
  }
</style>
