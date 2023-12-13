<template>
  <div>
    我是paramRoute~~~~~~{{ $route.params.id }}
    <div v-if="$route.params.id === '1'">
      <count-down @start_callback="countDownS_cb(1)"
                  v-on:end_callback="countDownE_cb(1)"
                  :currentTime="currentTime"
                  :startTime="startTime"
                  :endTime="endTime"
                  :tipText="'距离游戏开始还有'"
                  :tipTextEnd="'距离游戏结束还有'"
                  :endText="'结束了'"
                  :dayTxt="'天'"
                  :hourTxt="'小时'"
                  :minutesTxt="'分钟'"
                  :secondsTxt="'秒'">

      </count-down>
    </div>
    <div v-if="$route.params.id === '2'">
      <el-container>
        <el-main>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <div v-for="(test, index) in tests" :key="index">
                  <p>{{ index + 1 }}.{{ test.titleName }}</p>
                  <el-checkbox-group v-if="test.type == '多选'" v-model="test.da">
                    <!-- label绑定答案的值,可以绑定索引index,也可以绑定答案内容city -->
                    <el-checkbox
                        v-for="(city,index) in test.content"
                        :label="index"
                        :key="index"
                    >{{ city }}
                    </el-checkbox>
                  </el-checkbox-group>
                  <el-radio-group v-else-if="test.type == '单选'" v-model="test.da">
                    <el-radio
                        v-for="(city,index) in test.content"
                        :label="index"
                        :key="index"
                    >{{ city }}
                    </el-radio>
                  </el-radio-group>
                  <div v-else>
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="test.da"></el-input>
                  </div>
                </div>
              </div>
              <br/>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <h3>题号:</h3>
                <div class="tihao">
                  <div v-for="(test,index) in tests" :key="index">
                <span v-if="test.da.length == '0'" class="ti">
                  {{ index + 1 }}
                </span>
                    <span v-else class="ti active">{{ index + 1 }}</span>
                  </div>
                </div>
              </div>
              <div>
                <el-button @click="submitCount" type="primary">提交考卷</el-button>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>

import CountDown from 'vue2-countdown'

export default {
  name: "paramRoute",
  components: {
    CountDown
  },
  data() {
    return {
      currentTime: 1000000000,
      startTime: 1000000010, // 距离游戏开始还有
      endTime: 1000000015, // 距离游戏结束还有
      tests: [
        {
          titleName: "第一题,多选题",
          type: "多选",
          content: ["A哈哈", "B呵呵", "C嘻嘻", "D嘎嘎"],
          // 答案存放数组
          da: []
        },
        {
          titleName: "第二题,单选题",
          type: "单选",
          content: ["AAA烦", "BBB我", "CCC人", "DDD去"],
          // 答案存放字符串
          da: ""
        },
        {
          titleName: "第三题,问答题",
          type: "问答",
          content: ["AA反打", "BB烦", "CC粉丝", "DD让人"],
          // 答案存放字符串
          da: ""
        }
      ],
    }
  },
  methods: {
    countDownE_cb(op) {
      console.log('23', op)
    },
    countDownS_cb() {

    },
    submitCount() {
      // 是否答完
      let isComplete = true;
      this.tests.forEach((val, i) => {
        if (val.da.length == 0) {
          isComplete = false;
          return;
        }
      })

      if (isComplete) {
        // 答题完整,可以提交,在这里进行提交数据操作
        this.$message({
          type: "success",
          message: '已提交'
        })
      } else {
        this.$message({
          type: 'info',
          message: '未打完,请继续答卷!'
        })
      }
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

/* 题目*/
.tihao {
  display: flex;
  justify-content: space-around;
}

.ti {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 27px;
  border: 1px solid #bbb;
  color: #bbb;
  border-radius: 50%;
  text-align: center;
}

.active {
  background-color: blue;
  color: white;
}
</style>
