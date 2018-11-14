<template>
  <div>

  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import api from '../../axios/api.js';

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
      api.post('/api/auth/token').then(res => {
        let token = res.token;
        this.changeLogin({ token: token });
        let jumpTo = sessionStorage.getItem("jumpTo");
        if(jumpTo){
          this.$router.push(jumpTo);
        }
    });
    }
  }
  };
</script>