<template>
  <div>

  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import api from '../../axios/api.js';
  import common from '../../common/common.js';

  export default {
    data () {
      return {

      };
    },
    created() {
      this.login();
    },
    methods: {
    ...mapMutations(['changeLogin']),
    login () {
      api.post(common.host + '/api/auth/token').then(res => {
        let token = res.token;
        this.changeLogin({ token: token });
        let jumpTo = sessionStorage.getItem("jumpTo");
        this.$router.push(jumpTo);
    });
    }
  }
  };
</script>