<template>
  <div class="content">
    <CusConfirm
      :height="480"
      :width="350"
      :flag="addFriend.visible"
      @cancel="addUserCancel"
      @confirm="addUserConfirm"
      :isActive="searchUser != null && !isFriend"
      :title="'添加好友'"
    >
      <template v-slot:confirm>
        <div class="firend-info">
          <Search
            @change="userSearch"
            :width="'280px'"
            :showBtn="false"
            :bgColor="'#fff'"
          ></Search>
          <div class="userInfo" v-if="searchUser != null">
            <div class="esInfo">
              <div class="right">
                <img
                  class="avatar"
                  width="50"
                  height="50"
                  :src="searchUser.avatar"
                />
              </div>
              <div class="left">
                <div class="people">
                  <div class="nickname">{{ searchUser.nickname }}</div>
                  <div
                    :class="[
                      searchUser.sex === 1 ? 'gender-male' : 'gender-female',
                    ]"
                  ></div>
                </div>
                <div
                  class="signature"
                  v-text="
                    searchUser.signature == null || searchUser.signature === ''
                      ? '这个人什么也留下'
                      : searchUser.signature
                  "
                ></div>
              </div>
            </div>
            <div class="detInfo">
              <div class="wxid">
                <span>账&nbsp&nbsp&nbsp号</span>{{ searchUser.username }}
              </div>
              <div class="wxid"><span>微信号</span>{{ searchUser.wxid }}</div>
              <div class="area">
                <span>地&nbsp&nbsp&nbsp区</span>{{ searchUser.area }}
              </div>
            </div>
          </div>
          <div class="hasFriend" v-if="searchUser != null && isFriend">
            <p>该用户已经是你的好友</p>
          </div>
          <div class="editInfo" v-if="searchUser != null && !isFriend">
            <div class="info">
              <p>发送添加好友申请</p>
              <input v-model="edit.info" />
            </div>
            <div class="remark">
              <p>备注名</p>
              <input v-model="edit.remark" />
            </div>
          </div>
        </div>
      </template>
    </CusConfirm>
  </div>
</template>

<script>
import CusConfirm from "@/components/other/confirm/CusConfirm";
import Search from "@/components/search/Search";
import { selectUser } from "@/api/account.js";
import { applyAddFriend } from "@/api/friend.js";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    Search,
    CusConfirm,
  },
  props: {
    show: { type: Boolean, default: false },
  },
  data() {
    return {
      isFriend: false,
      searchUser: null,
      edit: {
        remark: "",
        info: "",
      },
    };
  },
  computed: {
    ...mapState({
      addFriend: (state) => state.system.addFriend,
    }),
    ...mapGetters({
      selectedFriendByUsername: "friend/selectedFriendByUsername",
    }),
  },
  created() {
    if (this.addFriend.username != null) {
      this.userSearch(this.addFriend.username);
    }
  },
  methods: {
    addUserConfirm() {
      let params = {
        username: this.searchUser.username,
        info: this.edit.info,
        remark: this.edit.remark,
      };
      applyAddFriend(params).then((res) => {
        if (res.code == 0) {
          this.$message({
            content: "发送成功",
            time: 2500,
            type: "info",
            hasClose: true,
          });
          this.addUserConfirm();
        }
      });
    },
    addUserCancel() {
      this.showConfirm = false;
      this.searchUser = null;
      this.$emit("cancel");
      let friendInfo = {
        visible: false,
        username: null,
      };
      this.$store.commit("system/setAddFriendInfo", friendInfo);
    },
    userSearch(value) {
      if (value == null || value === "") {
        this.searchUser = null;
        return;
      }
      selectUser(value)
        .then((res) => {
          if (res.code == 0) {
            this.searchUser = res.data;
            let friend = this.selectedFriendByUsername(
              this.searchUser.username
            );
            if (friend != null) {
              this.isFriend = true;
            } else {
              this.isFriend = false;
              this.edit.info = "我是" + this.$store.state.user.info.nickname;
              this.edit.remark = this.searchUser.nickname;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.content {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
  background-color: rgba(30, 30, 30, 0.5);

  .firend-info {
    height: 400px;
    width: 350px;
  }

  .userInfo {
    margin: 10px auto;
    padding: 0 50px;
    text-align: left;

    .esInfo {
      display: flex;
      align-items: center;
      margin-top: 20px;

      .left {
        flex: 1;

        .people {
          .nickname {
            display: inline-block;
            font-size: 16px;
            margin-bottom: 16px;
          }

          .gender-male, .gender-female {
            display: inline-block;
            width: 18px;
            height: 18px;
            vertical-align: top;
            margin-top: 2px;
            margin-left: 5px;
          }

          .gender-male {
            background-image: url('../../components/info/man.png');
            background-size: cover;
          }

          .gender-female {
            background-image: url('../../components/info/woman.png');
            background-size: cover;
          }
        }

        .signature {
          font-size: 14px;
          color: rgba(153, 153, 153, 0.8);
        }
      }

      .right {
        margin-right: 20px;

        .avatar {
          border-radius: 3px;
        }
      }
    }

    .detInfo {
      padding: 10px 0;
      margin-bottom: 20px;

      .area, .wxid {
        font-size: 12px;
        margin-top: 20px;

        span {
          font-size: 12px;
          color: rgba(153, 153, 153, 0.8);
          margin-right: 40px;
        }
      }
    }
  }

  .hasFriend {
    margin-top: 40px;
    margin-left: 50px;
    text-align: left;
    font-size: 14px;
    color: rgba(153, 153, 153, 0.9);
  }

  .editInfo {
    margin: 10px auto;
    padding: 0 40px;
    text-align: left;
    font-size: 12px;

    p {
      font-size: 12px;
      color: rgba(153, 153, 153, 0.8);
      margin-right: 40px;
      margin-top: 5px;
    }

    input {
      margin: 8px 0;
      width: 100%;
      background-color: #EDEDED;
      padding: 1px 10px;
      height: 30px;
      font-size: 12px;
      border-radius: 2px;

      &:focus {
        outline: none;
        border-color: #EDEDED;
      }
    }
  }
}
</style>